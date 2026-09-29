/* ── Costos de obra: precios, sueldos, flotilla y el cotizador — RLR · Ricardo López Reyero ──
   Una sola fuente para el Cotizador, la Plantilla y el Modelo de negocio. Pesos de 2026, sin IVA.
   Son referencias para dimensionar y negociar; la cotización formal se hace con precios del banco,
   de la acería y de la cementera del corredor. */

// precios unitarios de referencia (editables en el Cotizador)
const PRECIOS_BASE = {
  cemento: 3600,        // MXN/t · CPC 40 a granel, puesto en planta
  ceniza: 1300,         // MXN/t · ceniza volante clase F
  caliza: 330,          // MXN/t · agregado calizo triturado + arena, puesto en planta
  aditivos: 150,        // MXN/m³ · superfluidificante, inclusor de aire, reductor de contracción
  pomez: 90,            // MXN/m³ · curado interno con pómez presaturada
  frio: 70,             // MXN/m³ · hielo o agua enfriada, promedio del año
  acero: 22000,         // MXN/t · varilla corrugada puesta en obra
  interfaz: 2600,       // MXN/m³ · mezcla asfáltica de la interfaz
  subbase: 380,         // MXN/m³ · material granular drenante
  geotextil: 30,        // MXN/m²
  dren: 320,            // MXN/m · tubo perforado de 10 cm con filtro, salidas y registros
  subrasante: 40,       // MXN/m³ · agua y material de corrección de la subrasante
  diesel: 26,           // MXN/L
  camionDia: 6800,      // MXN/día · revolvedora subcontratada con chofer y diésel
  usd: 18.5,            // MXN por dólar
};
const PRECIO_ETQ = {
  cemento: ['Cemento', 't'], ceniza: ['Ceniza volante', 't'], caliza: ['Caliza y arena', 't'], aditivos: ['Aditivos', 'm³ de concreto'],
  pomez: ['Pómez presaturada', 'm³ de concreto'], frio: ['Enfriamiento', 'm³ de concreto'], acero: ['Acero de refuerzo', 't'],
  interfaz: ['Interfaz bituminosa', 'm³'], subbase: ['Subbase drenante', 'm³'], geotextil: ['Geotextil', 'm²'], dren: ['Dren de borde', 'm'],
  subrasante: ['Corrección de subrasante', 'm³'], diesel: ['Diésel', 'L'], camionDia: ['Revolvedora subcontratada', 'día'], usd: ['Tipo de cambio', 'MXN/USD'],
};

/* La plantilla con sueldo: [grupo, puesto, cantidad, sueldo mensual bruto aprox. 2026, variable meta (% del sueldo), turno].
   Sueldos arriba del mercado a propósito: el turno de noche ya lleva 20 % de prima. */
