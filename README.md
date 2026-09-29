# Carreteras de México · 1.0 → 2.0 → 3.0

<!-- RLR · Ricardo López Reyero -->

Mapa interactivo de la red carretera principal de México, en una sola pantalla y en tres versiones:

- **1.0 · Hoy.** Cada carretera trazada sobre su geometría real, con un grosor según sus carriles.
- **2.0 · Completar (≈2035).** Se cierran los huecos. Todo corredor troncal llega a 4 carriles, se construyen autopistas nuevas donde la sierra lo obliga y se agregan carriles donde el tránsito ya los pide.
- **3.0 · Impecable (≈2050).** Ningún tramo queda con menos de 4 carriles. Hay cruces nuevos de las dos Sierras Madre, la frontera norte y las dos costas son continuas, y los megacorredores tienen de 8 a 12 carriles.

Es un solo archivo, `index.html`, sin dependencias. Se abre directo en el navegador.

## Qué se puede hacer en el mapa

- **Cambiar de versión** con los botones 1.0 / 2.0 / 3.0, con las teclas `1`, `2` y `3`, o con ▶ para recorrer las tres.
- **Tocar una carretera** para ver sus carriles en cada versión, el tránsito estimado y el tiempo de recorrido.
- **Tocar dos ciudades** (o elegirlas en *Mide un viaje*) para ver la ruta más rápida y cuánto tarda en 1.0, 2.0 y 3.0.
- **Tocar un proyecto** del panel para resaltar sus tramos y hacer zoom a ellos.
- **Moverse por el mapa:** rueda o pellizco para acercar, arrastrar para mover, `⤢` para volver a ver todo el país, `≋` para prender o apagar la red secundaria.

## Resultados

| | 1.0 Hoy | 2.0 Completar | 3.0 Impecable |
|---|---:|---:|---:|
| Km de corredores con ≥ 4 carriles | 11,451 (39 %) | 18,615 (64 %) | 29,057 (100 %) |
| Capacidad (miles de km-carril) | 82 | 100 (+23 %) | 126 (+54 %) |
| Viaje medio entre las 32 capitales | 15 h 12 | 14 h 06 | 13 h 12 |
| Viajes entre capitales hechos todo el camino a ≥ 4 carriles | 33 % | 55 % | 100 % |

Los tres tiempos se calculan con la demanda de hoy, así que las versiones se comparan en igualdad.

## Cómo se hizo

1. **Trazo real.** La red se modela con 129 ciudades y 180 tramos. Cada tramo se traza con A* por la ruta más rápida sobre OpenStreetMap: autopistas, troncales, rampas y federales primarias y secundarias, con corte a septiembre de 2026. El trazo sigue el número de carretera indicado, y Natural Earth sólo rellena huecos.
2. **Carriles de hoy.** Se miden en OSM a lo largo de cada tramo, sin contar las entradas urbanas. El valor asignado es el número de carriles que se cumple en al menos el 60 % del recorrido.
   - Se contrastaron con el inventario de carriles de la red federal libre de SICT (diciembre de 2024) y con el Anuario Estadístico SICT 2024.
   - Según SICT hay 52,044 km federales, de los cuales 14,255 km tienen 4 carriles o más.
3. **Tránsito.** Se estima con un modelo gravitacional: población × población ÷ distancia^1.6.
   - A la población se le suma una masa logística para puertos y cruces fronterizos: Nuevo Laredo, Manzanillo, Lázaro Cárdenas, Veracruz, Altamira, etc.
   - La demanda se reparte en la red con asignación estocástica y se calibra a ~70 mil vehículos/día en México–Querétaro.
4. **Grosor 2.0 y 3.0.** Se pone un carril por cada ~12 mil vehículos diarios, que equivalen a 15 mil con 25 % de camiones; la carga de puertos y fronteras pesa doble. La demanda se proyecta a 2035 (×1.35) y a 2050 (×1.9). A eso se suman los mínimos de cada plan:
   - en 2.0, todo corredor troncal tiene al menos 4 carriles;
   - en 3.0, ningún tramo tiene menos de 4.
