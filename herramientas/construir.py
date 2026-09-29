# -*- coding: utf-8 -*-
# RLR · Construcción del mapa de carreteras de México 1.0 / 2.0 / 3.0 — Ricardo López Reyero
# Lee las rutas reales (cache/rutas.json, generado por rutas.py), proyecta todo a Lambert
# (parámetros INEGI), calcula carriles actuales, flujos (modelo gravitacional) y el grosor
# que cada tramo necesita en 2.0 y 3.0. Escribe ../index.html a partir de plantilla.html.
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

# ── tramos ──
print('Tramos…')
rutas = json.load(open(os.path.join(AQUI, 'cache', 'rutas.json')))
PASOS = [2, 4, 6, 8, 10, 12]
MONT_MANUAL = {'igu-chi', 'chi-aca', 'maz-dgo', 'her-cuu', 'tgz-vhs', 'scc-pal', 'oax-txp', 'tol-alt', 'alt-zih',
               'chi-tla', 'tla-hua', 'uru-lzc', 'pac-vll', 'tux-pac', 'thn-oax', 'hua-oax', 'oax-scz', 'oax-pes',
               'tgz-scc', 'scc-com', 'par-dgo', 'crl-cuu', 'gdl-pvr', 'mth-slt', 'pue-hua', 'aca-zih', 'aca-pin',
               'cue-igu', 'pvr-mzo', 'mzo-lzc', 'lmo-crl', 'arr-tgz', 'tgz-coa', 'pue-xal', 'tep-pvr', 'vll-rio'} - {'mth-slt'}

def carriles_actuales(dist):
    tot = sum(dist.values()) or 1
    mejor = 2
    for L in PASOS:
        if sum(v for k, v in dist.items() if int(k) >= L) / tot >= 0.6:
            mejor = L
    p4 = sum(v for k, v in dist.items() if int(k) >= 4) / tot
    return mejor, p4

tramos = []
for a, b, pistas, plan in TRAMOS:
    k = f'{a}-{b}'
    ca, cb = CIUDADES[a], CIUDADES[b]
    recta = hav(ca[1], ca[2], cb[1], cb[2])
    t = {'id': k, 'a': IX[a], 'b': IX[b], 'ref': pistas, 'plan': plan or ''}
    if plan and plan.startswith('nuevo'):
        # no hay carretera: curva suave entre ciudades
        (x0, y0), (x1, y1) = P(ca[1], ca[2]), P(cb[1], cb[2])
        mx, my = (x0+x1)/2, (y0+y1)/2; dx, dy = x1-x0, y1-y0
        c = (mx - dy*0.12, my + dx*0.12)
        pts = [((1-s)**2*x0 + 2*(1-s)*s*c[0] + s*s*x1, (1-s)**2*y0 + 2*(1-s)*s*c[1] + s*s*y1) for s in [i/24 for i in range(25)]]
        t.update({'g': '', 'gn': path(pts), 'km': 0, 'kmn': round(recta * 1.30), 'v1': 0, 'p4': 0, 'mont': 1})
    else:
        r = rutas[k]
        pts = [P(x, y) for x, y in r['pts']]
        simp = dp(pts, 0.3)
        v1, p4 = carriles_actuales(r['carriles'])
        mont = 1 if (k in MONT_MANUAL or r['km'] / max(recta, 1) > 1.33) else 0
        t.update({'g': path(simp), 'km': round(r['km']), 'v1': v1, 'p4': round(p4, 2), 'mont': mont})
        if plan and plan.endswith('nueva'):
            # autopista nueva: trazo rectificado del camino actual (misma ruta, sin las curvas)
            rect = chaikin(dp(pts, 9.0 * ESC), 4)   # tolerancia de 9 km: se van las curvas de sierra
            kmn = max(largo_u(rect) / ESC * 1.10, recta * 1.22)   # una autopista de montaña no es recta
            t.update({'gn': path(dp(rect, 0.25)), 'kmn': round(kmn)})
    tramos.append(t)

# ── versiones de la red ──
def existe(t, v):
    if t['plan'] == 'nuevo:v3': return v >= 3
    if t['plan'] == 'nuevo:v2': return v >= 2
    return True
def trazo_nuevo(t, v):
    p = t['plan']
    return (p in ('v2:nueva', 'nuevo:v2') and v >= 2) or (p in ('v3:nueva', 'nuevo:v3') and v >= 3)
def km_v(t, v):
    return t['kmn'] if trazo_nuevo(t, v) else t['km']

EXPONENTE, DIST_MIN = 1.6, 110.0   # fricción de la distancia (calibrado contra aforos SICT de corredores conocidos)
CAP_CARRIL = 12000        # vehículos/día por carril (nivel de servicio C–D en carretera multicarril)
CRECIMIENTO = {1: 1.0, 2: 1.35, 3: 1.9}   # demanda 2026 → 2035 → 2050 (~2.7 % anual)

def vel_libre(carr, mont, nuevo):
    if carr <= 2:
        return 55 if mont else 78
    if nuevo:
        return 88 if mont else 108
    base = {4: 100, 6: 106, 8: 110, 10: 112, 12: 112}.get(carr, 110)
    return base - (18 if mont else 0)