const PUESTOS = [
  ['Mando y staff', 'Superintendente de frente', 1, 95000, 25, 'día'],
  ['Mando y staff', 'Residente de colado', 1, 72000, 25, 'noche'],
  ['Mando y staff', 'Jefe de planta', 2, 48000, 20, 'uno por turno'],
  ['Mando y staff', 'Jefe de laboratorio', 1, 56000, 20, 'día'],
  ['Mando y staff', 'Laboratorista', 3, 23000, 15, 'rotando'],
  ['Mando y staff', 'Topógrafo · control 3D', 2, 34000, 15, 'día y noche'],
  ['Mando y staff', 'Despachador de camiones', 2, 32000, 20, 'uno por turno'],
  ['Mando y staff', 'Seguridad e higiene', 2, 30000, 15, 'día y noche'],
  ['Mando y staff', 'Almacén y refacciones', 1, 21000, 10, 'día'],
  ['Frente 1 · Terracería', 'Cabo de frente', 1, 27000, 15, 'día'],
  ['Frente 1 · Terracería', 'Operador de maquinaria', 6, 26000, 15, 'día'],
  ['Frente 1 · Terracería', 'Ayudante general', 6, 14000, 15, 'día'],
  ['Frente 1 · Terracería', 'Regador · control de humedad', 2, 14500, 15, 'día'],
  ['Frente 2 · Drenaje', 'Cabo de drenaje', 1, 26000, 15, 'día'],
  ['Frente 2 · Drenaje', 'Operador', 3, 25000, 15, 'día'],
  ['Frente 2 · Drenaje', 'Cuadrilla de tubo, geotextil y cabezales', 6, 14500, 15, 'día'],
  ['Frente 3 · Base', 'Cabo de base', 1, 26000, 15, 'día'],
  ['Frente 3 · Base', 'Operador de extendedora y rodillos', 4, 26000, 15, 'día'],
  ['Frente 3 · Base', 'Cuadrilla de apoyo y riego', 6, 14000, 15, 'día'],
  ['Frente 4 · Colado', 'Cabo de colado', 1, 34000, 20, 'noche'],
  ['Frente 4 · Colado', 'Operador de pavimentadora', 1, 45000, 20, 'noche'],
  ['Frente 4 · Colado', 'Ayudante de pavimentadora', 1, 19000, 20, 'noche'],
  ['Frente 4 · Colado', 'Operador de colocadora-esparcidora', 1, 36000, 20, 'noche'],
  ['Frente 4 · Colado', 'Operador de textura y curado', 1, 32000, 20, 'noche'],
  ['Frente 4 · Colado', 'Cuadrilla de acero (fierreros)', 10, 18500, 20, 'día, dos días adelante'],
  ['Frente 4 · Colado', 'Acabador', 6, 19000, 20, 'noche'],
  ['Frente 4 · Colado', 'Controlador de descarga', 2, 16000, 20, 'noche'],
  ['Frente 4 · Colado', 'Señalero · control de tránsito', 4, 15000, 20, 'noche'],
  ['Frente 4 · Colado', 'Operador de planta', 2, 25000, 20, 'noche'],
  ['Frente 4 · Colado', 'Laboratorista de turno', 2, 24000, 15, 'noche'],
  ['Frente 4 · Colado', 'Mecánico de turno', 1, 30000, 20, 'noche'],
  ['Frente 4 · Colado', 'Electricista · iluminación', 1, 24000, 20, 'noche'],
  ['Frente 4 · Colado', 'Apoyo general', 1, 15000, 20, 'noche'],
  ['Frente 5 · Acabado', 'Cabo de acabado', 1, 26000, 15, 'día'],
  ['Frente 5 · Acabado', 'Operador de corte y esmerilado', 2, 25000, 15, 'día'],
  ['Frente 5 · Acabado', 'Núcleos y mediciones', 2, 20000, 15, 'día'],
  ['Frente 5 · Acabado', 'Operador de perfilómetro', 1, 25000, 15, 'día'],
  ['Mantenimiento', 'Jefe de mantenimiento', 1, 40000, 20, 'madrugada'],
  ['Mantenimiento', 'Mecánico', 3, 28000, 20, 'madrugada'],
  ['Mantenimiento', 'Llantero-lubricador', 1, 17000, 20, 'madrugada'],
  ['Choferes propios', 'Chofer de revolvedora (12 camiones + 15 % de relevo)', 14, 22000, 20, 'noche'],
];
// estructura de proyecto: se comparte entre frentes
const ESTRUCTURA = [
  ['Director de Proyecto', 1, 230000, 30], ['Gerente de calidad', 1, 125000, 25], ['Gerente de logística', 1, 110000, 25],
  ['Ingeniero de datos', 1, 72000, 20], ['Responsable de liberaciones', 1, 82000, 25],
];
const COSTO_SOCIAL = 1.38;   // IMSS, INFONAVIT, SAR, impuesto sobre nómina, aguinaldo, prima vacacional y fondo de ahorro
const BIENESTAR_DIA = 420;   // MXN por persona y día: tres comidas calientes, campamento digno, transporte a casa y seguro médico
const FLOTA = {capitalUSD: 10.5, vida: 7, tasa: 0.12, mantenimiento: 0.07, seguro: 0.015, dieselDia: 2600, dieselCamion: 110, propios: 12, movilizacion: 8e6};
const DIAS_OBRA = 250;       // días de colado al año por frente (1 km de 2 carriles por noche)

const nominaMes = lista => lista.reduce((s, p) => s + (p.length > 4 ? p[2] * p[3] : p[1] * p[2]), 0);
const variableMes = lista => lista.reduce((s, p) => s + (p.length > 4 ? p[2] * p[3] * p[4] : p[1] * p[2] * p[3]) / 100, 0);
const personasFrente = PUESTOS.reduce((s, p) => s + p[2], 0);
// camiones que pide la distancia de la planta (la aritmética de Obra y flotilla), con 15 % de reserva
const camionesPara = d => { const t = [[5, 15], [10, 22], [15, 29], [25, 44]]; let n = t[t.length - 1][1];
  for (let i = 1; i < t.length; i++) if (d <= t[i][0]) { const [a, na] = t[i - 1], [b, nb] = t[i]; n = na + (nb - na) * Math.max(0, d - a) / (b - a); break; }
  return Math.ceil(n * 1.15); };
