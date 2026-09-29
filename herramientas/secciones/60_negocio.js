/* ── Ejecución · Modelo de negocio: disponibilidad con una obra al principio — RLR ── */
PAGINAS.negocio = () => {
  const EQUILIBRIO = [[250, 1.0], [180, 1.4], [120, 2.1], [90, 2.8], [60, 4.2], [40, 6.3]];
  const colEq = km => km >= 150 ? 'var(--green)' : km >= 60 ? 'var(--amber)' : '#ff9b8a';
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('Esto no es un negocio de construcción. Es un negocio de <em>disponibilidad</em> con una obra al principio.',
      'Se deja de vender obra entregada y se empieza a vender kilómetro disponible al estándar comprometido: el cliente paga una anualidad durante 15, 20 o 30 años a cambio de que cada kilómetro cumpla umbrales medibles — suavidad, ausencia de grietas, señalización, drenaje funcionando. Si no cumple, se descuenta.')}
    ${indiceDoc([['n-tesis', 'La tesis'], ['n-tres', 'Tres negocios'], ['n-ingresos', 'Cinco ingresos'], ['n-inversion', 'La inversión'], ['n-equilibrio', 'Punto de equilibrio'], ['n-conservacion', 'Conservación'], ['n-ventaja', 'Ventaja'], ['n-riesgos', 'Riesgos'], ['n-doce', 'Primeros 12 meses']])}

    ${h2Doc('n-tesis', 'Por qué el negocio normal es malo', 'La tesis')}
    <p>El negocio carretero tradicional en México licita una obra, la construye, la cobra, la entrega y vuelve a licitar desde cero. Eso produce <b>ingresos irregulares</b> (picos y valles, con flotilla y nómina que no se pueden apagar entre obras), <b>márgenes de 8 a 15 %</b> (porque se compite contra quien construye peor y cobra menos), <b>cero acumulación</b> (el conocimiento de la obra terminada no sirve para ganar la siguiente) e <b>incentivos invertidos</b>: quien construye mal gana más ese año, y quien reconstruye en el año 12 cobra otra vez.</p>
    ${citaDoc('En el modelo tradicional, la mala calidad es un modelo de negocio.', true)}
    <div class="comparar">
      <div class="antes"><h4>En el modelo tradicional</h4><p>La calidad es un costo que reduce el margen.</p><p>El ingreso termina cuando se entrega.</p><p>Se compite por precio de obra.</p><p>Los datos del pavimento no valen nada.</p></div>
      <div class="despues"><h4>En el modelo de disponibilidad</h4><p>La calidad es el margen: cada año sin intervenir es utilidad.</p><p>El ingreso corre 30 años.</p><p>Se compite por costo de ciclo de vida, donde esta especificación gana.</p><p>Los datos permiten intervenir barato y a tiempo.</p></div>
    </div>
    <p>La especificación de 50 años deja de ser un gasto extra y se vuelve <b>el activo que genera la utilidad</b>: un pavimento que no hay que tocar durante 25 años, cobrando una anualidad durante esos 25 años, es el mejor negocio de infraestructura que existe.</p>
    ${citaDoc('No le estamos vendiendo una carretera más cara. Le estamos vendiendo no tener que volver a construirla, y estamos dispuestos a firmarlo por 30 años.')}

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