masa = {c: CIUDADES[c][3] + MASA_LOGISTICA.get(c, 0) for c in ids}

def flujos(v, carriles, corridas=16):
    """Asigna la demanda gravitacional a la red v. Asignación estocástica (tipo probit):
    se repite con tiempos perturbados ±12 % y se promedia, para que rutas casi
    equivalentes se repartan el tránsito en vez de que una se lo lleve todo."""
    import random
    rnd = random.Random(181218)
    base = []
    for i, t in enumerate(tramos):
        if existe(t, v):
            base.append((t['a'], t['b'], km_v(t, v) / vel_libre(carriles[i], t['mont'], trazo_nuevo(t, v)), i))
    carga = [0.0] * len(tramos); pesado = [0.0] * len(tramos)
    demanda = {}
    for s in range(len(ids)):
        for tg in range(s + 1, len(ids)):
            ms, mt = masa[ids[s]], masa[ids[tg]]
            if ms <= 0 or mt <= 0: continue
            ci, cj = CIUDADES[ids[s]], CIUDADES[ids[tg]]
            d = max(DIST_MIN, hav(ci[1], ci[2], cj[1], cj[2]))
            total = ms * mt / d**EXPONENTE / corridas
            gente = CIUDADES[ids[s]][3] * CIUDADES[ids[tg]][3] / d**EXPONENTE / corridas
            demanda[(s, tg)] = (total, total - gente)
    for _ in range(corridas):
        adj = defaultdict(list)
        for a, b, h, i in base:
            hh = h * math.exp(rnd.gauss(0, 0.12))
            adj[a].append((b, hh, i)); adj[b].append((a, hh, i))
        for s in range(len(ids)):
            if masa[ids[s]] <= 0: continue
            dist = {s: 0.0}; prev = {}; pq = [(0.0, s)]; hecho = set()
            while pq:
                d, i = heapq.heappop(pq)
                if i in hecho: continue
                hecho.add(i)
                for j, h, e in adj[i]:
                    if d + h < dist.get(j, 1e18):
                        dist[j] = d + h; prev[j] = (i, e); heapq.heappush(pq, (d + h, j))
            for tg in range(s + 1, len(ids)):
                par = demanda.get((s, tg))
                if not par or tg not in prev: continue
                fl, fp = par
                k = tg
                while k != s:
                    i, e = prev[k]; carga[e] += fl; pesado[e] += fp; k = i
    # equivalentes de auto (PCE): 25 % de camiones en el tránsito normal, carga pura ×2
    return [(c_ - p_) * 1.25 + p_ * 2.0 for c_, p_ in zip(carga, pesado)], carga

def a_par(x):
    x = int(math.ceil(x - 1e-9))
    return x + (x % 2)

# 1.0: carriles medidos
v1 = [t['v1'] if existe(t, 1) else 0 for t in tramos]
e1, c1 = flujos(1, v1)
k_ref = [i for i, t in enumerate(tramos) if t['id'] == 'jil-qro'][0]
ESCALA = 70000.0 / c1[k_ref]      # calibración: México–Querétaro a la altura de Palmillas ≈ 70 mil veh/día
def local(t):
    # tránsito local y regional (pueblos, agricultura, turismo) que el modelo entre ~120 ciudades no ve
    pa, pb = CIUDADES[ids[t['a']]][3], CIUDADES[ids[t['b']]][3]
    return 1800 + 2.0 * min(pa + pb, 3000)
LOCAL = [local(t) for t in tramos]
tdpa1 = [c * ESCALA + LOCAL[i] for i, c in enumerate(c1)]; pce1 = [c * ESCALA + LOCAL[i] * 1.3 for i, c in enumerate(e1)]

def necesarios(pce, v):
    return min(12, max(2, a_par(pce * CRECIMIENTO[v] / (CAP_CARRIL * 1.25))))

# 2.0: mínimos del plan + lo que pide el flujo (se itera porque ampliar atrae tránsito)
v2 = []
for i, t in enumerate(tramos):
    base = t['v1'] if existe(t, 1) else 0
    if t['plan'] in ('v2:4', 'v2:nueva', 'nuevo:v2'): base = max(base, 4)
    v2.append(base if existe(t, 2) else 0)
for _ in range(3):
    e2, c2 = flujos(2, v2)
    tdpa2 = [c * ESCALA + LOCAL[i] for i, c in enumerate(c2)]; pce2 = [c * ESCALA + LOCAL[i] * 1.3 for i, c in enumerate(e2)]
    v2 = [min(max(v2[i], necesarios(pce2[i], 2)), max(4, t['v1']) + 4) if existe(t, 2) else 0 for i, t in enumerate(tramos)]

# 3.0: todo tramo ≥ 4 carriles, más lo que pide el flujo de 2050
v3 = [max(v2[i], 4) if existe(t, 3) else 0 for i, t in enumerate(tramos)]
for _ in range(3):
    e3, c3 = flujos(3, v3)
    tdpa3 = [c * ESCALA + LOCAL[i] for i, c in enumerate(c3)]; pce3 = [c * ESCALA + LOCAL[i] * 1.3 for i, c in enumerate(e3)]
    v3 = [max(v3[i], necesarios(pce3[i], 3)) for i, t in enumerate(tramos)]

