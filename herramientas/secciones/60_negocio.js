/* ── Ejecución · Modelo de negocio: disponibilidad con una obra al principio — RLR ── */
PAGINAS.negocio = () => {
  const EQUILIBRIO = [[250, 1.0], [180, 1.4], [120, 2.1], [90, 2.8], [60, 4.2], [40, 6.3]];
  const colEq = km => km >= 150 ? 'var(--green)' : km >= 60 ? 'var(--amber)' : '#ff9b8a';
  // números con el cotizador: un frente-año (125 km de 4 carriles) y un corredor de referencia de 100 km
  const F = cotizar({km: 125}), B = cotizar({}), P0 = PRECIOS_BASE;
  // cada palanca: [nombre, ahorro en el corredor de referencia, quién la jala]; la de planta y la de anticipo se miden contra su propio punto de partida
  const ahorro = (antes, despues) => cotizar(antes).precio - cotizar(despues).precio;
  const PALANCAS = [
    ['Acero directo de la acería (−8 %)', ahorro({}, {precios: {...P0, acero: P0.acero * 0.92}}), 'Compras'],
    ['Cemento y ceniza con contrato anual (−10 %)', ahorro({}, {precios: {...P0, cemento: P0.cemento * 0.9, ceniza: P0.ceniza * 0.9}}), 'Compras'],
    ['Banco de caliza propio (−25 % en agregado)', ahorro({}, {precios: {...P0, caliza: P0.caliza * 0.75}}), 'Dirección, antes de licitar'],
    ['Espesor de 25 cm donde el tránsito lo permite', ahorro({}, {espesor: 0.25}), 'Ingeniería y laboratorio'],
    ['Anticipo de 30 % en lugar de nada', ahorro({anticipo: 0}, {anticipo: 0.3}), 'Comercial'],
    ['Planta a 5 km del colado en lugar de 15', ahorro({distancia: 15}, {distancia: 5}), 'Logística'],
  ].sort((x, y) => y[1] - x[1]);
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('Esto no es un negocio de construcción. Es un negocio de <em>disponibilidad</em> con una obra al principio.',
      'Se deja de vender obra entregada y se empieza a vender kilómetro disponible al estándar comprometido: el cliente paga una anualidad durante 15, 20 o 30 años a cambio de que cada kilómetro cumpla umbrales medibles — suavidad, ausencia de grietas, señalización, drenaje funcionando. Si no cumple, se descuenta.')}
    ${indiceDoc([['n-tesis', 'La tesis'], ['n-numeros', 'Un frente por dentro'], ['n-eficiencia', 'Palancas'], ['n-precio', 'El precio'], ['n-tres', 'Tres negocios'], ['n-ingresos', 'Cinco ingresos'], ['n-inversion', 'La inversión'], ['n-capital', 'El dinero'], ['n-equilibrio', 'Punto de equilibrio'], ['n-conservacion', 'Conservación'], ['n-ventaja', 'Ventaja'], ['n-riesgos', 'Riesgos'], ['n-angulos', 'Todos los ángulos'], ['n-doce', 'Primeros 12 meses']])}

    ${h2Doc('n-tesis', 'Por qué el negocio normal es malo', 'La tesis')}
    <p>El negocio carretero tradicional en México licita una obra, la construye, la cobra, la entrega y vuelve a licitar desde cero. Eso produce <b>ingresos irregulares</b> (picos y valles, con flotilla y nómina que no se pueden apagar entre obras), <b>márgenes de 8 a 15 %</b> (porque se compite contra quien construye peor y cobra menos), <b>cero acumulación</b> (el conocimiento de la obra terminada no sirve para ganar la siguiente) e <b>incentivos invertidos</b>: quien construye mal gana más ese año, y quien reconstruye en el año 12 cobra otra vez.</p>
    ${citaDoc('En el modelo tradicional, la mala calidad es un modelo de negocio.', true)}
    <div class="comparar">
      <div class="antes"><h4>En el modelo tradicional</h4><p>La calidad es un costo que reduce el margen.</p><p>El ingreso termina cuando se entrega.</p><p>Se compite por precio de obra.</p><p>Los datos del pavimento no valen nada.</p></div>
      <div class="despues"><h4>En el modelo de disponibilidad</h4><p>La calidad es el margen: cada año sin intervenir es utilidad.</p><p>El ingreso corre 30 años.</p><p>Se compite por costo de ciclo de vida, donde esta especificación gana.</p><p>Los datos permiten intervenir barato y a tiempo.</p></div>
    </div>
    <p>La especificación de 50 años deja de ser un gasto extra y se vuelve <b>el activo que genera la utilidad</b>: un pavimento que no hay que tocar durante 25 años, cobrando una anualidad durante esos 25 años, es el mejor negocio de infraestructura que existe.</p>
    ${citaDoc('No le estamos vendiendo una carretera más cara. Le estamos vendiendo no tener que volver a construirla, y estamos dispuestos a firmarlo por 30 años.')}

    ${h2Doc('n-numeros', 'Con los números del cotizador', 'Un frente por dentro, en un año')}
    <p>Un frente cuela 500 km-carril al año: por ejemplo, 125 km de autopista de 4 carriles. Con los precios de referencia del <a href="#cotizador" data-ir="cotizador">Cotizador</a>:</p>
    <div class="metas">
      <div class="meta"><b>${mxn(F.precio)}</b><span>se factura en el año</span><em>${mxn(F.porKm)} por km de 4 carriles, sin IVA</em></div>
      <div class="meta"><b>${mxn(F.utilidad)}</b><span>de utilidad de ejecución</span><em>${Math.round(F.o.utilidad * 100)} % sobre el costo completo</em></div>
      <div class="meta"><b>${pct(F.materiales / F.precio)}</b><span>del precio son materiales</span><em>Concreto, acero, base, interfaz, subbase y dren. Quien compra bien, gana.</em></div>
      <div class="meta"><b>${mxn(FLOTA.capitalUSD * 1e6 * PRECIOS_BASE.usd)}</b><span>cuesta la flotilla</span><em>Se paga con ${Math.max(1, Math.round(FLOTA.capitalUSD * 1e6 * PRECIOS_BASE.usd / (F.utilidad / 12)))} meses de utilidad de un frente ocupado</em></div>
      <div class="meta"><b>${mxn(F.capitalTrabajo)}</b><span>de capital de trabajo</span><em>Dos meses y medio de costo antes de cobrar, menos el anticipo que aún no se amortiza. Es el límite real</em></div>
      <div class="meta"><b>${mxn(F.anualidad)}</b><span>de conservación al año</span><em>Durante 30 años, por lo construido en ese solo año de obra</em></div>
    </div>
    ${citaDoc('La conclusión que cambia la estrategia: el cuello de botella no es la flotilla, es el capital de trabajo. La obra es un negocio de comprar bien y cobrar a tiempo; la conservación es el de quedarse 30 años.')}

    ${h2Doc('n-eficiencia', 'Dónde se gana o se pierde el margen', 'Las palancas de eficiencia, medidas')}
    <p>Cada renglón sale del cotizador: lo que ahorra en un corredor de 100 km de 4 carriles contra el caso base (${mxn(B.precio)}). Están ordenadas de mayor a menor.</p>
    ${tablaDoc(['Palanca', 'Ahorro en 100 km', 'Del precio', 'Quién la jala'], PALANCAS.map(([n, a, q]) => [n, mxn(a), pct(a / B.precio), q]), ['', 'num', 'num', ''])}
    <p class="nota">Utilizar bien la flotilla también pesa, aunque en este precio se vea chico: con 150 km al año en lugar de 250, el costo fijo de gente y equipo por kilómetro sube ${pct(250 / 150 - 1)} (ver el punto de equilibrio más abajo). Donde más se nota es en la utilidad: el margen que no se gana en compras se pierde en fierro parado.</p>
    <div class="dcards">
      ${tarjeta('<i>1</i>Comprar es la mitad del negocio', 'Contratos anuales de cemento y ceniza con precio indexado, acero directo de la acería por volumen y banco de caliza propio o con reservas contratadas antes de la licitación.', 'Los materiales son casi todo el precio: un punto en compras vale más que diez en la obra.')}
      ${tarjeta('<i>2</i>La planta cerca, siempre', 'La planta salta cada 15–20 km para estar a menos de 10 km del colado. Menos camiones, menos diésel y concreto más fresco.')}
      ${tarjeta('<i>3</i>Diseñar para el tránsito real', 'El espesor se ajusta con el tránsito pesado de cada corredor (23–30 cm) y la mezcla con el laboratorio. Lo que nunca se ajusta: drenaje, suelo parejo, agua/cemento y curado.')}
      ${tarjeta('<i>4</i>Cobrar bien es parte de construir bien', 'Anticipo negociado, estimaciones quincenales y crédito de proveedores a 60 días. Cada punto de anticipo baja el financiamiento del precio.')}
    </div>

    ${h2Doc('n-precio', 'Decidido en frío, antes de licitar', 'Cómo se cotiza y el piso de precio')}
    <ol>
      <li><b>Se cotiza por km-carril</b> con el estándar completo, de la subrasante a la losa, y con las cantidades de la especificación: nada escondido.</li>
      <li><b>El precio se indexa</b> a cemento, acero y diésel, con cláusula de escalación en obra y en la anualidad.</li>
      <li><b>El piso es el costo completo sin utilidad.</b> Debajo no se firma aunque se pierda el contrato: un pavimento al 70 % de la especificación no aguanta la garantía y se pierden la obra y la conservación a la vez.</li>
      <li><b>Obra y conservación van en el mismo paquete.</b> La anualidad de 30 años es donde está el margen alto; sin ella, esto vuelve a ser construcción tradicional.</li>
      <li><b>Se ofrece el ciclo de vida, no el metro cuadrado:</b> una vez contra tres o cuatro reconstrucciones en 50 años, con el camino abierto.</li>
    </ol>
    <div class="dcard clic" data-ir="cotizador" style="max-width:520px;margin-top:12px"><h4><i>→</i>Abrir el cotizador</h4><div class="porque">Precio, piso, plazo, materiales, capital de trabajo y anualidad de conservación de cualquier tramo, o de cualquier obra del plan.</div></div>


    ${h2Doc('n-tres', 'Apilados, no uno solo', 'Los tres negocios que viven adentro')}
    <div class="dcards">
      ${tarjeta('<i>1</i>Materiales', 'La planta produce concreto y, mientras está montada, vende a terceros de la región.', 'Margen medio. Arranca desde el mes uno.')}
      ${tarjeta('<i>2</i>Ejecución', 'Construir kilómetros con la flotilla.', 'Margen bajo, capital alto. Es el precio de entrada, no el premio.')}
      ${tarjeta('<i>3</i>Disponibilidad', 'La anualidad de conservación.', 'Margen alto y recurrente, y cada año vale más porque el pavimento se porta mejor de lo que el contrato asumió.')}
    </div>
    <p>La mayoría de las constructoras sólo juegan el segundo. <b>El dinero de largo plazo está en el tercero, y sólo lo puede cobrar quien construyó bien el primero.</b></p>

    ${h2Doc('n-ingresos', 'Los mismos activos, cinco ingresos', 'Las cinco fuentes de ingreso')}
    ${tablaDoc(['Fuente', 'Qué se vende', 'Margen típico', 'Recurrencia', 'Quién más puede hacerlo'], [
      ['1 · Ejecución de obra', 'Kilómetros construidos', '8–15 %', 'Por contrato', 'Cualquier constructora grande'],
      ['2 · Materiales y planta', 'Concreto y RCC, a la obra y a terceros de la región', '20–30 %', 'Continua mientras la planta esté montada', 'Concreteras locales'],
      ['3 · Conservación por disponibilidad', 'Kilómetro que cumple el estándar, cada año', '25–40 %', '15 a 30 años', 'Sólo quien lo construyó bien'],
      ['4 · Prefabricados', 'Paneles, canastillas, piezas de reparación', '20–35 %', 'Continua, a toda la región', 'Requiere planta e ingeniería propias'],
      ['5 · Ingeniería, datos y estándar', 'Diseño, supervisión, tablero de activos', '40–60 %', 'Recurrente y de bajo capital', 'Casi nadie'],
    ], ['', '', 'num', '', ''])}
    <p class="nota">Márgenes de referencia de la industria, para ordenar la discusión; los números de cada caso se construyen con cotizaciones reales.</p>
    <h3>Cómo se refuerzan entre sí</h3>
    <ul>
      <li><b>La planta paga sus tiempos muertos vendiendo a terceros:</b> un costo fijo se vuelve centro de utilidad.</li>
      <li><b>La ejecución compra el derecho a la conservación:</b> nadie firma una anualidad de 30 años sobre un pavimento que construyó otro.</li>
      <li><b>Los prefabricados salen del mismo diseño de mezcla y de la misma gente:</b> la curva de aprendizaje ya está pagada.</li>
      <li><b>Los datos hacen barata la conservación:</b> si se sabe cuáles 300 metros necesitan atención, se interviene con una cuadrilla y no con un programa.</li>
      <li><b>Y el estándar hace que te vuelvan a llamar:</b> quien escribe la especificación de referencia de una región compite en una cancha que él mismo dibujó.</li>
    </ul>
    <h3>La fuente 5 merece atención aparte</h3>
    <p>Es la más pequeña en pesos y la más valiosa estratégicamente: no requiere capital y no se copia rápido.</p>
    <div class="dcards">
      ${tarjeta('El estándar técnico', 'La especificación de 50 años vuelta referencia para dependencias y municipios de la región.')}
      ${tarjeta('Supervisión y laboratorio', 'Vendidos como servicio a obras que no son tuyas: pagan solos a un equipo que de otro modo sería puro costo.')}
      ${tarjeta('El tablero del activo', 'La telemetría del pavimento como servicio: el dueño ve en vivo cada kilómetro.', 'Ingreso recurrente, costo marginal casi cero y una relación que dura todo el ciclo de vida. Es la pieza que convierte una constructora en una empresa con ingreso recurrente, y la que menos cuesta empezar.')}
    </div>

    ${h2Doc('n-inversion', 'La frontera que decide la rentabilidad', 'La inversión')}
    ${citaDoc('Se compra lo que define la calidad y se usa todo el año. Se renta lo intensivo pero esporádico. Se subcontrata lo que es capacidad pura, sin criterio técnico.')}
    <p>Comprar de más convierte el negocio en un arrendador de fierro con mala utilización. Comprar de menos entrega la calidad — y con ella la conservación de 30 años — a un tercero que no responde por ella.</p>
    <h3>El capital de una flotilla de 1 km/día</h3>
    ${tablaDoc(['Bloque', 'Qué incluye', 'Millones de USD'], [
      ['Planta y almacenamiento', 'Planta móvil 250–280 m³/h, silos de cemento y ceniza', '1.5 – 3.0'],
      ['El tren de colado', 'Pavimentadora de gran formato con insertadora, colocadora-esparcidora, máquina de textura y curado', '2.5 – 4.0'],
      ['Enfriamiento', 'Planta de hielo o enfriador de agua', '0.3 – 0.6'],
      ['Transporte propio', '12 revolvedoras de 8 m³ (el resto subcontratado)', '1.6 – 2.4'],
      ['Terracería y base', 'Motoconformadoras 3D, rodillos, extendedora de alta densidad, excavación', '1.5 – 2.5'],
      ['Control y calidad', 'GNSS y control 3D, laboratorio móvil, perfilómetro, sensores, iluminación y generadores', '0.4 – 0.8'],
      Object.assign(['<b>Total flotilla</b>', '', '<b>7.8 – 13.3</b>'], {act: true}),
    ], ['', '', 'num'])}
    <p class="nota">Órdenes de magnitud para dimensionar la conversación, no una cotización: cambian mucho entre equipo nuevo y seminuevo, entre marcas y con el tipo de cambio. El siguiente paso es pedir tres cotizaciones de la planta y el tren, que juntos son más de la mitad del total.</p>
    <h3>Cómo financiarlo sin comprometer la empresa</h3>
    <div class="dcards">
      ${tarjeta('<i>1</i>El plazo nunca excede el contratado', 'Si hay tres años de obra firmada, no se toma deuda a siete apostando a que habrá más.', 'Esa apuesta es la que quiebra constructoras en cada cambio de administración.')}
      ${tarjeta('<i>2</i>Arrendamiento para el fierro, capital propio para el conocimiento', 'El equipo se arrienda y se deduce contra el flujo del contrato.', 'El dinero propio se reserva para lo que no se arrienda: el equipo técnico, el tramo de prueba, el laboratorio y el tablero.')}
      ${tarjeta('<i>3</i>Nada se compra antes del contrato que lo usa', 'Con una excepción deliberada: el laboratorio y el tramo de prueba.', 'Se pagan antes porque son lo que permite ganar el contrato.')}
    </div>
    <h3>Si no hay para la flotilla completa: arrancar en tres pasos</h3>
    <ol>
      <li><b>Por la fuente 5</b> — ingeniería, especificación, supervisión y laboratorio: capital mínimo, margen alto, y construye la reputación técnica que justifica todo lo demás.</li>
      <li><b>Asociarse para el primer corredor</b> con una constructora que ya tenga flotilla, aportando el estándar, la supervisión y el control: se aprende la operación con capital ajeno.</li>
      <li><b>Comprar flotilla propia</b> cuando haya volumen contratado que la sostenga.</li>
    </ol>
    <p>Es más lento y mucho más difícil de perder.</p>

    ${h2Doc('n-capital', 'Con qué se paga todo esto', 'El dinero: capital de trabajo, flotilla y tipo de cambio')}
    ${tablaDoc(['Necesidad', 'Cómo se cubre', 'Por qué así'], [
      ['<b>Capital de trabajo</b> (materiales antes del cobro)', 'Anticipo de 20–30 %, estimaciones quincenales, crédito de cementera y acería a 60 días, factoraje de estimaciones aprobadas y una línea revolvente de 120 días de operación', 'Es el límite real del negocio y el riesgo que más constructoras mata en México: el pago tardío'],
      ['<b>Flotilla</b>', 'Arrendamiento con plazo igual al contrato, nunca mayor; compra sólo de las cuatro máquinas críticas cuando hay tres años de volumen', 'Nunca se toma deuda a siete años apostando a que habrá más obra'],
      ['<b>Tipo de cambio</b>', 'La flotilla se cotiza en dólares: arrendarla en pesos o cubrir el tipo de cambio al firmar', 'Una devaluación no puede convertir una obra rentable en pérdida'],
      ['<b>Insumos</b>', 'Contratos anuales indexados y escalación en el contrato de obra', 'El riesgo de precio se comparte, no se apuesta'],
      ['<b>Conservación</b>', 'La anualidad se vuelve colateral: con 30 años de flujo firmado se financia la siguiente flotilla', 'El negocio recurrente paga el crecimiento'],
    ])}


    ${h2Doc('n-equilibrio', 'No quiebran por construir mal: quiebran por tener flotilla sin volumen', 'El punto de equilibrio')}
    <p>Una flotilla propia tiene un costo fijo anual que corre trabaje o no — arrendamiento, nómina base, seguros, mantenimiento preventivo, campamento — y se reparte entre los kilómetros que se hagan al año. Con 250 km/año como referencia (un frente a ritmo pleno):</p>
    <div class="barras-eq" style="max-width:720px">${EQUILIBRIO.map(([km, x]) => `<div class="fila-eq"><span>${km} km al año</span><i style="width:${(x / 6.3 * 100).toFixed(0)}%;background:${colEq(km)}"></i><b>${x.toFixed(1)} ×</b></div>`).join('')}</div>
    <p class="nota">Costo fijo por kilómetro, contra la referencia de 250 km/año.</p>
    <div class="dcards">
      ${tarjeta('<span class="chip-c compra">Más de 150 km/año</span>', '<b>Flotilla propia</b>, con 3 años de visibilidad.', 'El costo fijo se diluye y el control de calidad — que sostiene la conservación de 30 años — se vuelve tuyo.')}
      ${tarjeta('<span class="chip-c neg">Entre 60 y 150 km/año</span>', '<b>Modelo mixto:</b> se compran la planta, el tren de colado y el laboratorio; se renta la terracería y se subcontrata el transporte.', 'Es el 60 % de la inversión con el 90 % del control sobre la calidad.')}
      ${tarjeta('<span class="chip-c pres">Menos de 60 km/año</span>', '<b>No se compra nada.</b> Se opera con la fuente 5 y se ejecuta en asociación con quien ya tiene flotilla.')}
    </div>
    ${citaDoc('La condición que vale más que el número es la visibilidad: 150 km contratados con plazo firme valen más que 300 km probables. Por eso el contrato plurianual de conservación también sirve para financiar la flotilla sin apostar la empresa.')}

    ${h2Doc('n-conservacion', 'La obra dura tres años; la conservación, treinta', 'El activo real: la conservación')}
    ${tablaDoc(['', 'Obra', 'Conservación por disponibilidad'], [
      ['Duración', '2 a 3 años', '15 a 30 años'],
      ['Margen', '8–15 %', '25–40 %'],
      ['Capital requerido', 'Muy alto', 'Bajo, ya está invertido'],
      ['Riesgo', 'De ejecución y de precio', 'De desempeño del pavimento'],
      ['Quién compite', 'Todas las constructoras', 'Prácticamente nadie'],
    ])}
    <h3>Por qué el riesgo es menor de lo que parece</h3>
    <p>La objeción obvia: ¿y si el pavimento falla y lo tengo que arreglar? El riesgo de desempeño lo controla quien escribió la especificación y la construyó. Las cifras de referencia dicen que un pavimento así promedia 39.5 años antes de su primera rehabilitación, que hay casos acercándose a 65 años y que con curado interno se habla de más de 75. <b>Se firma una anualidad de 30 años sobre un activo que, bien hecho, no necesita casi nada durante 25: el contrato asume un mantenimiento que el pavimento no va a consumir, y esa diferencia es la utilidad.</b> Quien construyó al 70 % de la especificación no puede firmar ese contrato, y si lo firma, lo pierde.</p>
    <h3>Qué tiene que decir el contrato</h3>
    <div class="dcards">
      ${tarjeta('Pago por disponibilidad', 'Con umbrales medibles: IRI, agrietamiento, drenaje funcionando, señalización.')}
      ${tarjeta('Descuentos automáticos', 'Calculados del dato, no de una inspección discrecional.')}
      ${tarjeta('Medición con la telemetría del pavimento', 'Auditable por el cliente en su propio tablero.')}
      ${tarjeta('Indexación de la anualidad', 'La anualidad se actualiza a lo largo de los 15 a 30 años del contrato.')}
      ${tarjeta('Ventana de revisión cada 5 años', 'Para eventos fuera de control razonable.', 'Es lo que hace firmable el contrato para ambos lados: nadie sensato asume 30 años de riesgo climático y de tránsito sin ella.')}
    </div>

    ${h2Doc('n-ventaja', 'La especificación se copia en cinco minutos', 'La ventaja defendible')}
    <p>El documento está escrito y cualquiera puede leerlo. La ventaja está en cuatro cosas que tardan años en construirse:</p>
    <div class="dcards">
      ${tarjeta('<i>1</i>El historial medido', 'Después de un corredor instrumentado se tienen datos reales de este diseño con estos agregados, este clima y estos camiones.', 'El segundo proyecto se cotiza con menos riesgo que cualquier competidor: más barato o con más margen.')}
      ${tarjeta('<i>2</i>La disposición a firmar la garantía', 'Cualquiera promete 50 años; muy pocos firman una anualidad condicionada a que se cumpla.', 'El competidor no puede imitarla sin asumir un riesgo que no sabe calcular.')}
      ${tarjeta('<i>3</i>El equipo entrenado', 'Los cuatro operadores críticos, el gerente de calidad que sabe decir que no, el despachador que sostiene los dos minutos.', 'En la región hay pocos, y ya serían tuyos.')}
      ${tarjeta('<i>4</i>El estándar adoptado', 'Si las dependencias licitan con esta especificación, la cancha queda dibujada a tu favor sin pelear cada licitación.', 'Es la jugada más barata y la más lenta: se gana publicándola, enseñándola y regalándola.')}
    </div>
    ${citaDoc('La que NO es ventaja: tener la flotilla. El fierro se compra con dinero y el dinero lo tiene cualquiera con acceso a crédito. La flotilla es la barrera de entrada, no la ventaja; confundirlas lleva a sobreinvertir en equipo y subinvertir en la gente y los datos, que es donde sí se defiende el negocio.', true)}

    ${h2Doc('n-riesgos', 'Y cómo se cubre cada uno', 'Riesgos')}
    ${tablaDoc(['Riesgo', 'Qué tan grave', 'Cómo se cubre'], [
      ['Volumen contratado menor al esperado', '<span class="chip-c pres">Existencial</span>', 'No comprar flotilla sin 3 años de visibilidad. Arrendamiento con plazo igual al contrato, nunca mayor.'],
      ['Cambio de administración', '<span class="chip-c pres">Alta</span>', 'Contratos plurianuales blindados; diversificar entre estado, municipios y privados; que el estándar sea de la dependencia y no tuyo.'],
      ['Pago tardío del cliente público', '<span class="chip-c pres">Alta y crónica</span>', 'Línea de capital de trabajo dimensionada a 120 días de operación. Es el riesgo que más constructoras mata en México.'],
      ['Desempeño del pavimento bajo garantía', '<span class="chip-c neg">Media</span>', 'Se controla con la especificación, el tramo de prueba y el laboratorio independiente. La telemetría avisa antes de que sea caro.'],
      ['Precio de cemento, acero y diésel', '<span class="chip-c neg">Media</span>', 'Cláusulas de escalación en obra, indexación en la anualidad y contratos de suministro anuales.'],
      ['Falta de gente calificada', '<span class="chip-c neg">Media</span>', 'Formar en lugar de competir por sueldo; continuidad de trabajo como argumento; certificaciones propias.'],
      ['Falla de una máquina crítica', '<span class="chip-c alto">Baja pero cara</span>', 'Mantenimiento por horas, refacciones en sitio, contrato de servicio con el fabricante y plan escrito por máquina.'],
      ['Liberación de derecho de vía', '<span class="chip-c pres">Alta</span>', 'Puesto dedicado con reporte directo y 20 km de colchón permanente.'],
    ])}
    ${citaDoc('El riesgo que no está en la tabla, y el más probable: ganar un contrato con un precio que no permite construir así. Es el único que destruye el modelo completo, porque un pavimento al 70 % de la especificación no aguanta la anualidad de 30 años y se pierden la obra y la conservación a la vez. La defensa es una política escrita y decidida en frío: hay un piso de precio debajo del cual no se firma, aunque se pierda el contrato.', true)}

    ${h2Doc('n-angulos', 'Para que nada nos tome por sorpresa', 'Todos los ángulos')}
    ${tablaDoc(['Ángulo', 'La pregunta', 'La respuesta'], [
      ['Cliente', '¿Quién paga?', 'SICT y estados por obra pública; concesionarios y APP por disponibilidad; parques industriales y privados para accesos y patios. Nunca más de la mitad del volumen con un solo cliente.'],
      ['Contrato', '¿Bajo qué figura?', 'Obra pública con conservación plurianual, APP por disponibilidad o contrato privado. Siempre con desempeño medido (IRI, grietas, drenes) y ventana de revisión cada 5 años.'],
      ['Precio', '¿Cómo no perder dinero?', 'Cotizador con cantidades reales, indexación y un piso que no se cruza.'],
      ['Cobro', '¿Cuándo entra el dinero?', 'Anticipo, estimaciones quincenales y factoraje. El pago tardío se presupuesta desde el inicio: 120 días.'],
      ['Gente', '¿Quién lo hace bien de noche?', 'Sueldos arriba del mercado, variable con candado de calidad, bienestar real y continuidad de varios años.'],
      ['Calidad', '¿Quién garantiza los 50 años?', 'Calidad reporta al Director, laboratorio con autoridad de rechazo y bonos de dirección diferidos hasta el año 5.'],
      ['Seguridad', '¿Qué pasa en un frente nocturno abierto?', 'Señalización completa, cualquiera para el colado sin consecuencias y 10 % del variable atado a cero accidentes.'],
      ['Fiscal', '¿Qué impuestos pesan?', 'IVA acreditable de materiales y flotilla, depreciación de la maquinaria, reparto de utilidades de ley y nómina bien timbrada. Sin atajos.'],
      ['Cumplimiento', '¿Cómo se gana sin corrupción?', 'Licitaciones limpias, política anticorrupción firmada por todos, bitácora digital y datos del tablero abiertos al cliente. El estándar publicado es la mejor defensa.'],
      ['Ambiental', '¿Qué huella deja?', 'La ceniza volante sustituye 20–25 % del cemento, la parte que más CO₂ emite. Construir una vez evita tres o cuatro reconstrucciones. Manifestación de impacto ambiental antes de liberar.'],
      ['Social', '¿Cómo se lleva con las comunidades?', 'Empleo local en las cuadrillas, liberaciones con trato directo y cabezas de dren visibles. Una carretera bien hecha es la mejor relación con el pueblo que la usa.'],
      ['Tecnología', '¿Qué se mide?', 'Sensores de madurez, control 3D, GPS de camiones y el tablero diario. El historial medido es la ventaja que no se copia.'],
      ['Político', '¿Y si cambia la administración?', 'Contratos plurianuales, clientes diversos y un estándar que adopta la dependencia, no la empresa.'],
      ['Escala', '¿Cómo se crece?', 'Clonando frentes desde el otro extremo del corredor, nunca acelerando uno. Cada frente nuevo arranca en 16 semanas.'],
      ['Valor', '¿Cuánto vale la empresa?', 'Una constructora vale por su obra; una empresa con 30 años de anualidades firmadas vale por su flujo. La conservación multiplica el valor.'],
    ])}

    ${h2Doc('n-doce', 'De cero a flotilla operando, sin comprometer la empresa', 'Los primeros 12 meses')}
    ${tablaDoc(['Mes', 'Qué se hace', 'Qué se gasta'], [
      ['1–2', 'Publicar el estándar. Presentarlo a dependencias y colegios de ingenieros. Buscar el primer corredor candidato.', 'Casi nada'],
      ['2–4', 'Montar laboratorio y equipo técnico core: gerente de calidad, jefe de laboratorio, ingeniero de datos. Empezar a vender supervisión y diseño a obras de terceros.', 'Bajo, y ya genera ingreso'],
      ['3–5', 'Bancos de caliza: identificar, ensayar y asegurar reservas con contrato antes de que alguien más vea su valor.', 'Medio'],
      ['5–7', 'Tramo de prueba de 500 m con tres variantes instrumentadas: la carta de presentación comercial y el entrenamiento del equipo.', 'Medio'],
      ['6–8', 'Con el tramo medido: negociar el primer corredor y su contrato de conservación en el mismo paquete.', '—'],
      ['8–10', 'Cerrado el contrato: arrendamiento de la flotilla, contratación de los cuatro operadores críticos, montaje de planta.', 'Alto, ya contra contrato'],
      ['10–12', 'Movilización completa y arranque a ritmo parcial.', 'Operativo'],
    ], ['num', '', ''])}
    <div class="dcards">
      ${tarjeta('<i>1</i>Publicar el estándar primero', 'Antes de tener flotilla y antes de tener contrato.', 'Cuesta casi nada y posiciona como quien sabe cómo se hace: el argumento de venta más fuerte que se va a tener.')}
      ${tarjeta('<i>2</i>Asegurar la caliza temprano', 'El agregado correcto es el insumo estratégico de toda la especificación.', 'Un banco con reservas contratadas es una ventaja física que no se copia con dinero rápido.')}
      ${tarjeta('<i>3</i>Obra y conservación juntas, nunca por separado', 'Si primero se firma la obra y luego se intenta vender la conservación, ya se perdió la palanca.', 'Van en el mismo paquete o el modelo se queda en construcción tradicional.')}
    </div>
    ${citaDoc('No se compra una sola máquina antes de tener firmado el contrato que la usa. La única excepción deliberada son el laboratorio y el tramo de prueba, que se pagan antes precisamente porque son lo que hace ganar el contrato.')}
  </div>`;
};
