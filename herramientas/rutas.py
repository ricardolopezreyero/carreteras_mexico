# -*- coding: utf-8 -*-
# RLR · Trazo de cada tramo sobre la geometría real — Ricardo López Reyero
# Grafo = OpenStreetMap (motorway + trunk, al día) + Natural Earth (red federal) como respaldo.
# Cada tramo se traza con A* por la ruta más rápida, favoreciendo la carretera indicada.
import json, math, heapq, re, os, sys
from collections import defaultdict

AQUI = os.path.dirname(os.path.abspath(__file__))
FUENTE = os.path.join(AQUI, '..', 'datos_fuente')
CACHE = os.path.join(AQUI, 'cache')
os.makedirs(CACHE, exist_ok=True)
sys.path.insert(0, AQUI)
from red import CIUDADES, TRAMOS, VIAS

R = 6371.0
def hav(lon1, lat1, lon2, lat2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = p2 - p1, math.radians(lon2 - lon1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2*R*math.asin(math.sqrt(a))

def numeros(ref):
    return set(re.findall(r'(\d+)', ref or ''))

# ── grafo ──
lon, lat = [], []
idx = {}
def nodo(x, y, prec=6):
    k = (round(x, prec), round(y, prec))
    i = idx.get(k)
    if i is None:
        i = len(lon); idx[k] = i; lon.append(k[0]); lat.append(k[1])
    return i

adj = defaultdict(list)       # i -> [(j, arista)]
AR = []                       # aristas: (km, vel, carriles, refs(set), fuente)
def arista(i, j, km, vel, carr, refs, fuente):
    e = len(AR); AR.append((km, vel, carr, refs, fuente))
    adj[i].append((j, e)); adj[j].append((i, e))

def cargar_osm(archivo):
    ext = []
    for w in json.load(open(os.path.join(FUENTE, archivo)))['elements']:
        t = w.get('tags', {}); g = w['geometry']
        h = t.get('highway'); ow = t.get('oneway') in ('yes', '1', '-1')
        try: ln = float(t.get('lanes', '0').split(';')[0])
        except ValueError: ln = 0
        enlace = h.endswith('_link')
        if ow:
            carr = 2 * (ln if ln >= 1 else 2)
        else:
            carr = ln if ln >= 2 else 2
        carr = int(round(carr))
        if enlace:
            vel, carr = 45, 0
        elif h == 'motorway':
            vel = 110 if carr >= 4 else 90
        elif h == 'trunk':
            vel = 95 if carr >= 4 else 75
        else:
            vel = 85 if carr >= 4 else 65
        refs = numeros(t.get('ref')) if not enlace else None
        prev = None
        for p in g:
            cur = nodo(p['lon'], p['lat'])
            if prev is not None and prev != cur:
                arista(prev, cur, hav(lon[prev], lat[prev], lon[cur], lat[cur]), vel, carr, refs, 'osm')
            prev = cur
        if not enlace:
            ext.append(nodo(g[0]['lon'], g[0]['lat'])); ext.append(nodo(g[-1]['lon'], g[-1]['lat']))
    return ext

print('Cargando OSM…')
extremos = cargar_osm('osm_motorway_trunk.json') + cargar_osm('osm_links_primary.json')
print('  nodos OSM', len(lon), 'aristas', len(AR))
n_osm = len(lon)
print('  nodos OSM', n_osm, 'aristas', len(AR))

print('Cargando Natural Earth…')
ne = json.load(open(os.path.join(FUENTE, 'ne_10m_roads.geojson')))['features']
ne_nodos = []
for f in ne:
    p = f['properties']
    if p.get('sov_a3') != 'MEX' or p.get('type') == 'Ferry Route':
        continue
    g = f['geometry']
    lines = g['coordinates'] if g['type'] == 'MultiLineString' else [g['coordinates']]
    vel = 55 if p.get('type') == 'Major Highway' else 50
    refs = numeros(p.get('name'))
    for ln_ in lines:
        prev = None
        for x, y in ln_:
            cur = nodo(x, y, 4)
            ne_nodos.append(cur)
            if prev is not None and prev != cur:
                arista(prev, cur, hav(lon[prev], lat[prev], lon[cur], lat[cur]), vel, 2, refs, 'ne')
            prev = cur

# rejilla para vecinos cercanos
CEL = 0.02
rej = defaultdict(list)
for i in range(n_osm):
    rej[(int(lon[i] // CEL), int(lat[i] // CEL))].append(i)
def cercano(i, radio_km, excluir=None):
    cx, cy = int(lon[i] // CEL), int(lat[i] // CEL)
    r = int(radio_km / (CEL * 100)) + 1
    mejor, dm = None, radio_km
    for dx in range(-r, r+1):
        for dy in range(-r, r+1):
            for j in rej.get((cx+dx, cy+dy), ()):
                if j == i or (excluir and j in excluir): continue
                d = hav(lon[i], lat[i], lon[j], lat[j])
                if d < dm: mejor, dm = j, d
    return mejor, dm

print('Conectores NE→OSM…')
n_con = 0
for i in set(ne_nodos):
    j, d = cercano(i, 2.0)
    if j is not None:
        arista(i, j, d, 25, 2, set(), 'con'); n_con += 1
print('  ', n_con)
print('Cierre de huecos OSM…')
n_hue = 0
for i in set(extremos):
    if len(adj[i]) == 1:
        vecinos = {j for j, _ in adj[i]}
        j, d = cercano(i, 1.5, excluir=vecinos | {i})
        if j is not None and d > 0.001:
            arista(i, j, d, 30, 2, set(), 'con'); n_hue += 1
print('  ', n_hue)

# componente conexo principal
comp = [-1] * len(lon); c = 0; tam = {}
for s0 in range(len(lon)):
    if comp[s0] >= 0 or not adj[s0]: continue
    pila = [s0]; comp[s0] = c; n = 0
    while pila:
        i = pila.pop(); n += 1
        for j, _ in adj[i]:
            if comp[j] < 0: comp[j] = c; pila.append(j)
    tam[c] = n; c += 1
principal = max(tam, key=tam.get)
print('componentes', len(tam), 'principal', tam[principal])
rej_all = defaultdict(list)
for i in range(len(lon)):
    if comp[i] == principal:
        rej_all[(int(lon[i] // CEL), int(lat[i] // CEL))].append(i)
def anclar(x, y):
    cx, cy = int(x // CEL), int(y // CEL)
    for r in range(1, 40):
        cand = []
        for dx in range(-r, r+1):
            for dy in range(-r, r+1):
                cand += rej_all.get((cx+dx, cy+dy), [])
        if cand:
            # preferir nodos OSM bien conectados
            return min(cand, key=lambda j: hav(x, y, lon[j], lat[j]) * (1 if j < n_osm else 1.5))
    return None

def ruta(a, b, pistas):
    ia, ib = anclar(*a), anclar(*b)
    pist = set(re.findall(r'\d+', pistas or ''))
    def costo(e):
        km, vel, carr, refs, fuente = AR[e]
        h = km / vel
        if pist and refs is not None and not (refs & pist):
            h *= 1.5
        return h
    vmax = 110.0
    def heur(i):
        return hav(lon[i], lat[i], lon[ib], lat[ib]) / vmax
    dist = {ia: 0.0}; prev = {}
    pq = [(heur(ia), 0.0, ia)]
    visit = set()
    while pq:
        f, g, i = heapq.heappop(pq)
        if i in visit: continue
        visit.add(i)
        if i == ib: break
        for j, e in adj[i]:
            ng = g + costo(e)
            if ng < dist.get(j, 1e18):
                dist[j] = ng; prev[j] = (i, e)
                heapq.heappush(pq, (ng + heur(j), ng, j))
    if ib not in prev and ia != ib:
        return None
    cam, aris = [ib], []
    while cam[-1] != ia:
        i, e = prev[cam[-1]]
        aris.append(e); cam.append(i)
    cam.reverse(); aris.reverse()
    return [(lon[i], lat[i]) for i in cam], aris

if __name__ == '__main__':
    salida = {}
    for a, b, pistas, plan in TRAMOS:
        if plan and plan.startswith('nuevo'):
            continue
        ca, cb = CIUDADES[a], CIUDADES[b]
        paradas = [(ca[1], ca[2])] + VIAS.get((a, b), []) + [(cb[1], cb[2])]
        pts, aris, ok = [], [], True
        for p, q in zip(paradas, paradas[1:]):
            r = ruta(p, q, pistas)
            if r is None: ok = False; break
            pts += r[0] if not pts else r[0][1:]
            aris += r[1]
        if not ok:
            print('SIN RUTA', a, b); continue
        km = sum(AR[e][0] for e in aris)
        recta = hav(ca[1], ca[2], cb[1], cb[2])
        por_carr = defaultdict(float); por_fuente = defaultdict(float); pista_ok = 0.0
        pist = set(re.findall(r'\d+', pistas or ''))
        recorte = min(15.0, 0.06 * km); acum = 0.0
        for e in aris:
            k, v, c, refs, fu = AR[e]
            # carriles sólo en el cuerpo del tramo (sin las entradas urbanas) y sin rampas
            if acum >= recorte and acum + k <= km - recorte and c > 0:
                por_carr[c] += k
            acum += k
            por_fuente[fu] += k
            if not pist or (refs and refs & pist): pista_ok += k
        salida[f'{a}-{b}'] = {
            'pts': [[round(x, 5), round(y, 5)] for x, y in pts],
            'km': round(km, 1), 'recta': round(recta, 1),
            'carriles': {str(k): round(v, 1) for k, v in por_carr.items()},
            'fuente': {k: round(v, 1) for k, v in por_fuente.items()},
            'pista': round(pista_ok / km, 2) if km else 1,
        }
        fu = salida[f'{a}-{b}']['fuente']
        print(f"{a:>4}-{b:<4} {km:7.1f} km  recta {recta:6.1f}  x{km/recta if recta else 0:4.2f}  pista {salida[f'{a}-{b}']['pista']:.2f}  "
              f"osm {fu.get('osm',0):6.1f} ne {fu.get('ne',0):6.1f} con {fu.get('con',0):5.1f}  carr {dict(sorted(salida[f'{a}-{b}']['carriles'].items()))}")
    json.dump(salida, open(os.path.join(CACHE, 'rutas.json'), 'w'))
    print('OK', len(salida))
