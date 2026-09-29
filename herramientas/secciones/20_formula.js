/* ── Ejecución · La fórmula: el resumen que conecta el pavimento de 50 años con la red — RLR ── */

// La unidad de obra, con los números del documento "Pavimento para 50 años"
const OBRA = {
  anchoCarril: 4.20, espesor: 0.27,                 // carril colado de 4.20 m (raya a 3.60 m) × losa CRCP de 27 cm
  losaKmCarril: 4.20 * 0.27 * 1000,                 // 1,134 m³ de losa por km-carril
  baseKmCarril: 4.20 * 0.20 * 1000,                 // 840 m³ de concreto pobre (20 cm) por km-carril
  cementanteLosa: 0.335, cementoBase: 0.135,        // t/m³: 320–350 kg en la losa, 120–150 kg en la base
  aceroKmCarril: 67,                                // t por km-carril: #6 cada 15 cm (0.70 %) + #4 cada 90 cm, sin traslapes
  kmCarrilFrenteAnio: 500,                          // 1 km/día de 2 carriles × 250 días
  personasFrente: 115, estructuraProyecto: 5,       // plantilla de un frente + estructura de proyecto compartida
  flotillaUSD: [7.8, 13.3],                         // millones de USD por flotilla (orden de magnitud)
};
const obraDe = kc => {
  const frenteAnios = kc / OBRA.kmCarrilFrenteAnio;
  return {
    kc, losa: kc * OBRA.losaKmCarril, base: kc * OBRA.baseKmCarril,
    cementante: kc * (OBRA.losaKmCarril * OBRA.cementanteLosa + OBRA.baseKmCarril * OBRA.cementoBase),
    acero: kc * OBRA.aceroKmCarril, frenteAnios,
  };
};
const mill = (x, d = 1) => (x / 1e6).toLocaleString('es-MX', {maximumFractionDigits: d, minimumFractionDigits: d});