5. **2.0 incluye lo que ya está en obra o en licitación** según el Programa Nacional de Infraestructura Carretera 2025–2030 (corte de septiembre de 2026): Macuspana–Escárcega, Corredor del Golfo, Cd. Valles–Tampico, Saltillo–Monclova, Nueva Italia–Lázaro Cárdenas, Tulancingo–Necaxa y Palenque–Ocosingo. Donde el programa sólo ensancha la carretera a 12 m, 2.0 la lleva a 4 carriles.
6. **Tiempos.** La velocidad depende de los carriles y de si el tramo es de sierra. La congestión se calcula con la curva BPR.
7. **Proyección.** Cónica conforme de Lambert con los parámetros del INEGI.

El tránsito es un **modelo**, no un aforo. Sirve para ordenar prioridades y dimensionar; no sustituye un estudio de tránsito.

## Regenerar

```bash
cd herramientas
python3 construir.py
```

`construir.py` lee las rutas ya trazadas (`herramientas/cache/rutas.json`) y escribe `index.html` a partir de `plantilla.html`.

Hay que volver a trazar las rutas si cambian las ciudades o los tramos de `red.py`. Primero se bajan los datos fuente a `datos_fuente/` (la carpeta no se sube al repo por su tamaño):

```bash
mkdir -p datos_fuente && cd datos_fuente
curl -sSLO https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_roads.geojson
curl -sSL -o ne_10m_admin1.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson
curl -sSL -o ne_10m_admin0.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson
curl -sS -A "carreteras-mexico-map/1.0" -o osm_motorway_trunk.json --data-urlencode 'data=[out:json][timeout:900];area["ISO3166-1"="MX"][admin_level=2]->.mx;way["highway"~"^(motorway|trunk)$"](area.mx);out tags geom qt;' https://overpass-api.de/api/interpreter
curl -sS -A "carreteras-mexico-map/1.0" -o osm_links_primary.json --data-urlencode 'data=[out:json][timeout:900];area["ISO3166-1"="MX"][admin_level=2]->.mx;(way["highway"~"^(motorway_link|trunk_link)$"](area.mx);way["highway"~"^(primary|secondary)$"]["ref"~"MEX"](area.mx););out tags geom qt;' https://overpass-api.de/api/interpreter
```

Después se trazan y se construye:

```bash
cd ../herramientas && python3 rutas.py && python3 construir.py
```

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | El mapa completo, con los datos incrustados |
| `herramientas/red.py` | Ciudades, tramos, planes 2.0/3.0 y proyectos |
| `herramientas/rutas.py` | Grafo OSM + Natural Earth y trazo A* de cada tramo |
| `herramientas/construir.py` | Proyección, carriles, modelo de flujos, grosor 2.0/3.0 y compilación |
| `herramientas/plantilla.html` | Interfaz: mapa SVG, panel, zoom, viajes y proyectos |
| `herramientas/cache/rutas.json` | Rutas ya trazadas, para compilar sin bajar los datos fuente |

## Fuentes y licencias

- **OpenStreetMap** © colaboradores de OpenStreetMap, bajo licencia [ODbL](https://www.openstreetmap.org/copyright). Los trazos incluidos en `index.html` y en `rutas.json` son datos derivados de OSM y se ofrecen bajo la misma licencia.
- **Natural Earth**, de dominio público: contornos estatales, países vecinos y la red secundaria.
- **SICT:** inventario de carriles de la red federal libre (dic. 2024), Anuario Estadístico 2024 y Programa Nacional de Infraestructura Carretera 2025–2030.
- **INEGI:** zonas metropolitanas del Censo 2020 y parámetros de proyección.

---
Ricardo López Reyero · 2026