def minutos(t, v, carr, pce):
    # tiempo con la demanda de HOY, para que 1.0 / 2.0 / 3.0 se comparen en igualdad
    if not existe(t, v): return 0
    vl = vel_libre(carr, t['mont'], trazo_nuevo(t, v))
    x = min(1.3, pce / max(1, carr * CAP_CARRIL * 1.25))
    vel = vl / (1 + 0.15 * x**4)            # BPR: la congestión frena (acotado)
    return round(km_v(t, v) / vel * 60, 1)

for i, t in enumerate(tramos):
    t['L'] = [v1[i], v2[i], v3[i]]
    t['q'] = [round(tdpa1[i] / 100) * 100, round(tdpa2[i] * CRECIMIENTO[2] / 100) * 100, round(tdpa3[i] * CRECIMIENTO[3] / 100) * 100]
    hoy = pce1[i] if existe(t, 1) else pce3[i] / CRECIMIENTO[3]
    t['m'] = [minutos(t, 1, v1[i], hoy), minutos(t, 2, v2[i], hoy), minutos(t, 3, v3[i], hoy)]
    t['K'] = [km_v(t, 1) if existe(t, 1) else 0, km_v(t, 2) if existe(t, 2) else 0, km_v(t, 3)]

# ── resumen en consola ──
def resumen(v):
    km = sum(t['K'][v-1] for t in tramos)
    km4 = sum(t['K'][v-1] for t in tramos if t['L'][v-1] >= 4)
    kmc = sum(t['K'][v-1] * t['L'][v-1] for t in tramos)
    return km, km4, kmc
for v in (1, 2, 3):
    km, km4, kmc = resumen(v)
    print(f'v{v}: {km:,.0f} km · ≥4 carriles {km4:,.0f} ({km4/km:.0%}) · km-carril {kmc:,.0f}')
print('\nTramo           km   L1 L2 L3   TDPA1   TDPA2   TDPA3   min1  min2  min3')
for t in sorted(tramos, key=lambda t: -t['q'][0]):
    print(f"{t['id']:<12} {t['K'][2]:5} {t['L'][0]:4}{t['L'][1]:3}{t['L'][2]:3} {t['q'][0]:7} {t['q'][1]:7} {t['q'][2]:7} {t['m'][0]:6} {t['m'][1]:5} {t['m'][2]:5}  {t['plan']}")

# ── proyectos ──
proy = []
for ver, titulo, lista, razon, estado in PROYECTOS:
    idx = []
    for a, b in lista:
        k1, k2 = f'{a}-{b}', f'{b}-{a}'
        m = [i for i, t in enumerate(tramos) if t['id'] in (k1, k2)]
        if not m: raise SystemExit(f'Proyecto {titulo}: no existe el tramo {a}-{b}')
        idx.append(m[0])
    proy.append({'v': int(ver[1]), 't': titulo, 'e': idx, 'r': razon, 's': estado})

ROTULOS = [
    ('OCÉANO PACÍFICO', -109.2, 17.2, 'mar'), ('GOLFO DE MÉXICO', -93.2, 24.2, 'mar'), ('MAR CARIBE', -86.9, 16.9, 'mar'),
    ('Golfo de California', -111.4, 28.35, 'mar2'),
    ('ESTADOS UNIDOS', -104.6, 32.45, 'pais'), ('GUATEMALA', -90.35, 15.35, 'pais'), ('BELICE', -88.72, 17.55, 'pais'),
]
rotulos = [{'t': t, 'x': round(P(lo, la)[0], 1), 'y': round(P(lo, la)[1], 1), 'c': cl} for t, lo, la, cl in ROTULOS]
marca = P(-92.2, 25.4)

DATOS = {
    'W': W, 'H': H, 'esc': round(ESC, 5), 'rotulos': rotulos, 'marca': [round(marca[0], 1), round(marca[1], 1)], 'estados': estados, 'vecinos': vecinos, 'sec': sec,
    'ciudades': ciudades, 'tramos': [{k: t[k] for k in ('id', 'a', 'b', 'ref', 'plan', 'g', 'gn', 'km', 'kmn', 'p4', 'mont', 'L', 'q', 'm', 'K') if k in t} for t in tramos],
    'proyectos': proy, 'rev': _rev,
}
for t in DATOS['tramos']:
    t.setdefault('gn', ''); t.setdefault('kmn', 0)
js = json.dumps(DATOS, ensure_ascii=False, separators=(',', ':'))
print('\nDatos:', len(js) // 1024, 'KB')
plantilla = open(os.path.join(AQUI, 'plantilla.html'), encoding='utf-8').read()
html = plantilla.replace('/*__DATOS__*/null', js)
open(os.path.join(RAIZ, 'index.html'), 'w', encoding='utf-8').write(html)
print('index.html', len(html) // 1024, 'KB')
