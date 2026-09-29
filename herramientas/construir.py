# -*- coding: utf-8 -*-
# RLR · Construcción del mapa de carreteras de México 1.0 / 2.0 / 3.0 / 4.0 — Ricardo López Reyero
# Lee las rutas reales (cache/rutas.json, generado por rutas.py), proyecta todo a Lambert
# (parámetros INEGI), calcula carriles actuales, flujos (modelo gravitacional) y el grosor
# que cada tramo necesita en 2.0, 3.0 y 4.0, las métricas y el plan de obra. Escribe ../index.html.
import json, math, os, sys, heapq, re
from collections import defaultdict

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.join(AQUI, '..')
FUENTE = os.path.join(RAIZ, 'datos_fuente')
sys.path.insert(0, AQUI)
from red import CIUDADES, TRAMOS, MASA_LOGISTICA, PROYECTOS

_k, _rev = "EYE", 181218  # rev de compilación

# ── Proyección cónica conforme de Lambert (INEGI: φ1 17.5, φ2 29.5, φ0 12, λ0 −102) ──
R = 6371.0
f1, f2, f0, l0 = map(math.radians, (17.5, 29.5, 12.0, -102.0))
n = math.log(math.cos(f1) / math.cos(f2)) / math.log(math.tan(math.pi/4 + f2/2) / math.tan(math.pi/4 + f1/2))
F = math.cos(f1) * math.tan(math.pi/4 + f1/2)**n / n
rho0 = R * F / math.tan(math.pi/4 + f0/2)**n
def lcc(lon, lat):
    rho = R * F / math.tan(math.pi/4 + math.radians(lat)/2)**n
    t = n * (math.radians(lon) - l0)
    return rho * math.sin(t), rho0 - rho * math.cos(t)

# extensión de la vista: el contorno de México proyectado, con un margen corto
_adm1 = json.load(open(os.path.join(FUENTE, 'ne_10m_admin1.geojson')))['features']
_xs, _ys = [], []
for _f in _adm1:
    if _f['properties'].get('adm0_a3') != 'MEX': continue
    _g = _f['geometry']
    for _poly in (_g['coordinates'] if _g['type'] == 'MultiPolygon' else [_g['coordinates']]):
        for _x, _y in _poly[0][::5]:
            _px, _py = lcc(_x, _y); _xs.append(_px); _ys.append(_py)
xmin, xmax = min(_xs), max(_xs); ymin, ymax = min(_ys), max(_ys)
_mx, _my = (xmax - xmin) * 0.04, (ymax - ymin) * 0.04
xmin -= _mx; xmax += _mx; ymin -= _my; ymax += _my
ESC = 1000.0 / (xmax - xmin)           # unidades por km
W = 1000.0; H = round((ymax - ymin) * ESC, 1)
def P(lon, lat):
    x, y = lcc(lon, lat)
    return ((x - xmin) * ESC, (ymax - y) * ESC)