PAGINAS.formula = () => {
  const vs = [2, 3, 4], O = vs.map(v => obraDe(M[v].kcn));
  const fila = (n, f) => [n, ...vs.map((v, k) => f(O[k], v))];
  const clsV = ['', ...vs.map(v => 'num' + (v === V ? ' col-act' : ''))];
  const plTotal = PL.reduce((s, p) => s + p.kc, 0), ccTotal = PL[PL.length - 1].cc;
  const ritmos = [[110, 'Ritmo actual'], [220, 'El doble'], [330, '1 % del PIB']];
  const filaRitmo = ([r, n]) => {
    const anios = ccTotal / r, kca = plTotal / anios, fr = kca / OBRA.kmCarrilFrenteAnio;
    return [`$${fmt(r)} mil millones · ${n}`, `${Math.round(anios)} años · ${Math.round(2027 + anios)}`, fmt(kca), fr.toFixed(1), fmt(fr * OBRA.personasFrente),
      `${fmt(fr * OBRA.flotillaUSD[0])}–${fmt(fr * OBRA.flotillaUSD[1])}`];
  };
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('Construir <em>una vez</em>, a máxima velocidad, con la calidad escrita, medida y penalizada.',
      'Esta es la fórmula de cómo se construye la red del mapa. Sale del documento <b>Pavimento para 50 años</b> (especificación, operación, organigrama y modelo de negocio) y se conecta aquí con lo que pide cada versión y el plan de obra. Las cuatro páginas siguientes tienen el detalle, cada requisito con su porqué.')}
    ${indiceDoc([['f-unidad', 'La unidad de obra'], ['f-red', 'Lo que pide la red'], ['f-plan', 'Lo que pide el plan'], ['f-receta', 'La receta'], ['f-reglas', 'Reglas'], ['f-ruta', 'Ruta de ejecución'], ['f-frases', 'Siete frases'], ['f-precisiones', 'Precisiones'], ['f-detalle', 'El detalle']])}

    ${h2Doc('f-unidad', 'La unidad de obra', 'Un frente: 1 kilómetro por noche')}
    <div class="formula">
      <div class="f"><b>1 planta</b><span>250–280 m³/h, a menos de 10 km del colado</span></div><div class="op">+</div>
      <div class="f"><b>1 tren</b><span>4 máquinas en serie que nunca se detienen</span></div><div class="op">+</div>
      <div class="f"><b>≈ 115</b><span>personas en tres turnos: de día se prepara, de noche se cuela</span></div><div class="op">+</div>
      <div class="f"><b>15–29</b><span>revolvedoras de 8 m³: una llega cada 2 minutos</span></div><div class="op">=</div>
      <div class="f res"><b>1 km/día</b><span>de sección de 2 carriles · 250 km al año</span></div>
    </div>
    <div class="formula">
      <div class="f"><b>8.40 m</b><span>dos carriles colados de 4.20 m (la raya va a 3.60 m)</span></div><div class="op">×</div>
      <div class="f"><b>27 cm</b><span>losa de concreto reforzado continuo, sin juntas</span></div><div class="op">=</div>
      <div class="f"><b>2,270 m³</b><span>de concreto por kilómetro</span></div><div class="op">→</div>
      <div class="f res"><b>227 m³/h</b><span>sostenidos durante 10 horas de colado nocturno</span></div>
    </div>
    <p class="nota">Capital de una flotilla completa: <b>USD 7.8–13.3 millones</b> (orden de magnitud, no cotización). Una autopista de 4 carriles son dos pasadas del frente, una por cuerpo: por eso la obra se mide en <b>km-carril</b>, y un frente cuela <b>500 km-carril al año</b>.</p>

    ${h2Doc('f-red', 'Conectado con el mapa', 'Lo que cada versión le pide a la obra')}
    <p>Todo lo que se construye nuevo en la red — carriles agregados y trazos nuevos — se hace con el estándar de 50 años. La columna resaltada es la versión elegida arriba.</p>
    ${tablaDoc(['Desde hoy hasta…', '2.0', '3.0', '4.0'], [
      fila('Km-carril nuevos', o => fmt(o.kc)),
      fila('Concreto de losa', o => `${mill(o.losa)} M m³`),
      fila('Concreto pobre de base', o => `${mill(o.base)} M m³`),
      fila('Cementante', o => `${mill(o.cementante)} M t`),
      fila('Acero de refuerzo', o => `${mill(o.acero, 2)} M t`),
      fila('Trabajo de obra', o => `${fmt(o.frenteAnios)} frentes-año`),
      fila('Frentes para terminar en 10 años', o => `${Math.ceil(o.frenteAnios / 10)} frentes`),
      fila('Personas en obra (a 115 por frente)', o => fmt(Math.ceil(o.frenteAnios / 10) * OBRA.personasFrente)),
      fila('Carriles actuales de los corredores ampliados', (o, v) => M[v].kce ? `${fmt(M[v].kce)} km-carril` : '— (todo es trazo nuevo)'),
    ], clsV)}
    <p class="nota"><b>Cómo se calcula.</b> 1 km-carril = 4.20 m × 0.27 m × 1,000 m = <b>1,134 m³ de losa</b> y 840 m³ de base; cementante de 335 kg/m³ en la losa y 135 kg/m³ en la base (≈ 493 t por km-carril); acero longitudinal al 0.70 % más transversal del #4 cada 90 cm (≈ 67 t por km-carril, sin traslapes). El último renglón es lo que habría que reconstruir si además se lleva al estándar la parte que ya existe de los corredores que se amplían.</p>

    ${h2Doc('f-plan', 'Conectado con el plan de obra', 'Cuántos frentes exige el plan, según el ritmo de inversión')}
    <p>El plan de obra construye <b>${fmt(plTotal)} km-carril</b> con $${fmt(ccTotal)} mil millones. El ritmo de inversión decide cuántos frentes tienen que trabajar al mismo tiempo:</p>
    ${tablaDoc(['Inversión al año', 'Termina en', 'Km-carril al año', 'Frentes simultáneos', 'Personas en obra', 'Flotillas (M USD)'], ritmos.map(filaRitmo), ['', 'num', 'num', 'num', 'num', 'num'])}
    <p class="nota">Un frente sostiene hasta 250 km al año en cualquier corredor largo. <b>Cuando hace falta más velocidad no se acelera el frente: se clona</b>, y el segundo arranca desde el otro extremo del corredor. Personas en obra sin contar la estructura de proyecto (5 por proyecto, compartida entre frentes).</p>

    ${h2Doc('f-receta', 'La especificación en una mirada', 'La receta en doce renglones')}
    <ol>
      <li>Subrasante uniforme al 95 % Proctor modificado, con sulfatos medidos antes de estabilizar.</li>
      <li>Subbase drenante de 15 cm + dren de borde inspeccionable con salidas cada 60–100 m.</li>
      <li>Concreto pobre de 20 cm + interfaz bituminosa de 5 cm que deja deslizar la losa.</li>
      <li>Losa CRCP de 27 cm, sin juntas: acero #6 cada 15 cm (0.70 %), transversal #4 cada 90 cm.</li>
      <li>Anclaje terminal en los extremos y en todos los accesos.</li>
      <li>Caliza triturada no reactiva, granulometría combinada optimizada.</li>
      <li>Cementante de 320–350 kg/m³ con 20–25 % de ceniza volante clase F.</li>
      <li>Agua/cementante ≤ 0.42, aire 5–7 %, revenimiento 3–5 cm, <b>cero agua añadida en obra</b>.</li>
      <li>Curado interno con pómez presaturada (20–25 % de la arena) + reductor de contracción.</li>
      <li>MR 48 kg/cm² a 28 días; permeabilidad menor a 1,500 coulombs.</li>
      <li>Carril colado a 4.20 m con raya a 3.60 m y hombro de concreto amarrado.</li>
      <li>Colado nocturno, curado a doble dosis inmediato y aceptación por núcleos con penalización.</li>
    </ol>

    ${h2Doc('f-reglas', 'Lo que no se negocia', 'Cinco reglas, una por frente del problema')}
    <div class="dcards">
      ${tarjeta('<i>Obra</i>Colar de noche, cero agua, curar de inmediato', 'El concreto entra a 30 °C o menos; si llega duro se rechaza o se corrige con aditivo, nunca con agua; la evaporación se mantiene bajo 0.5 kg/m² por hora.', 'Las tres cosas que más vida deciden no cuestan dinero.')}
      ${tarjeta('<i>Suelo y agua</i>Drenaje y uniformidad son intocables', 'Dren de borde inspeccionable y suelo parejo punto por punto, en todo el trazo, pase lo que pase con el presupuesto.', 'Sin esto, todo lo demás es decoración.')}
      ${tarjeta('<i>Organización</i>Calidad y Seguridad jamás reportan a Producción', 'Calidad detiene sin pedir permiso; sólo el Director reanuda, por escrito.', 'Así el rechazo de un camión a las 3 de la mañana se sostiene solo.')}
      ${tarjeta('<i>Operación</i>La pavimentadora nunca se detiene', 'Planta a menos de 10 km, un camión cada 2 minutos y siempre 20 km liberados por delante.', 'Una hora de paro cuesta el 10 % de la producción del día.')}
      ${tarjeta('<i>Negocio</i>Ni una máquina antes del contrato', 'Se compra lo que define la calidad, se renta lo esporádico. Hay un piso de precio debajo del cual no se firma.', 'Excepción deliberada: el laboratorio y el tramo de prueba, que son los que ganan el contrato.')}
    </div>

    ${h2Doc('f-ruta', 'Del papel al primer kilómetro', 'La ruta de ejecución')}
    <h3>El primer año, una sola vez</h3>
    ${ganttDoc([
      ['Publicar el estándar', 'dependencias y colegios', [[0, 2, 'meses 1–2']]],
      ['Laboratorio y equipo técnico', 'ya vende supervisión', [[1, 4, 'meses 2–4']]],
      ['Asegurar bancos de caliza', 'reservas con contrato', [[2, 5, 'meses 3–5']]],
      ['Tramo de prueba de 500 m', 'tres variantes instrumentadas', [[4, 7, 'meses 5–7', 'var(--amber)']]],
      ['Negociar obra y conservación', 'en un solo paquete', [[5, 8, 'meses 6–8']]],
      ['Flotilla, operadores y planta', 'ya contra contrato', [[7, 10, 'meses 8–10']]],
      ['Movilización y arranque', 'a ritmo parcial', [[9, 12, 'meses 10–12', '#9fc0ff']]],
    ], [0, 12], [0, 2, 4, 6, 8, 10, 12], x => `mes ${x}`)}
    <h3>Cada frente nuevo: 16 semanas del contrato al kilómetro por noche</h3>
    ${ganttDoc([
      ['Bancos, mezcla, contrataciones', 'y pedido de equipo', [[0, 4, 'sem. 1–4']]],
      ['Planta, campamento, 20 km', 'liberados por delante', [[4, 8, 'sem. 5–8']]],
      ['Tramo de prueba', 'se cuela, instrumenta y mide', [[8, 10, 'sem. 9–10', 'var(--amber)']]],
      ['Ajustes de mezcla y proceso', '', [[10, 12, 'sem. 11–12']]],
      ['Arranque a ritmo parcial', '400–600 m por noche', [[12, 13, '13', '#9fc0ff']]],
      ['Ritmo pleno', '1,000 m por noche', [[13, 16, 'sem. 14–16', '#9fc0ff']]],
    ], [0, 16], [0, 4, 8, 12, 16], x => `sem. ${x}`)}

    ${h2Doc('f-frases', 'Para cualquier junta', 'Las siete frases que cierran la discusión')}
    ${citaDoc('No estamos decidiendo cómo pavimentar. Estamos decidiendo cuántas veces.')}
    ${citaDoc('Las carreteras no se mueren de peso. Se mueren de agua, suelo desigual, contracción, sol y óxido.')}
    ${citaDoc('Más cemento no es más duradero. Es más caro, más agrietado y más fuerte sólo en la probeta.')}
    ${citaDoc('Una losa de 24 cm bien drenada le gana a una de 30 cm mal drenada. Y cuesta menos.')}
    ${citaDoc('Las tres reglas que más vida deciden — colar de noche, no echar agua, curar a tiempo — no cuestan dinero.')}
    ${citaDoc('Los errores de un pavimento no se ven cuando se cometen. Se ven ocho años después, cuando ya no hay reparación posible.')}
    ${citaDoc('El costo de equivocarse no lo paga quien se equivoca. Por eso la calidad va escrita, medida y penalizada.')}

    ${h2Doc('f-precisiones', 'Lo que se afinó al acomodarlo', 'Seis precisiones para que no queden dudas')}
    <ol class="precisiones">
      <li><b>La plantilla suma 15 de mando, no 14.</b> La tabla de mando y staff lista 15 puestos. Con eso un frente tiene <b>96 puestos fijos</b> más 17 a 33 choferes (15–29 según la distancia de la planta, más 15 % de relevo): de 113 a 129 personas. Las «≈ 115» corresponden a una planta a 5–10 km del colado.</li>
      <li><b>La estructura de proyecto va aparte.</b> Director de Proyecto, Gerente de calidad, Gerente de logística, Ingeniero de datos y Responsable de liberaciones no están en los 115: son 5 personas por proyecto, compartidas si hay varios frentes.</li>
      <li><b>El tramo de prueba se lee en dos tiempos.</b> En semanas calibra la mezcla y el proceso para arrancar; al año, con un verano y un invierno completos, decide qué variante se escala: con curado interno, sin él o con capa inferior de RCC. En el primer corredor, el tramo de los meses 5–7 es el mismo que pide la movilización.</li>
      <li><b>Tres configuraciones de losa, una sola decisión.</b> Por omisión, <b>CRCP de 27 cm</b>. Si el contratista no tiene experiencia real en CRCP, losa con juntas de 30 cm y pasajuntas. La capa inferior de RCC (22 + 5 cm) sólo si gana en el tramo de prueba. El equipo del frente 3 coloca la base de concreto pobre y, si se elige, esa capa de RCC.</li>
      <li><b>Llevado a toda la red, dos cosas se ajustan por región.</b> El espesor, por el tránsito pesado de cada corredor (23–30 cm), y el aire incluido, que se exige donde hiela. Drenaje, uniformidad del suelo, agua/cemento y curado no se ajustan nunca. Detalle en <a href="#pavimento" data-ir="pavimento">Pavimento → Por región</a>.</li>
      <li><b>La obra se mide en km-carril.</b> Un frente cuela 2 carriles por noche: una autopista de 4 carriles son dos pasadas y una de 8, cuatro. Así se conectan la especificación y la red.</li>
    </ol>

    ${h2Doc('f-detalle', 'El detalle', 'Las cuatro piezas completas')}
    <div class="dcards">
      <div class="dcard clic" data-ir="pavimento"><h4><i>1</i>Pavimento para 50 años</h4><div class="porque">Cómo se muere una carretera, la receta capa por capa, la mezcla, las 8 mejoras, lo que no se usa, las reglas de obra, el orden para recortar y cómo se garantiza.</div></div>
      <div class="dcard clic" data-ir="obra"><h4><i>2</i>Obra y flotilla</h4><div class="porque">La aritmética de los 227 m³/h, la planta y el acarreo, el tren de colado, la flotilla por frente, el día de 24 horas, el tablero y la movilización.</div></div>
      <div class="dcard clic" data-ir="equipo"><h4><i>3</i>Plantilla y organigrama</h4><div class="porque">Las 115 personas de un frente, las cuatro líneas de mando, los seis perfiles que deciden el resultado y las reglas de autoridad.</div></div>
      <div class="dcard clic" data-ir="negocio"><h4><i>4</i>Modelo de negocio</h4><div class="porque">Disponibilidad en lugar de obra, las cinco fuentes de ingreso, la inversión, el punto de equilibrio, los riesgos y los primeros 12 meses.</div></div>
    </div>
  </div>`;
};