const mxn = x => Math.abs(x) >= 1e9 ? `$${(x / 1e9).toLocaleString('es-MX', {maximumFractionDigits: 2})} mil millones` : Math.abs(x) >= 1e6 ? `$${(x / 1e6).toLocaleString('es-MX', {maximumFractionDigits: 1})} millones` : `$${fmt(x)}`;

/* El cotizador: devuelve cantidades, partidas, precio y plazo de un corredor con el estándar de 50 años.
   o = {km, carriles, espesor (m), losa: 'crcp' | 'juntas', hombro (m por cuerpo), distancia (km), frentes, anticipo, utilidad, precios} */
const COTIZA_BASE = {km: 100, carriles: 4, espesor: 0.27, losa: 'crcp', hombro: 3.0, distancia: 10, frentes: 1, anticipo: 0.2, utilidad: 0.12};
function cotizar(o) {
  o = {...COTIZA_BASE, ...o}; const P = {...PRECIOS_BASE, ...(o.precios || {})};
  const kc = o.km * o.carriles, cuerpos = o.carriles / 2, e = o.losa === 'juntas' ? Math.max(0.30, o.espesor) : o.espesor;
  const anchoHombro = o.hombro * cuerpos / o.carriles;                    // m de acotamiento por km-carril
  const ancho = 4.2 + anchoHombro;                                        // ancho colado por km-carril
  const q = {};                                                           // cantidades del proyecto
  q.concreto = kc * ancho * e * 1000;
  q.base = kc * (ancho + 0.3) * 0.20 * 1000;
  q.interfaz = kc * (ancho + 0.15) * 0.05 * 1000;
  q.subbase = kc * (ancho + 0.7) * 0.20 * 1000;
  q.geotextil = kc * (ancho + 0.7) * 1000 * 1.3;
  q.dren = kc / 2 * 1000;                                                 // un dren de borde por cuerpo
  q.subrasante = kc * (ancho + 1.2) * 0.30 * 1000;
  const acero = o.losa === 'juntas'
    ? kc * (1000 / 4.5) * 14 * 0.45 * 6.31 / 1000 + kc * anchoHombro * 1.3 / 1000     // pasajuntas de 32 mm + amarres
    : kc * (4.2 * e * 0.0070 * 7850 + (1000 / 0.9) * 4.2 * 0.994 / 1000 + anchoHombro * 1.3);
  q.acero = acero;
  q.cemento = q.concreto * 0.335 * 0.78 + q.base * 0.135; q.ceniza = q.concreto * 0.335 * 0.22;
  q.caliza = q.concreto * 1.95 + q.base * 2.0;
  // plazo: un frente cuela 2 carriles por noche
  const diasColado = kc / 2 / o.frentes, anios = diasColado / DIAS_OBRA, frenteAnios = kc / 2 / DIAS_OBRA;
  const camiones = camionesPara(o.distancia), sub = Math.max(0, camiones - FLOTA.propios);
  q.diesel = (FLOTA.dieselDia + FLOTA.propios * FLOTA.dieselCamion) * DIAS_OBRA * frenteAnios;
  const concretoM3 = P.cemento * 0.335 * 0.78 + P.ceniza * 0.335 * 0.22 + P.caliza * 1.95 + P.aditivos + P.pomez + P.frio;
  const baseM3 = P.cemento * 0.135 + P.caliza * 2.0 + 40;
  const capital = FLOTA.capitalUSD * 1e6 * P.usd, fr = FLOTA.tasa / (1 - Math.pow(1 + FLOTA.tasa, -FLOTA.vida));
  const nominaAnio = (nominaMes(PUESTOS) + variableMes(PUESTOS)) * 12 * COSTO_SOCIAL;
  const estructuraAnio = (nominaMes(ESTRUCTURA) + variableMes(ESTRUCTURA)) * 12 * COSTO_SOCIAL;
  const personas = personasFrente * o.frentes + ESTRUCTURA.length;
  const partidas = [
    ['Concreto de la losa', q.concreto * concretoM3, `${fmt(q.concreto)} m³ a $${fmt(concretoM3)}`, 'mat'],
    ['Acero de refuerzo', q.acero * P.acero, `${fmt(q.acero)} t`, 'mat'],
    ['Base de concreto pobre', q.base * baseM3, `${fmt(q.base)} m³ a $${fmt(baseM3)}`, 'mat'],
    ['Interfaz bituminosa', q.interfaz * P.interfaz, `${fmt(q.interfaz)} m³`, 'mat'],
    ['Subbase, geotextil y dren', q.subbase * P.subbase + q.geotextil * P.geotextil + q.dren * P.dren, `${fmt(q.subbase)} m³ · ${fmt(q.geotextil)} m² · ${fmt(q.dren)} m`, 'mat'],
    ['Subrasante', q.subrasante * P.subrasante, `${fmt(q.subrasante)} m³`, 'mat'],
    ['Mano de obra (con variable)', nominaAnio * frenteAnios, `${personasFrente} personas por frente · costo social ×${COSTO_SOCIAL}`, 'gente'],
    ['Bienestar de la gente', personasFrente * BIENESTAR_DIA * 300 * frenteAnios, `$${BIENESTAR_DIA} por persona al día`, 'gente'],
    ['Flotilla: capital, mantenimiento y seguro', capital * (fr + FLOTA.mantenimiento + FLOTA.seguro) * frenteAnios, `USD ${FLOTA.capitalUSD} M por frente, ${FLOTA.vida} años al ${FLOTA.tasa * 100} %`, 'eq'],
    ['Diésel', q.diesel * P.diesel, `${fmt(q.diesel)} L`, 'eq'],
    ['Revolvedoras subcontratadas', sub * P.camionDia * DIAS_OBRA * frenteAnios, `${camiones} camiones a ${o.distancia} km: ${FLOTA.propios} propios y ${sub} subcontratados`, 'eq'],
    ['Movilización de frentes', FLOTA.movilizacion * o.frentes, `planta, campamento y traslado por frente`, 'eq'],
    ['Estructura de proyecto', estructuraAnio * (anios + 0.5), `${ESTRUCTURA.length} personas durante la obra y el arranque`, 'gente'],
  ];
  const directo = partidas.reduce((s, p) => s + p[1], 0);
  const lab = directo * 0.02, ofi = directo * 0.06, fianzas = directo * 0.025;
  const finan = directo * (1 - o.anticipo) * 0.13 * (90 / 365);             // 120 días de cobro menos 30 de crédito de proveedores
  const costo = directo + lab + ofi + fianzas + finan;
  const utilidad = costo * o.utilidad, precio = costo + utilidad;
  partidas.push(['Laboratorio y control de calidad', lab, '2 % del costo directo', 'ind'], ['Oficina central e indirectos', ofi, '6 %', 'ind'],
    ['Fianzas y seguros de obra', fianzas, '2.5 %', 'ind'], ['Financiamiento del capital de trabajo', finan, `cobro a 120 días, anticipo de ${Math.round(o.anticipo * 100)} %`, 'ind'],
    ['Utilidad', utilidad, `${Math.round(o.utilidad * 100)} % sobre el costo`, 'util']);
  const m2 = kc * ancho * 1000;
  // conservación por disponibilidad: esmerilado, parches, drenes, señalización y tablero, a 30 años
  const conservacionAnio = kc * (4.2 * 1000 * 150 / 30 + 4.2 * 1000 * 0.02 * 3500 * 2 / 30 + 25000 + 3000);
  // capital de trabajo: 2.5 meses de costo sin cobrar (estimación, revisión y pago a 120 días, menos 60 de crédito de
  // proveedores), menos la mitad del anticipo, que se amortiza a lo largo de la obra
  const capitalTrabajo = costo / Math.max(anios * 12, 3) * 2.5 - precio * o.anticipo * 0.5;
  return {o, P, q, kc, m2, e, partidas, directo, costo, utilidad, precio, iva: precio * 0.16, piso: costo,
    porKm: precio / o.km, porKc: precio / kc, porM2: precio / m2, diasColado, anios, camiones, personas,
    conservacionAnio, anualidad: conservacionAnio / 0.7, capitalTrabajo: Math.max(0, capitalTrabajo),
    materiales: partidas.filter(p => p[3] === 'mat').reduce((s, p) => s + p[1], 0)};
}