def hav(lon1, lat1, lon2, lat2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    a = math.sin((p2-p1)/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(math.radians(lon2-lon1)/2)**2
    return 2*R*math.asin(math.sqrt(a))

# ── utilidades geométricas ──
def dp(pts, tol):
    """Douglas-Peucker iterativo."""
    if len(pts) < 3: return pts[:]
    keep = [False]*len(pts); keep[0] = keep[-1] = True
    pila = [(0, len(pts)-1)]
    while pila:
        a, b = pila.pop()
        ax, ay = pts[a]; bx, by = pts[b]
        dx, dy = bx-ax, by-ay; L2 = dx*dx+dy*dy
        dmax, imax = -1, -1
        for i in range(a+1, b):
            px, py = pts[i]
            if L2 == 0: d = math.hypot(px-ax, py-ay)
            else:
                t = max(0, min(1, ((px-ax)*dx+(py-ay)*dy)/L2))
                d = math.hypot(px-ax-t*dx, py-ay-t*dy)
            if d > dmax: dmax, imax = d, i
        if dmax > tol:
            keep[imax] = True; pila += [(a, imax), (imax, b)]
    return [p for p, k in zip(pts, keep) if k]

def chaikin(pts, it=3):
    for _ in range(it):
        q = [pts[0]]
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            q += [(0.75*x0+0.25*x1, 0.75*y0+0.25*y1), (0.25*x0+0.75*x1, 0.25*y0+0.75*y1)]
        q.append(pts[-1]); pts = q
    return pts

def path(pts, cerrar=False):
    if not pts: return ''
    s = 'M' + f'{pts[0][0]:.1f} {pts[0][1]:.1f}'
    px, py = round(pts[0][0], 1), round(pts[0][1], 1)
    for x, y in pts[1:]:
        x, y = round(x, 1), round(y, 1)
        if (x, y) == (px, py): continue
        s += f'L{x:g} {y:g}'
        px, py = x, y
    return s + ('Z' if cerrar else '')

def largo_u(pts):
    return sum(math.hypot(b[0]-a[0], b[1]-a[1]) for a, b in zip(pts, pts[1:]))

def recortar(poly, x0, y0, x1, y1):
    """Sutherland-Hodgman contra rectángulo."""
    def clip(pts, dentro, cruce):
        out = []
        for i in range(len(pts)):
            a, b = pts[i-1], pts[i]
            ia, ib = dentro(a), dentro(b)
            if ib:
                if not ia: out.append(cruce(a, b))
                out.append(b)
            elif ia: out.append(cruce(a, b))
        return out
    def cx(xc):
        return lambda a, b: (xc, a[1] + (b[1]-a[1])*(xc-a[0])/((b[0]-a[0]) or 1e-9))
    def cy(yc):
        return lambda a, b: (a[0] + (b[0]-a[0])*(yc-a[1])/((b[1]-a[1]) or 1e-9), yc)
    p = poly
    for dentro, cruce in [(lambda q: q[0] >= x0, cx(x0)), (lambda q: q[0] <= x1, cx(x1)),
                          (lambda q: q[1] >= y0, cy(y0)), (lambda q: q[1] <= y1, cy(y1))]:
        if not p: break
        p = clip(p, dentro, cruce)
    return p

# ── capas base ──
print('Capas base…')
adm1 = _adm1
estados = []
for f in adm1:
    pr = f['properties']
    if pr.get('adm0_a3') != 'MEX': continue
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    d = ''
    for poly in polys:
        anillo = [P(x, y) for x, y in poly[0]]
        anillo = dp(anillo, 0.35)
        if len(anillo) >= 4 and largo_u(anillo) > 3:
            d += path(anillo, True)
    estados.append({'n': pr.get('name'), 'd': d})

adm0 = json.load(open(os.path.join(FUENTE, 'ne_10m_admin0.geojson')))['features']
vecinos = []
for f in adm0:
    pr = f['properties']
    a3 = pr.get('ADM0_A3') or pr.get('adm0_a3')
    if a3 not in ('USA', 'GTM', 'BLZ', 'HND', 'SLV', 'CUB'): continue
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    d = ''
    for poly in polys:
        ring = poly[0]
        lons = [p[0] for p in ring]; lats = [p[1] for p in ring]
        if max(lons) < -125 or min(lons) > -80 or min(lats) > 36 or max(lats) < 12: continue
        anillo = [P(x, y) for x, y in ring]
        anillo = recortar(anillo, -20, -20, W + 20, H + 20)
        anillo = dp(anillo, 0.5)
        if len(anillo) >= 4:
            d += path(anillo, True)
    if d: vecinos.append({'n': a3, 'd': d})

ne = json.load(open(os.path.join(FUENTE, 'ne_10m_roads.geojson')))['features']
sec = ''
for f in ne:
    pr = f['properties']
    if pr.get('sov_a3') != 'MEX' or pr.get('type') == 'Ferry Route': continue
    g = f['geometry']
    for ln in (g['coordinates'] if g['type'] == 'MultiLineString' else [g['coordinates']]):
        pts = dp([P(x, y) for x, y in ln], 0.6)
        if len(pts) >= 2: sec += path(pts)

# ── ciudades ──
ids = list(CIUDADES)
CAPITALES = {'cdmx','gdl','mty','pue','tol','slp','mer','qro','ags','mxl','cue','slt','chh','mor','her','cul','vhs',
             'tgz','xal','oax','dgo','pac','tep','zac','col','lpz','cam','che','vic','chi','tlx','gto'}
assert len(CAPITALES) == 32
ciudades = []
for cid in ids:
    nom, lo, la, pob, niv = CIUDADES[cid]
    x, y = P(lo, la)
    ciudades.append({'id': cid, 'n': nom, 'x': round(x, 1), 'y': round(y, 1), 'p': pob, 'l': niv, 'c': 1 if cid in CAPITALES else 0})
IX = {c: i for i, c in enumerate(ids)}


# ════════════════════════════════════════════════════════════════════════════
# RLR · Modelo de red 1.0 · 2.0 · 3.0 · 4.0 — Ricardo López Reyero
# ════════════════════════════════════════════════════════════════════════════
import numpy as np
from red import MIN_CARRILES, CENTRAL_NUCLEO, CENTRAL_AMPLIO, EJES, PUERTOS, FRONTERA_NORTE

# ── tramos: geometría de hoy (g), trazo recto de 3.0 (n) y trazo de alta velocidad de 4.0 (r) ──
print('Tramos…')
rutas = json.load(open(os.path.join(AQUI, 'cache', 'rutas.json')))
PASOS = [2, 4, 6, 8, 10, 12]
MONT_MANUAL = {'chi-aca', 'maz-dgo', 'her-cuu', 'tgz-vhs', 'scc-pal', 'oax-txp', 'tol-alt', 'alt-zih',
               'chi-tla', 'tla-hua', 'uru-lzc', 'pac-vll', 'tux-pac', 'thn-oax', 'hua-oax', 'oax-scz', 'oax-pes',
               'tgz-scc', 'scc-com', 'par-dgo', 'crl-cuu', 'gdl-pvr', 'pue-hua', 'aca-zih', 'aca-pin', 'cue-chi',
               'cue-igu', 'pvr-mzo', 'mzo-lzc', 'lmo-crl', 'arr-tgz', 'tgz-coa', 'pue-xal', 'tep-pvr', 'vll-rio'}

def carriles_actuales(dist):
    tot = sum(dist.values()) or 1
    mejor = 2
    for L in PASOS:
        if sum(v for k, v in dist.items() if int(k) >= L) / tot >= 0.6:
            mejor = L
    p4 = sum(v for k, v in dist.items() if int(k) >= 4) / tot
    return mejor, p4

def bezier(p0, p1, curv, n=24):
    (x0, y0), (x1, y1) = p0, p1
    c = ((x0 + x1) / 2 - (y1 - y0) * curv, (y0 + y1) / 2 + (x1 - x0) * curv)
    return [((1-s)**2*x0 + 2*(1-s)*s*c[0] + s*s*x1, (1-s)**2*y0 + 2*(1-s)*s*c[1] + s*s*y1) for s in [i / n for i in range(n + 1)]]

def rectificar(pts, tol_km, iters):
    return chaikin(dp(pts, tol_km * ESC), iters)

tramos = []
for a, b, pistas, plan in TRAMOS:
    k = f'{a}-{b}'
    ca, cb = CIUDADES[a], CIUDADES[b]
    recta = hav(ca[1], ca[2], cb[1], cb[2])
    plan = plan or ''
    t = {'id': k, 'a': IX[a], 'b': IX[b], 'ref': pistas, 'plan': plan, 'recta': recta, 'rect3': False}
    p0, p1 = P(ca[1], ca[2]), P(cb[1], cb[2])
    if plan.startswith('nuevo'):
        t.update({'g': '', 'km': 0, 'v1': 0, 'p4': 0, 'mont': 1, 'sinu': 1.3,
                  'gn': path(bezier(p0, p1, 0.12)), 'kmn': round(recta * 1.30),
                  'gr': path(bezier(p0, p1, 0.05)), 'kmr': round(recta * 1.16)})
    else:
        r = rutas[k]
        pts = [P(x, y) for x, y in r['pts']]
        v1, p4 = carriles_actuales(r['carriles'])
        sinu = r['km'] / max(recta, 1)
        mont = 1 if (k in MONT_MANUAL or sinu > 1.33) else 0
        t.update({'g': path(dp(pts, 0.3)), 'km': round(r['km']), 'v1': v1, 'p4': round(p4, 2), 'mont': mont, 'sinu': sinu})
        metropoli = max(ca[3], cb[3]) >= 2000 and recta < 120      # en la entrada a una metrópoli no se rectifica
        t['rect3'] = (not plan.endswith('nueva')) and sinu >= 1.20 and recta >= 35 and not metropoli
        if plan.endswith('nueva') or t['rect3']:
            rect = rectificar(pts, 9.0, 4)          # se van las curvas de sierra (tolerancia 9 km)
            fac = 1.22 if (plan.endswith('nueva') or mont) else 1.12
            t['gn'] = path(dp(rect, 0.25)); t['kmn'] = round(min(r['km'], max(largo_u(rect) / ESC * 1.08, recta * fac)))
        rr = rectificar(pts, 22.0, 5)               # 4.0: trazo de alta velocidad, casi recto
        t['gr'] = path(dp(rr, 0.25)); t['kmr'] = round(min(r['km'], max(largo_u(rr) / ESC * 1.03, recta * (1.12 if mont else 1.05))))
    tramos.append(t)

# ── versiones ──
RANGO = {'': 0, 'g': 1, 'n': 2, 'r': 3}
def geo(t, v):
    p = t['plan']
    if p == 'nuevo:v4': return 'r' if v >= 4 else ''
    if p == 'nuevo:v3': return {3: 'n', 4: 'r'}.get(v, '')
    if p == 'nuevo:v2': return {2: 'n', 3: 'n', 4: 'r'}.get(v, '')
    if v >= 4: return 'r'
    if v == 3 and (p.endswith('nueva') or t['rect3']): return 'n'
    if v == 2 and p == 'v2:nueva': return 'n'
    return 'g'
def km_geo(t, g): return {'g': t['km'], 'n': t.get('kmn', t['km']), 'r': t.get('kmr', t['km'])}[g]
def km_v(t, v): g = geo(t, v); return km_geo(t, g) if g else 0

def vel_libre(L, mont, g):
    if g == 'r': return 118 if mont else 130            # autopista de alta velocidad (diseño 4.0)
    if g == 'n': return 100 if mont else 115            # trazo nuevo con túneles y viaductos
    if L <= 2: return 55 if mont else 78
    return {4: 100, 6: 106}.get(L, 110) - (18 if mont else 0)

EXPONENTE, DIST_MIN = 1.6, 110.0            # fricción de la distancia (calibrado contra aforos SICT)
CAP_CARRIL = 12000                          # veh/día por carril: capacidad práctica (nivel C–D)
CAP_DISENO = {2: 12000, 3: 10000, 4: 8500}  # 2.0 nivel C · 3.0 nivel B · 4.0 nivel A–B
MAX_CARR = {2: 12, 3: 14, 4: 16}
HORIZONTE = {'hoy': (1.0, 1.0), '2035': (1.3, 1.6), '2050': (1.7, 2.6)}   # (personas, carga): el nearshoring crece más rápido
HZ_V = {1: 'hoy', 2: '2035', 3: '2050', 4: '2050'}

masa = {c: CIUDADES[c][3] + MASA_LOGISTICA.get(c, 0) for c in ids}
N = len(ids)

def flujos(v, carriles, corridas=16):
    """Asignación estocástica (tipo probit) de la demanda gravitacional a la red v.
    Devuelve la carga de personas y la de carga pesada por tramo (sin escalar)."""
    import random
    rnd = random.Random(181218)
    base = [(t['a'], t['b'], km_v(t, v) / vel_libre(carriles[i], t['mont'], geo(t, v)), i)
            for i, t in enumerate(tramos) if geo(t, v) and carriles[i] > 0]
    gente = [0.0] * len(tramos); pesado = [0.0] * len(tramos)
    dem = {}
    for s in range(N):
        for tg in range(s + 1, N):
            ms, mt = masa[ids[s]], masa[ids[tg]]
            if ms <= 0 or mt <= 0: continue
            ci, cj = CIUDADES[ids[s]], CIUDADES[ids[tg]]
            d = max(DIST_MIN, hav(ci[1], ci[2], cj[1], cj[2])) ** EXPONENTE
            g_ = ci[3] * cj[3] / d / corridas
            dem[(s, tg)] = (g_, ms * mt / d / corridas - g_)
    for _ in range(corridas):
        adj = defaultdict(list)
        for a, b, h, i in base:
            hh = h * math.exp(rnd.gauss(0, 0.12))
            adj[a].append((b, hh, i)); adj[b].append((a, hh, i))
        for s in range(N):
            if masa[ids[s]] <= 0: continue
            dist = {s: 0.0}; prev = {}; pq = [(0.0, s)]; hecho = set()
            while pq:
                d, i = heapq.heappop(pq)
                if i in hecho: continue
                hecho.add(i)
                for j, h, e in adj[i]:
                    if d + h < dist.get(j, 1e18):
                        dist[j] = d + h; prev[j] = (i, e); heapq.heappush(pq, (d + h, j))
            for tg in range(s + 1, N):
                par = dem.get((s, tg))
                if not par or tg not in prev: continue
                k = tg
                while k != s:
                    i, e = prev[k]; gente[e] += par[0]; pesado[e] += par[1]; k = i
    return gente, pesado

def a_par(x):
    x = int(math.ceil(x - 1e-9)); return x + (x % 2)

def local(t):
    # tránsito local y regional (pueblos, agricultura, turismo) que el modelo entre ciudades no ve
    pa, pb = CIUDADES[ids[t['a']]][3], CIUDADES[ids[t['b']]][3]
    return 1800 + 2.0 * min(pa + pb, 3000)

def veh(G, Pz, i, hz):
    gp, gf = HORIZONTE[hz]; return (G[i] * gp + Pz[i] * gf) * ESCALA + LOCAL[i] * gp
def pce(G, Pz, i, hz):
    gp, gf = HORIZONTE[hz]; return (G[i] * 1.25 * gp + Pz[i] * 2.0 * gf) * ESCALA + LOCAL[i] * 1.3 * gp
def necesarios(p, v):
    return min(MAX_CARR[v], max(2, a_par(p / (CAP_DISENO[v] * 1.25))))

# 1.0 · carriles medidos y calibración
LOCAL = [local(t) for t in tramos]
L1 = [t['v1'] if geo(t, 1) else 0 for t in tramos]
G1, P1 = flujos(1, L1)
k_ref = [i for i, t in enumerate(tramos) if t['id'] == 'jil-qro'][0]
ESCALA = 70000.0 / (G1[k_ref] + P1[k_ref])   # México–Querétaro en Palmillas ≈ 70 mil veh/día

# 2.0 · mínimos del plan + flujo 2035
L2 = []
for i, t in enumerate(tramos):
    b = L1[i]
    if t['plan'] in ('v2:4', 'v2:nueva', 'nuevo:v2'): b = max(b, 4)
    L2.append(b if geo(t, 2) else 0)
for _ in range(3):
    G2, P2 = flujos(2, L2)
    L2 = [min(max(L2[i], necesarios(pce(G2, P2, i, '2035'), 2)), max(4, t['v1']) + 4) if geo(t, 2) else 0 for i, t in enumerate(tramos)]

# 3.0 · sueño dorado: todo ≥ 4, rutas de exportación ≥ 6, nivel de servicio B con la demanda 2050
L3 = [max(L2[i], 4, MIN_CARRILES[3].get(t['id'], 0)) if geo(t, 3) else 0 for i, t in enumerate(tramos)]
for _ in range(3):
    G3, P3 = flujos(3, L3)
    L3 = [max(L3[i], necesarios(pce(G3, P3, i, '2050'), 3)) if geo(t, 3) else 0 for i, t in enumerate(tramos)]

# ── utilidades de red (matrices entre ciudades) ──
LON = np.array([CIUDADES[c][1] for c in ids]); LAT = np.array([CIUDADES[c][2] for c in ids])
POB = np.array([CIUDADES[c][3] for c in ids], dtype=float); MAS = np.array([masa[c] for c in ids], dtype=float)
RECTA = np.array([[hav(LON[i], LAT[i], LON[j], LAT[j]) for j in range(N)] for i in range(N)])
DEQ = np.maximum(DIST_MIN, RECTA) ** EXPONENTE
np.fill_diagonal(DEQ, np.inf)
D_GENTE = np.outer(POB, POB) / DEQ * ESCALA              # veh/día (ambos sentidos) por par
D_CARGA = (np.outer(MAS, MAS) - np.outer(POB, POB)) / DEQ * ESCALA
CAPS = [IX[c] for c in CAPITALES]
PUERTO_IX = [IX[c] for c in PUERTOS]; FRONT_IX = [IX[c] for c in FRONTERA_NORTE]

def fw(aristas):
    T = np.full((N, N), np.inf); K = np.full((N, N), np.inf)
    np.fill_diagonal(T, 0); np.fill_diagonal(K, 0)
    for a, b, m, k in aristas:
        if m < T[a, b]: T[a, b] = T[b, a] = m; K[a, b] = K[b, a] = k
    for k in range(N):
        cand = T[:, k:k+1] + T[k:k+1, :]
        mask = cand < T
        if mask.any():
            T = np.where(mask, cand, T); K = np.where(mask, K[:, k:k+1] + K[k:k+1, :], K)
    return T, K

def minutos(t, L, g, q):
    vl = vel_libre(L, t['mont'], g)
    x = min(1.3, q / max(1, L * CAP_CARRIL * 1.25))
    return km_geo(t, g) / (vl / (1 + 0.15 * x ** 4)) * 60

VOT_P, VOT_C, VOC_P, VOC_C = 180.0, 650.0, 4.5, 14.0      # MXN por vehículo-hora y vehículo-km (autos / carga)
GP35, GF35 = HORIZONTE['2035']
FACTOR_VP = 12.0                                           # 30 años, tasa social 10 %, demanda creciente
PRESUPUESTO = 110.0                                        # mil millones MXN/año (ritmo del programa federal 2025–2030)

def aristas_de(estado, q):
    return [(t['a'], t['b'], minutos(t, L, g, q[i]), km_geo(t, g)) for i, (t, (L, g)) in enumerate(zip(tramos, estado)) if L > 0 and g]

def costo_2035(estado, Q35, detalle=False):
    T, K = fw(aristas_de(estado, Q35))
    h = np.where(np.isfinite(T), T, 1e4) / 60; K = np.where(np.isfinite(K), K, 1e4)
    horas = ((D_GENTE * GP35 + D_CARGA * GF35) * h).sum() / 2 * 365
    c = ((D_GENTE * GP35 * (h * VOT_P + K * VOC_P)) + (D_CARGA * GF35 * (h * VOT_C + K * VOC_C))).sum() / 2
    loc = sum(LOCAL[i] * GP35 * 0.5 * minutos(t, L, g, Q35[i]) / 60 * VOT_P for i, (t, (L, g)) in enumerate(zip(tramos, estado)) if L > 0 and g)
    total = (c + loc) * 365
    return (total, horas) if detalle else total

def costo_obra(t, de, a):
    """Millones de MXN para llevar un tramo del estado `de` al estado `a` (costos paramétricos 2026)."""
    (L0, g0), (L1_, g1) = de, a
    if L1_ <= 0: return 0.0
    mont = t['mont']; ca, cb = CIUDADES[ids[t['a']]], CIUDADES[ids[t['b']]]
    urb = max(ca[3], cb[3]) >= 2000 and t['recta'] <= 140
    par = (70 if mont else 35) * (1.8 if urb else 1.0)           # cada par de carriles extra, por km
    if L0 == 0 or RANGO[g1] > RANGO[g0]:                          # trazo nuevo completo
        base = {'n': 240 if mont else 120, 'r': 330 if mont else 170, 'g': 240 if mont else 120}[g1]
        return km_geo(t, g1) * (base + max(0, L1_ - 4) // 2 * par)
    if L1_ <= L0: return 0.0
    c = ((95 if mont else 45) * (1.3 if urb else 1.0)) if L0 < 4 <= L1_ else 0.0
    c += max(0, (L1_ - max(L0, 4)) // 2) * par
    return km_geo(t, g0) * c

def mezcla(e0, e1):
    return (max(e0[0], e1[0]), max(e0[1], e1[1], key=lambda g: RANGO[g]))

# ── 4.0 · base: corredor central ancho, exportación, alta velocidad en toda la red ──
L4 = []
for i, t in enumerate(tramos):
    m = MIN_CARRILES[4].get(t['id'], 0)
    if t['id'] in CENTRAL_NUCLEO: m = max(m, 14)
    elif t['id'] in CENTRAL_AMPLIO: m = max(m, 10)
    L4.append(max(L3[i], 4, m) if geo(t, 4) else 0)

# demanda de evaluación 2035 (fija por tramo) y de hoy, según la versión en que aparece cada tramo
Q35 = [pce(G1, P1, i, '2035') if geo(t, 1) else pce(G3, P3, i, '2035') for i, t in enumerate(tramos)]
QHOY = [pce(G1, P1, i, 'hoy') if geo(t, 1) else pce(G3, P3, i, 'hoy') for i, t in enumerate(tramos)]

# ── 4.0 · conexiones directas nuevas: las elige el algoritmo (beneficio/costo) + articulación total ──
print('4.0: buscando conexiones directas…')
_poligonos = []
for _f in _adm1:
    if _f['properties'].get('adm0_a3') != 'MEX': continue
    _g = _f['geometry']
    for _poly in (_g['coordinates'] if _g['type'] == 'MultiPolygon' else [_g['coordinates']]):
        anillo = [P(x, y) for x, y in _poly[0][::2]]
        xs = [p[0] for p in anillo]; ys = [p[1] for p in anillo]
        _poligonos.append((min(xs), max(xs), min(ys), max(ys), anillo))
# rejilla de tierra firme (celdas de 2.5 unidades ≈ 8 km) para saber si una línea recta cruza mar
PASO_T = 2.5
_gx = np.arange(0, W + PASO_T, PASO_T); _gy = np.arange(0, H + PASO_T, PASO_T)
_X, _Y = np.meshgrid(_gx, _gy)
TIERRA = np.zeros(_X.shape, dtype=bool)
for x0, x1, y0, y1, an in _poligonos:
    sel = (_X >= x0) & (_X <= x1) & (_Y >= y0) & (_Y <= y1)
    if not sel.any(): continue
    px, py = _X[sel], _Y[sel]; dentro = np.zeros(px.shape, dtype=bool)
    A = np.array(an); B = np.roll(A, 1, axis=0)
    for (xi, yi), (xj, yj) in zip(A, B):
        c = ((yi > py) != (yj > py)) & (px < (xj - xi) * (py - yi) / ((yj - yi) or 1e-12) + xi)
        dentro ^= c
    TIERRA[sel] |= dentro
def en_tierra(x, y):
    i, j = int(round(y / PASO_T)), int(round(x / PASO_T))
    if not (0 <= i < TIERRA.shape[0] and 0 <= j < TIERRA.shape[1]): return False
    # tolerancia de una celda para costas y ciudades en la orilla
    return bool(TIERRA[max(0, i - 1):i + 2, max(0, j - 1):j + 2].any())
def cuerda_en_tierra(i, j):
    (x0, y0), (x1, y1) = (ciudades[i]['x'], ciudades[i]['y']), (ciudades[j]['x'], ciudades[j]['y'])
    n_ = max(4, int(math.hypot(x1 - x0, y1 - y0) / 1.5))
    return all(en_tierra(x0 + (x1 - x0) * s / n_, y0 + (y1 - y0) * s / n_) for s in range(1, n_))
print('  tierra firme:', int(TIERRA.sum()), 'celdas')

directos = {(t['a'], t['b']) for t in tramos} | {(t['b'], t['a']) for t in tramos}
def montana_de(i):
    fl = [t['mont'] for t in tramos if i in (t['a'], t['b'])]
    return sum(fl) / max(1, len(fl))
def nueva_cuerda(i, j, motivo):
    ci, cj = ids[i], ids[j]
    recta = RECTA[i, j]
    mont = 1 if (montana_de(i) + montana_de(j)) / 2 >= 0.4 else 0
    p0, p1 = (ciudades[i]['x'], ciudades[i]['y']), (ciudades[j]['x'], ciudades[j]['y'])
    return {'id': f'{ci}-{cj}', 'a': i, 'b': j, 'ref': 'nueva', 'plan': 'nuevo:v4', 'recta': recta, 'rect3': False,
            'g': '', 'km': 0, 'v1': 0, 'p4': 0, 'mont': mont, 'sinu': 1.0, 'motivo': motivo,
            'gn': '', 'kmn': 0, 'gr': path(bezier(p0, p1, 0.035)), 'kmr': round(recta * (1.16 if mont else 1.08))}

estado4 = [(L4[i], geo(t, 4)) for i, t in enumerate(tramos)]
T4b, K4b = fw(aristas_de(estado4, QHOY))
elegibles = [i for i, c in enumerate(ids) if masa[c] >= 150 or c in CAPITALES or c in PUERTOS or c in FRONTERA_NORTE]
cands = []
for x in range(len(elegibles)):
    for y in range(x + 1, len(elegibles)):
        i, j = elegibles[x], elegibles[y]
        r = RECTA[i, j]
        if (i, j) in directos or not (60 <= r <= 650): continue
        if K4b[i, j] / r < 1.30: continue
        if not cuerda_en_tierra(i, j): continue
        cands.append((i, j))
print('  candidatas', len(cands))

cuerdas = []
estado_c = list(estado4)
costo_act = costo_2035(estado_c, Q35)
def con_cuerda(estado, t, L=4):
    tramos.append(t); Q35.append(0.0); QHOY.append(0.0); LOCAL.append(0.0)
    return estado + [(L, 'r')]
def sin_cuerda():
    tramos.pop(); Q35.pop(); QHOY.pop(); LOCAL.pop()
while len(cuerdas) < 30 and cands:
    mejor = None
    for (i, j) in cands:
        t = nueva_cuerda(i, j, 'valor')
        est = con_cuerda(estado_c, t)
        ben = costo_act - costo_2035(est, Q35)
        sin_cuerda()
        inv = costo_obra(t, (0, ''), (4, 'r'))
        bc = ben * FACTOR_VP / (inv * 1e6)
        if mejor is None or bc > mejor[0]: mejor = (bc, i, j, ben, inv)
    if mejor[0] < 0.9: break
    bc, i, j, ben, inv = mejor
    t = nueva_cuerda(i, j, 'valor'); t['bc'] = round(bc, 2)
    estado_c = con_cuerda(estado_c, t); cuerdas.append(t)
    costo_act -= ben
    cands.remove((i, j))
    print(f"  + {CIUDADES[ids[i]][0]}–{CIUDADES[ids[j]][0]}  B/C {bc:.2f}")

# articulación: ninguna ciudad con rodeos grandes hacia sus vecinas. Se elige el enlace que más
# reduce los rodeos ponderados por población de TODA la red por peso invertido (no sólo el de un nodo).
VEC = {i: [j for j in range(N) if j != i and 60 <= RECTA[i, j] <= 450 and POB[j] >= 40 and cuerda_en_tierra(i, j)] for i in range(N)}
def rodeo_nodo(Kx, i):
    vec = VEC[i]
    if not vec: return 1.0
    w = np.sqrt(POB[vec]); return float((w * (Kx[i, vec] / RECTA[i, vec])).sum() / w.sum())
def puntaje(Kx):
    return sum(float((np.sqrt(POB[i] * POB[VEC[i]]) * np.maximum(0, Kx[i, VEC[i]] / RECTA[i, VEC[i]] - 1.25)).sum())
               for i in range(N) if POB[i] >= 40 and VEC[i])
for _ in range(20):
    T_, K_ = fw(aristas_de(estado_c, QHOY))
    malos = {i for i in range(N) if POB[i] >= 40 and rodeo_nodo(K_, i) > 1.38}
    if not malos: break
    p0 = puntaje(K_)
    existentes = {(c['a'], c['b']) for c in cuerdas} | {(c['b'], c['a']) for c in cuerdas}
    opciones = [(i, j) for i in malos for j in range(N)
                if j != i and POB[j] >= 40 and 50 <= RECTA[i, j] <= 450 and (i, j) not in directos and (i, j) not in existentes
                and K_[i, j] / RECTA[i, j] >= 1.35]
    opciones = [(i, j) for i, j in opciones if cuerda_en_tierra(i, j)]
    if not opciones: break
    mejor = None
    for i, j in opciones:
        t = nueva_cuerda(i, j, 'articulación'); est = con_cuerda(estado_c, t)
        _, Kn = fw(aristas_de(est, QHOY)); sin_cuerda()
        r = (p0 - puntaje(Kn)) / costo_obra(t, (0, ''), (4, 'r'))
        if mejor is None or r > mejor[0]: mejor = (r, i, j)
    r, i, j = mejor
    t = nueva_cuerda(i, j, 'articulación')
    estado_c = con_cuerda(estado_c, t); cuerdas.append(t)
    print(f"  ≡ {CIUDADES[ids[i]][0]}–{CIUDADES[ids[j]][0]}")
T_, K_ = fw(aristas_de(estado_c, QHOY))
print('  rodeo máximo por ciudad:', round(max(rodeo_nodo(K_, i) for i in range(N) if POB[i] >= 40), 2))
L4 = [e[0] for e in estado_c]

# flujos de 4.0 con las conexiones nuevas: nivel A–B con la demanda 2050
for _ in range(3):
    G4, P4 = flujos(4, L4)
    L4 = [max(L4[i], necesarios(pce(G4, P4, i, '2050'), 4)) for i, t in enumerate(tramos)]
for i, t in enumerate(tramos):
    if t['plan'] == 'nuevo:v4':
        Q35[i] = pce(G4, P4, i, '2035'); QHOY[i] = pce(G4, P4, i, 'hoy')

# rellenar listas de las versiones anteriores para los tramos nuevos de 4.0
while len(L1) < len(tramos): L1.append(0); L2.append(0); L3.append(0)
G1 += [0.0] * (len(tramos) - len(G1)); P1 += [0.0] * (len(tramos) - len(P1))
G2 += [0.0] * (len(tramos) - len(G2)); P2 += [0.0] * (len(tramos) - len(P2))
G3 += [0.0] * (len(tramos) - len(G3)); P3 += [0.0] * (len(tramos) - len(P3))
LV = {1: L1, 2: L2, 3: L3, 4: L4}
FL = {1: (G1, P1), 2: (G2, P2), 3: (G3, P3), 4: (G4, P4)}
ESTADO = {v: [(LV[v][i], geo(t, v)) if LV[v][i] > 0 else (0, '') for i, t in enumerate(tramos)] for v in (1, 2, 3, 4)}

# ── métricas ──
def dijkstra_caminos(estado, origenes):
    adj = defaultdict(list)
    for i, (t, (L, g)) in enumerate(zip(tramos, estado)):
        if L > 0 and g:
            m = minutos(t, L, g, QHOY[i]); adj[t['a']].append((t['b'], m, i)); adj[t['b']].append((t['a'], m, i))
    out = {}
    for s in origenes:
        dist = {s: 0.0}; prev = {}; pq = [(0.0, s)]; hecho = set()
        while pq:
            d, u = heapq.heappop(pq)
            if u in hecho: continue
            hecho.add(u)
            for w, m, e in adj[u]:
                if d + m < dist.get(w, 1e18): dist[w] = d + m; prev[w] = (u, e); heapq.heappush(pq, (d + m, w))
        out[s] = prev
    return out

def metricas(estado, v=None, completo=True):
    T, K = fw(aristas_de(estado, QHOY))
    cp = [(a, b) for x, a in enumerate(CAPS) for b in CAPS[x + 1:]]
    tt = np.array([T[a, b] for a, b in cp]); rr = np.array([RECTA[a, b] for a, b in cp]); kk = np.array([K[a, b] for a, b in cp])
    m = {'vel': float(rr.sum() / (tt.sum() / 60)), 'prom': float(tt.mean() / 60), 'rodeo': float(kk.sum() / rr.sum()),
         'mas12': int((tt > 720).sum())}
    otros = lambda lim: float((POB * np.array([POB[(T[i] <= lim) & (np.arange(N) != i)].sum() for i in range(N)])).sum() / POB.sum() / 1000)
    m['merc4'] = otros(240); m['merc8'] = otros(480)
    tot = POB.sum()
    m['puerto4'] = float(POB[(T[:, PUERTO_IX].min(axis=1) <= 240)].sum() / tot)
    m['front8'] = float(POB[(T[:, FRONT_IX].min(axis=1) <= 480)].sum() / tot)
    m['cdmx5'] = float(POB[T[:, IX['cdmx']] <= 300].sum() / tot)
    # flujo de personas: la demanda crece cuando el tiempo baja (gravedad sobre tiempo equivalente a 80 km/h)
    deq = np.maximum(DIST_MIN, np.where(np.isfinite(T), T, 1e5) / 60 * 80) ** EXPONENTE; np.fill_diagonal(deq, np.inf)
    m['_grav'] = float((np.outer(MAS, MAS) / deq).sum() / 2)
    m['_gravg'] = float((np.outer(POB, POB) / deq).sum() / 2)
    total, horas = costo_2035(estado, Q35, detalle=True)
    m['costo'] = total / 1e9; m['horas'] = horas / 1e6
    base = ESTADO[1]
    m['inv'] = sum(costo_obra(t, base[i], estado[i]) for i, t in enumerate(tramos)) / 1000
    if not completo: return m
    km = km4 = km6 = kmc = kmnuevo = kmamp = 0.0
    for i, (t, (L, g)) in enumerate(zip(tramos, estado)):
        if L <= 0: continue
        k_ = km_geo(t, g); km += k_; kmc += k_ * L
        if L >= 4: km4 += k_
        if L >= 6: km6 += k_
        if g != 'g' or base[i][0] == 0: kmnuevo += k_
        elif L > base[i][0]: kmamp += k_
    m.update({'km': km, 'km4': km4, 'km6': km6, 'kmc': kmc, 'kmnuevo': kmnuevo, 'kmamp': kmamp})
    # viajes entre capitales todo el camino a ≥ 4 carriles; peores conexiones
    cam = dijkstra_caminos(estado, CAPS)
    todo4 = 0; peores = []
    for a, b in cp:
        prev = cam[a]; k_ = b; ok = True
        while k_ != a and k_ in prev:
            u, e = prev[k_]
            if estado[e][0] < 4: ok = False
            k_ = u
        todo4 += ok
        if RECTA[a, b] > 150 and cuerda_en_tierra(a, b): peores.append((RECTA[a, b] / (T[a, b] / 60), a, b))   # sin cruzar el mar
    m['todo4'] = todo4 / len(cp)
    peores.sort()
    m['peores'] = [[a, b, round(float(T[a, b])), round(float(K[a, b]))] for _, a, b in peores[:10]]
    m['peor'] = [peores[0][1], peores[0][2], round(float(T[peores[0][1], peores[0][2]]))]
    # congestión, seguridad y ambiente con el tránsito de 2035 que asigna cada versión
    if v:
        G, Pz = FL[v]
        sat = []; muertes = litros = vkt = vhr = 0.0
        for i, (t, (L, g)) in enumerate(zip(tramos, estado)):
            if L <= 0: continue
            q = pce(G, Pz, i, '2035'); vv = veh(G, Pz, i, '2035'); k_ = km_geo(t, g)
            vc = q / (L * CAP_CARRIL * 1.25)
            if vc > 0.9: sat.append([i, round(vc, 2)])
            x = min(1.3, vc); vel = vel_libre(L, t['mont'], g) / (1 + 0.15 * x ** 4)
            tasa = 2.8 if L <= 2 else {'g': 1.5, 'n': 1.1, 'r': 0.9}[g]        # muertes por 100 millones veh-km
            vk = vv * k_ * 365
            vkt += vk; vhr += vk / vel; muertes += vk * tasa / 1e8
            litros += vk * 0.155 * (1 + 0.6 * ((vel - 85) / 85) ** 2) * (1.12 if t['mont'] and g == 'g' else 1.0)
        sat.sort(key=lambda x: -x[1])
        m.update({'sat': sat, 'satn': len(sat), 'satkm': sum(km_geo(tramos[i], estado[i][1]) for i, _ in sat),
                  'muertes': muertes, 'litros': litros / 1e6, 'co2': litros * 2.5 / 1e9, 'vkt': vkt / 1e9, 'velred': vkt / vhr})
    return m

print('Métricas por versión…')
MET = {v: metricas(ESTADO[v], v) for v in (1, 2, 3, 4)}
k_grav = 1.0 / MET[1]['_grav']
for v in (1, 2, 3, 4):
    m = MET[v]
    m['viajes'] = m['_grav'] * k_grav                        # índice de viajes entre ciudades (1.0 = hoy)
    m['ahorro'] = MET[1]['costo'] - m['costo']
    m['hahorro'] = MET[1]['horas'] - m['horas']
    m['bc'] = m['ahorro'] * FACTOR_VP / m['inv'] if m['inv'] else 0
    m['recupera'] = m['inv'] / m['ahorro'] if m['ahorro'] > 0 else 0
base_dia = float((D_GENTE + D_CARGA).sum() / 2)
for v in (1, 2, 3, 4):
    MET[v]['viajesdia'] = MET[v]['viajes'] * base_dia
    MET[v]['personas'] = MET[v]['_gravg'] / MET[1]['_gravg'] * float(D_GENTE.sum() / 2) * 2.0

# accesibilidad por capital
T_V = {v: fw(aristas_de(ESTADO[v], QHOY))[0] for v in (1, 2, 3, 4)}
cap_acc = []
for c in CAPS:
    fila = {'i': c, 't': [], 'm4': []}
    for v in (1, 2, 3, 4):
        T = T_V[v]
        fila['t'].append(round(float(np.mean([T[c, o] for o in CAPS if o != c])), 1))
        fila['m4'].append(round(float(POB[(T[c] <= 240) & (np.arange(N) != c)].sum()) / 1000, 2))
    cap_acc.append(fila)

# ── resumen en consola ──
for v in (1, 2, 3, 4):
    m = MET[v]
    print(f"v{v}: {m['km']:,.0f} km · ≥4 {m['km4'] / m['km']:.0%} · vel.ef {m['vel']:.0f} km/h · prom {m['prom']:.1f} h · merc4 {m['merc4']:.1f} M · "
          f"ahorro {m['ahorro']:,.0f} mmdp/año · inv {m['inv']:,.0f} mmdp · B/C {m['bc']:.2f} · sat {m['satn']} · muertes {m['muertes']:,.0f} · viajes ×{m['viajes']:.2f}")

# ── proyectos por versión (panel) ──
def idx_de(par):
    a, b = par
    for i, t in enumerate(tramos):
        if t['id'] in (f'{a}-{b}', f'{b}-{a}'): return i
    raise SystemExit(f'No existe el tramo {a}-{b}')
proy = []
cubiertos = defaultdict(set)
for ver, titulo, lista, razon, estado_of in PROYECTOS:
    v = int(ver[1]); e = [idx_de(p) for p in lista]
    cubiertos[v].update(e)
    proy.append({'v': v, 't': titulo, 'e': e, 'r': razon, 's': estado_of})
cambio = lambda v, i: ESTADO[v][i] != ESTADO[v - 1][i]
flujo2 = [i for i in range(len(tramos)) if cambio(2, i) and i not in cubiertos[2]]
if flujo2:
    proy.insert(0, {'v': 2, 't': 'Más carriles donde el tránsito ya los pide', 'e': flujo2, 's': '',
                    'r': 'México–Querétaro, Bajío, México–Puebla y el eje T-MEC: el modelo de flujos dicta cuántos carriles necesita cada tramo en 2035.'})
rect3 = [i for i, t in enumerate(tramos) if t['rect3']]
exp3 = [i for i in range(len(tramos)) if cambio(3, i) and i not in cubiertos[3] and not tramos[i]['rect3']]
proy.insert(len([p for p in proy if p['v'] <= 2]), {'v': 3, 't': 'Megacorredores y rutas de exportación', 'e': exp3, 's': '',
    'r': 'Nivel de servicio B con la demanda de 2050 y el nearshoring: Monclova–Piedras Negras, eje T-MEC y Bajío crecen a 6–14 carriles.'})
proy.insert(len([p for p in proy if p['v'] <= 2]) + 1, {'v': 3, 't': 'Trazos rectos en la sierra', 'e': rect3, 's': '',
    'r': 'Todo tramo cuyo recorrido es 20 % mayor que la línea recta se rectifica con túneles y viaductos, a 115 km/h.'})
cen = [idx_de(tuple(k.split('-'))) for k in CENTRAL_NUCLEO + CENTRAL_AMPLIO]
c_val = [i for i, t in enumerate(tramos) if t.get('motivo') == 'valor']
c_art = [i for i, t in enumerate(tramos) if t.get('motivo') == 'articulación']
resto4 = [i for i in range(len(tramos)) if i not in set(cen) | set(c_val) | set(c_art)]
proy += [
    {'v': 4, 't': 'Corredor central de 10 a 14 carriles', 'e': cen, 's': '',
     'r': 'Guadalajara–Bajío–Querétaro–CDMX–Puebla–Veracruz con Toluca, Morelia, Aguascalientes, SLP, Pachuca y Cuernavaca en un solo cinturón.'},
    {'v': 4, 't': f'{len(c_val)} conexiones directas nuevas', 'e': c_val, 's': '',
     'r': 'El algoritmo prueba cada par de ciudades y construye la línea directa donde el beneficio supera al costo.'},
    {'v': 4, 't': f'Articulación total: {len(c_art)} enlaces', 'e': c_art, 's': '',
     'r': 'Ninguna ciudad queda con rodeos grandes hacia sus vecinas: el algoritmo cose la red donde la geografía lo permite.'},
    {'v': 4, 't': 'Toda la red rectificada a 130 km/h', 'e': resto4, 's': '',
     'r': 'Autopistas de alta velocidad en todos los tramos: 130 km/h en llano y 118 km/h en sierra.'},
]

# costo e intervención de cada frente de obra (desde la versión anterior)
for p in proy:
    v = p['v']
    p['c'] = round(sum(costo_obra(tramos[i], ESTADO[v - 1][i], ESTADO[v][i]) for i in p['e']) / 1000, 1)
    p['km'] = round(sum(km_geo(tramos[i], ESTADO[v][i][1]) for i in p['e'] if ESTADO[v][i][0]))

# ── plan de obra: orden exacto por valor (beneficio/costo con efectos de red) ──
print('Plan de obra…')
EJE_DE = {}
for nombre, lista in EJES.items():
    for k in lista: EJE_DE[k] = nombre
unidades = []
for p in proy:
    if p['v'] in (2, 3) and p['t'] not in ('Más carriles donde el tránsito ya los pide', 'Megacorredores y rutas de exportación', 'Trazos rectos en la sierra'):
        unidades.append({'n': p['t'], 'v': p['v'], 'tg': {i: ESTADO[p['v']][i] for i in p['e']}})
etiqueta = {2: 'más carriles', 3: 'trazo recto y más carriles', 4: 'a 130 km/h'}
for v in (2, 3, 4):
    grupos = defaultdict(list)
    for i, t in enumerate(tramos):
        if not cambio(v, i) or (v in (2, 3) and i in cubiertos[v]): continue
        if t['plan'] == 'nuevo:v4': continue
        grupos[EJE_DE.get(t['id'], 'Red complementaria')].append(i)
    for eje, es in grupos.items():
        nombre = f'{eje}: {etiqueta[v]}' if v != 3 or any(tramos[i]['rect3'] for i in es) else f'{eje}: más carriles 2050'
        unidades.append({'n': nombre, 'v': v, 'tg': {i: ESTADO[v][i] for i in es}})
for i, t in enumerate(tramos):
    if t['plan'] == 'nuevo:v4':
        unidades.append({'n': f"{CIUDADES[ids[t['a']]][0]}–{CIUDADES[ids[t['b']]][0]} directo", 'v': 4, 'tg': {i: ESTADO[4][i]}})

def aplicar(estado, u):
    e = list(estado)
    for i, tg in u['tg'].items(): e[i] = mezcla(e[i], tg)
    return e
m0 = metricas(ESTADO[1], completo=False)
def planear(grupos):
    """Greedy por beneficio/costo con efectos de red. `grupos` = lista de listas de unidades (etapas)."""
    estado = list(ESTADO[1]); costo_ahora = costo_2035(estado, Q35)
    pasos = []; acumulado = 0.0
    for etapa in grupos:
        pendientes = list(etapa)
        while pendientes:
            mejor = None; nulos = []
            for u in pendientes:
                nuevo = aplicar(estado, u)
                inv = sum(costo_obra(tramos[i], estado[i], nuevo[i]) for i in u['tg'])
                if inv <= 0: nulos.append(u); continue
                ben = costo_ahora - costo_2035(nuevo, Q35)
                bc = ben * FACTOR_VP / (inv * 1e6)
                if mejor is None or bc > mejor[0]: mejor = (bc, u, nuevo, inv, ben)
            for u in nulos: pendientes.remove(u)
            if not mejor: break
            bc, u, nuevo, inv, ben = mejor
            estado = nuevo; costo_ahora -= ben; acumulado += inv / 1000; pendientes.remove(u)
            m = metricas(estado, completo=False)
            pasos.append({'n': u['n'], 'v': u['v'], 'e': sorted(u['tg']), 'tg': [[i, estado[i][0], estado[i][1]] for i in sorted(u['tg'])],
                          'c': round(inv / 1000, 1), 'b': round(ben / 1e9, 2), 'bc': round(bc, 2), 'cc': round(acumulado, 1),
                          'm': [round(m['vel'], 1), round(m['prom'], 2), round(m['merc4'], 2), round((m0['costo'] - m['costo']), 1)]})
    return pasos
# Un solo orden: por valor. Frente a construir por etapas (2.0 → 3.0 → 4.0) cuesta menos en total
# (cada tramo se construye una vez con su estándar final) y da más ahorro por cada peso invertido.
PLAN_VALOR = planear([unidades])
print('  plan por valor:', len(PLAN_VALOR), 'obras ·', PLAN_VALOR[-1]['cc'], 'mmdp')
for k, p in enumerate(PLAN_VALOR[:10]): print(f"   {k + 1:3}. {p['n'][:60]:<60} v{p['v']}  {p['c']:7.1f}  B/C {p['bc']:5.2f}")

# ── exportación ──
for i, t in enumerate(tramos):
    t['L'] = [LV[v][i] for v in (1, 2, 3, 4)]
    t['geo'] = ''.join(geo(t, v) or '-' for v in (1, 2, 3, 4))
    t['K'] = [round(km_geo(t, ESTADO[v][i][1])) if ESTADO[v][i][0] else 0 for v in (1, 2, 3, 4)]
    t['m'] = [round(minutos(t, *ESTADO[v][i], QHOY[i]), 1) if ESTADO[v][i][0] else 0 for v in (1, 2, 3, 4)]
    t['q'] = [round(veh(*FL[v], i, HZ_V[v]) / 100) * 100 if ESTADO[v][i][0] else 0 for v in (1, 2, 3, 4)]
    t['n'] = t['id'] if t['plan'] != 'nuevo:v4' else ''
for v in (1, 2, 3, 4):
    for k in ('_grav', '_gravg'): MET[v].pop(k, None)

ROTULOS = [
    ('OCÉANO PACÍFICO', -109.2, 17.2, 'mar'), ('GOLFO DE MÉXICO', -93.2, 24.2, 'mar'), ('MAR CARIBE', -86.9, 16.9, 'mar'),
    ('Golfo de California', -111.4, 28.35, 'mar2'),
    ('ESTADOS UNIDOS', -104.6, 32.45, 'pais'), ('GUATEMALA', -90.35, 15.35, 'pais'), ('BELICE', -88.72, 17.55, 'pais'),
]
rotulos = [{'t': t, 'x': round(P(lo, la)[0], 1), 'y': round(P(lo, la)[1], 1), 'c': cl} for t, lo, la, cl in ROTULOS]
marca = P(-92.2, 25.4)

def redondear(o):
    if isinstance(o, float): return round(o, 3)
    if isinstance(o, dict): return {k: redondear(x) for k, x in o.items()}
    if isinstance(o, list): return [redondear(x) for x in o]
    return o

CLAVES = ('id', 'a', 'b', 'ref', 'plan', 'g', 'gn', 'gr', 'km', 'p4', 'mont', 'L', 'q', 'm', 'K', 'geo', 'motivo', 'bc')
DATOS = {
    'W': W, 'H': H, 'esc': round(ESC, 5), 'rotulos': rotulos, 'marca': [round(marca[0], 1), round(marca[1], 1)],
    'estados': estados, 'vecinos': vecinos, 'sec': sec, 'ciudades': ciudades,
    'tramos': [{k: t[k] for k in CLAVES if k in t} for t in tramos],
    'proyectos': proy, 'met': redondear(MET), 'cap': cap_acc,
    'plan': {'pasos': PLAN_VALOR, 'presupuesto': PRESUPUESTO, 'm0': [round(m0['vel'], 1), round(m0['prom'], 2), round(m0['merc4'], 2), 0]},
    'rev': _rev,
}
js = json.dumps(DATOS, ensure_ascii=False, separators=(',', ':'))
print('\nDatos:', len(js) // 1024, 'KB')
plantilla = open(os.path.join(AQUI, 'plantilla.html'), encoding='utf-8').read()
html = plantilla.replace('/*__DATOS__*/null', js)
open(os.path.join(RAIZ, 'index.html'), 'w', encoding='utf-8').write(html)
print('index.html', len(html) // 1024, 'KB')
