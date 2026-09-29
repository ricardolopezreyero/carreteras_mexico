# Carreteras de México · 1.0 → 2.0 → 3.0 → 4.0

**Ver en vivo: [carreteras.capitaltorreon.com](https://carreteras.capitaltorreon.com)**

<!-- RLR · Ricardo López Reyero -->

Mapa interactivo de la red carretera principal de México en una sola pantalla. Tiene cuatro versiones, un plan de obra y un tablero de analítica.

- **1.0 · Hoy.** Cada carretera sigue su trazo real y su grosor corresponde a sus carriles.
- **2.0 · Completar (≈2035).**
  - Todo corredor troncal llega a 4 carriles.
  - Se construyen autopistas nuevas donde la sierra lo obliga.
  - Se agregan carriles donde el tránsito ya los pide.
- **3.0 · Sueño dorado (≈2050).**
  - Ningún tramo queda con menos de 4 carriles.
  - La sierra se cruza con trazos rectos a 115 km/h.
  - Las rutas de exportación a EUA tienen 6 carriles o más (por ejemplo Monclova–Piedras Negras y el eje T-MEC).
  - Los megacorredores llegan a 14 carriles.
- **4.0 · Máximo potencial.**
  - Toda la red va a 130 km/h (118 en sierra): donde el camino de hoy ya es recto se amplía en su lugar; donde rodea, se abre trazo nuevo.
  - El corredor central (Guadalajara–Bajío–CDMX–Puebla–Veracruz, con sus ramales) tiene de 10 a 14 carriles.
  - Hay 25 conexiones directas nuevas, elegidas por algoritmo, para que ninguna ciudad quede con rodeos grandes.

Todo está en un solo archivo, `index.html`, sin dependencias.

## Cómo está organizada

La aplicación tiene una **barra lateral** con el mismo esquema de los demás proyectos: el espacio del logo arriba, las secciones en medio y el espacio del usuario abajo. Por ahora no hay logo ni acceso, pero los dos espacios ya están listos. En escritorio la barra se pliega a íconos; en celular se abre como cajón desde ☰.

Las versiones 1.0, 2.0, 3.0 y 4.0 se cambian en la barra superior (también con las teclas `1` a `4`, o con ▶ para recorrerlas) y aplican a todas las secciones.

| Grupo | Sección | Qué muestra |
|---|---|---|
| Por qué | **Manifiesto** | Por qué estamos haciendo esto: tres párrafos firmados por Ing. Ricardo López Reyero (Torreón, 29 de septiembre de 2026) |
| Red | **Mapa** | La red con su grosor por carriles, la descripción de la versión, 4 indicadores, las cuatro versiones comparadas y lo que cambia en cada una |
| Red | **Mide un viaje** | Origen y destino, 10 viajes frecuentes, el tiempo en 1.0 a 4.0 y el camino tramo por tramo |
| Obra | **Proyectos** | Frentes de obra por versión con km, costo y estado oficial. En 1.0: capitales peor unidas y tramos saturados (plegados) |
| Obra | **Plan de obra** | El orden de construcción por valor (62 obras, cada tramo una sola vez), las obras que se pagan solas, ritmo de inversión, hitos de ahorro, reproductor y curva de velocidad contra inversión |
| Ejecución | **La fórmula** | La unidad de obra (1 frente = 1 km/día), lo que cada versión le pide a la obra (km-carril, concreto, cemento, acero, frentes, personas), los frentes que exige el plan según el ritmo, la receta en 12 renglones, las reglas y la ruta de ejecución |
| Ejecución | **Pavimento 50 años** | La especificación: cómo se muere una carretera, por qué concreto, las cinco capas en un bloque 3D que se separa y se gira, la losa CRCP, la mezcla, las 8 mejoras, lo que no se usa, las reglas de obra, el orden para recortar, qué se ajusta por región y cómo se garantiza |
| Ejecución | **Obra y flotilla** | La aritmética de los 227 m³/h, planta y acarreo, el tren de colado, la flotilla por frente (compra/renta), los frentes escalonados, el día de 24 horas, el tablero diario y la movilización |
| Ejecución | **Plantilla y organigrama** | Las ~115 personas de un frente por turno, el organigrama de cuatro líneas, los seis perfiles clave, las reglas de autoridad, la cadencia de juntas, cómo contratar y retener |
| Ejecución | **Modelo de negocio** | Disponibilidad en lugar de obra, las cinco fuentes de ingreso, la inversión, el punto de equilibrio, la conservación, la ventaja defendible, los riesgos y los primeros 12 meses |
| Datos | **Analítica** | Una frase de resumen y seis preguntas (cuánto tardamos, a cuánta gente llegamos, cuánto más viajamos, cuánto cuesta y devuelve, qué tan segura y qué tan ancha es la red), las 32 capitales y, plegadas, las 31 métricas, las conexiones lentas y los tramos saturados |
| Datos | **Metodología** | Datos, modelo, parámetros, costos, límites y fuentes |

Para agregar una sección basta una línea en `SECCIONES` (en `plantilla.html`) y un archivo en `herramientas/secciones/` con su `PAGINAS.id`; `construir.py` lo inserta solo.

## Ejecución: cómo se construye

Todo lo nuevo de la red se construye con el estándar de **pavimento para 50 años** (documento fuente en `docs/Proyecto_Pavimento_50_anios.md`):
- losa de concreto reforzado continuo de 27 cm;
- carril colado de 4.20 m con la raya a 3.60 m;
- drenaje de borde inspeccionable;
- colado nocturno.

La obra se mide en **km-carril**. Un frente de 1 km/día cuela 2 carriles por noche, es decir 500 km-carril al año, con unas 115 personas y una flotilla de USD 7.8–13.3 millones.

| Desde hoy hasta | 2.0 | 3.0 | 4.0 |
|---|---:|---:|---:|
| Km-carril nuevos | 19,932 | 75,776 | 124,110 |
| Frentes-año de trabajo | 40 | 152 | 248 |

El plan de obra construye los mismos 124,110 km-carril de 4.0, porque cada tramo se construye una sola vez. Frentes trabajando a la vez según el ritmo de inversión:

| Ritmo de inversión | Termina | Frentes a la vez |
|---|---:|---:|
| $110 mil millones al año | 2083 | 4.4 |
| $220 mil millones al año | 2055 | 8.8 |
| $330 mil millones al año | 2046 | 13.3 |

## Resultados

| | 1.0 Hoy | 2.0 | 3.0 | 4.0 |
|---|---:|---:|---:|---:|
| Velocidad efectiva entre capitales (línea recta ÷ tiempo) | 57 km/h | 61 | 68 | 92 |
| Viaje medio entre las 32 capitales | 15 h 14 | 14 h 06 | 12 h 37 | 9 h 22 |
| Mercado a 4 h (personas de otras ciudades) | 11.0 M | 12.8 M | 15.9 M | 23.4 M |
| Viajes entre ciudades (hoy = 1.0) | ×1.00 | ×1.19 | ×1.37 | ×2.07 |
| Red con ≥ 4 carriles | 39 % | 64 % | 100 % | 100 % |
| Ahorro anual en tiempo y vehículo (2035) | — | $71 mil M | $190 mil M | $362 mil M |
| Inversión estimada desde hoy | — | $646 mil M | $3,025 mil M | $6,181 mil M |
| Beneficio ÷ costo (30 años, 10 %) | — | 1.33 | 0.75 | 0.70 |
| Muertes estimadas al año en la red | 3,003 | 2,654 | 2,028 | 1,228 |
| Tramos saturados en 2035 | 25 | 9 | 0 | 0 |

**Plan de obra: un solo orden, por valor, y cada tramo una sola vez.** Cada obra lleva su tramo directo a su estándar final (el de 4.0): no se amplía un camino que después se sustituye por un trazo nuevo. Es la regla del pavimento de 50 años llevada a la red. En cada paso va la obra que más ahorra por peso invertido, con efectos de red.

| | Por etapas (2.0 → 3.0 → 4.0) | Una vez, por valor |
|---|---:|---:|
| Costo para llegar a la red 4.0 | $9,053 mil M | **$6,181 mil M** |

**14 obras se pagan solas** con ahorro de tiempo y vehículo (B/C mayor que 1): $918 mil millones que dan el 46 % del ahorro final. Al ritmo de 1 % del PIB ($330 mil M/año) se alcanza la mitad del ahorro en 2030, el 80 % en 2035 y el total en 2045.

Las primeras obras son:
1. Tlaxcala–CDMX directo
2. Poza Rica–Pachuca directo
3. Morelia–Colima directo
4. Toluca–Morelia directo
5. Tampico–Pachuca directo

## Cómo se hizo

1. **Trazo real.** La red tiene 129 ciudades y 180 tramos. Cada tramo se traza con A* por la ruta más rápida sobre OpenStreetMap (septiembre de 2026) y sigue el número de carretera. En la Sierra Tarahumara se usan también los caminos estatales, para que Creel quede bien anclado.
2. **Carriles de hoy.** Se miden en OSM y se contrastan con el inventario SICT de la red federal (diciembre de 2024).
3. **Tránsito.** El modelo gravitacional se calibra a ~70 mil vehículos/día en México–Querétaro.
   - La demanda se reparte con asignación estocástica.
   - La carga crece más rápido que las personas por el nearshoring: ×2.6 contra ×1.7 a 2050.
   - Piedras Negras tiene masa logística propia como cruce hacia Texas.
4. **Grosor.** Un carril cubre 12 mil vehículos diarios en 2.0, 10 mil en 3.0 y 8,500 en 4.0. Un camión cuenta como 2 autos.
5. **3.0.** Se rectifica todo tramo cuyo recorrido es 20 % mayor que la línea recta.
6. **4.0.** El trazo nuevo sólo se abre si acorta el camino 10 % o más; si no, el corredor se amplía y se lleva a 130 km/h en su lugar (en sierra, sólo si ya es autopista de 4 carriles). El algoritmo agrega conexiones en dos pasos:
   - prueba cada par de ciudades por tierra y construye la línea directa donde el beneficio supera al costo;
   - después "cose" la red hasta que ninguna ciudad quede con rodeos grandes hacia sus vecinas.
7. **Economía.**
   - El valor del tiempo es de 180 MXN/h por auto y 650 por camión, más el costo de operar el vehículo, con el tránsito de 2035.
   - La evaluación es a 30 años con tasa social del 10 %.
   - Los costos son paramétricos de 2026: ampliar a 4 carriles 45–95 millones/km, trazo nuevo 120–240, alta velocidad 170–330 y llevar un corredor a 130 km/h en su lugar 30–60 (llano–sierra).
   - No se incluyen aglomeración, exportaciones ni vidas salvadas, así que el beneficio real es mayor.
8. **Plan de obra.** Cada tramo se construye una vez, directo a su estándar final. En cada paso se elige la obra con mayor beneficio/costo, dado lo que ya se construyó; así se capturan los efectos de red. Las obras se agrupan como se licitan: proyectos de un corredor, cada conexión directa nueva y, lo demás, por eje.
9. **Tiempos.** Dependen de los carriles, el trazo y la sierra, e incluyen congestión (curva BPR). Se calculan con la demanda de hoy en las cuatro versiones para compararlas en igualdad.

El tránsito es un **modelo**, no un aforo: sirve para ordenar prioridades y dimensionar.

## Regenerar

```bash
cd herramientas
python3 construir.py
```

Para publicar en carreteras.capitaltorreon.com (Cloudflare Worker `carreteras-mexico`, cuenta SuperLeads; sólo sube `index.html`, ver `.assetsignore`), desde la raíz del repo:

```bash
npx wrangler deploy
```

El push a `main` actualiza además la copia en GitHub Pages (ricardolopezreyero.github.io/carreteras_mexico).

`construir.py` lee las rutas ya trazadas (`herramientas/cache/rutas.json`) y escribe `index.html` a partir de `plantilla.html`. La compilación es reproducible: con los mismos datos sale idéntica.

Hay que volver a trazar las rutas si cambian las ciudades o los tramos de `red.py`. Primero se bajan los datos fuente a `datos_fuente/` (la carpeta no se sube al repo por su tamaño):

```bash
mkdir -p datos_fuente && cd datos_fuente
curl -sSLO https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_roads.geojson
curl -sSL -o ne_10m_admin1.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson
curl -sSL -o ne_10m_admin0.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson
curl -sS -A "carreteras-mexico-map/1.0" -o osm_motorway_trunk.json --data-urlencode 'data=[out:json][timeout:900];area["ISO3166-1"="MX"][admin_level=2]->.mx;way["highway"~"^(motorway|trunk)$"](area.mx);out tags geom qt;' https://overpass-api.de/api/interpreter
curl -sS -A "carreteras-mexico-map/1.0" -o osm_sierra_chih.json --data-urlencode 'data=[out:json][timeout:300];way["highway"~"^(primary|secondary|tertiary)$"](27.3,-108.4,28.7,-106.6);out tags geom qt;' https://overpass-api.de/api/interpreter
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
| `herramientas/red.py` | Ciudades, tramos, planes 2.0/3.0, carriles mínimos, corredor central, ejes, puertos y fronteras |
| `herramientas/rutas.py` | Grafo OSM + Natural Earth y trazo A* de cada tramo |
| `herramientas/construir.py` | Proyección, carriles, flujos, grosor 1.0–4.0, conexiones de 4.0, 31 métricas, plan de obra y compilación |
| `herramientas/secciones/*.js` | Páginas completas: el manifiesto y la sección Ejecución (fórmula, pavimento, obra, equipo, negocio) |
| `docs/Proyecto_Pavimento_50_anios.md` | Documento fuente de la especificación, operación, organigrama y modelo de negocio |
| `herramientas/plantilla.html` | Interfaz: mapa SVG, panel, zoom, viajes, proyectos, plan de obra y analítica |
| `herramientas/cache/rutas.json` | Rutas ya trazadas, para compilar sin bajar los datos fuente |
| `wrangler.jsonc` · `.assetsignore` | Publicación en carreteras.capitaltorreon.com: sólo `index.html` |

## Fuentes y licencias

- **OpenStreetMap** © colaboradores de OpenStreetMap, bajo licencia [ODbL](https://www.openstreetmap.org/copyright). Los trazos incluidos en `index.html` y en `rutas.json` son datos derivados de OSM y se ofrecen bajo la misma licencia.
- **Natural Earth**, de dominio público: contornos estatales, países vecinos y la red secundaria.
- **SICT:** inventario de carriles de la red federal libre (dic. 2024), Anuario Estadístico 2024 y Programa Nacional de Infraestructura Carretera 2025–2030.
- **INEGI:** zonas metropolitanas del Censo 2020 y parámetros de proyección.

---
Ricardo López Reyero · 2026
