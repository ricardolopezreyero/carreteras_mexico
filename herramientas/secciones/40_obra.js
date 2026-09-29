/* ── Ejecución · Obra y flotilla: cómo se construye a máxima velocidad — RLR ── */
PAGINAS.obra = () => {
  const camiones = [[5, 32, 15, 'Óptimo'], [10, 47, 22, 'Sano'], [15, 62, 29, 'Límite práctico'], [25, 92, 44, 'Inviable: se excede el tiempo máximo del concreto']];
  const barraCam = ([d, c, n]) => `<div class="fila-eq"><span>${d} km de la planta</span><i style="width:${(n / 44 * 100).toFixed(0)}%;background:${n > 29 ? '#ff9b8a' : n > 22 ? 'var(--amber)' : 'var(--green)'}"></i><b>${n}</b></div>`;
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('La pavimentadora <em>nunca se detiene</em>.',
      'Cada vez que se para y arranca queda una junta fría, una marca en la superficie y un punto débil que no se puede reparar después. Toda la operación — cada máquina, cada puesto, cada horario — se diseña alrededor de mantenerla en movimiento. Y contra la intuición, la pavimentadora casi nunca es el cuello de botella.')}
    ${indiceDoc([['o-aritmetica', 'La aritmética'], ['o-acarreo', 'Planta y acarreo'], ['o-tren', 'El tren'], ['o-flotilla', 'La flotilla'], ['o-frentes', 'Frentes en paralelo'], ['o-dia', 'El día de 24 h'], ['o-paros', 'Lo que detiene el tren'], ['o-tablero', 'Tablero diario'], ['o-movilizacion', 'Movilización']])}

    ${h2Doc('o-aritmetica', 'El número del que sale todo', 'La aritmética que gobierna la obra')}
    <div class="formula">
      <div class="f"><b>8.40 m</b><span>dos carriles colados de 4.20 m</span></div><div class="op">×</div>
      <div class="f"><b>27 cm</b><span>de espesor</span></div><div class="op">=</div>
      <div class="f"><b>2.27 m³</b><span>por metro lineal · 2,270 m³ por km</span></div><div class="op">÷</div>
      <div class="f"><b>10 h</b><span>de colado efectivo por noche</span></div><div class="op">=</div>
      <div class="f res"><b>227 m³/h</b><span>sostenidos. Todo lo demás se dimensiona desde aquí</span></div>
    </div>
    <p><b>La pavimentadora aguanta de sobra.</b> Una de gran formato cuela de 3.66 a 15.24 m de ancho en una sola pasada, y en un aeropuerto de Estados Unidos una sola máquina promedió 306 m³ por hora. Necesitamos 227: la máquina que todos miran tiene <b>35 % de capacidad sobrante</b>. El límite está en otro lado.</p>

    ${h2Doc('o-acarreo', 'Dónde está el límite de verdad', 'La planta y el acarreo')}
    <div class="dcards dos">
      ${tarjeta('La planta', 'Capacidad instalada de <b>250–280 m³/h</b>, entre 10 y 25 % de holgura: una planta central de mezclado grande o dos medianas en paralelo.', 'Una planta trabajando al 100 % de su capacidad nominal falla el primer día caluroso.')}
      ${tarjeta('El acarreo', 'Con camiones de 8 m³: 227 ÷ 8 = <b>28 descargas por hora</b>. Un camión llegando a la pavimentadora <b>cada 2 minutos, toda la noche, sin fallar una sola vez</b>.', 'Cuántos camiones hacen falta depende por completo de qué tan lejos esté la planta.')}
    </div>
    ${tablaDoc(['Distancia planta – frente', 'Ciclo por camión', 'Camiones necesarios', 'Comentario'], camiones.map(([d, c, n, t]) => [`${d} km`, `~${c} min`, `<b>${n}</b>`, t]), ['', 'num', 'num', ''])}
    <div class="barras-eq" style="max-width:640px">${camiones.map(barraCam).join('')}</div>
    <p class="nota">Ciclo = carga 6 min + ida + descarga 6 min + maniobra 5 min + regreso, a 40 km/h promedio. Añadir 15 % de reserva por fallas y tráfico.</p>
    <div class="dcards dos">
      ${tarjeta('<i>1</i>La distancia de acarreo es la variable número uno de la velocidad', 'Triplicar la distancia triplica la flota de camiones y ese costo.', 'No hay decisión de equipo que compense una planta mal ubicada.')}
      ${tarjeta('<i>2</i>Por eso la planta se mueve con el frente', 'Planta móvil o modular que <b>salta cada 15–20 km</b> para mantenerse siempre a menos de 10 km del colado.', 'El desmontaje y montaje se programan como una actividad más del calendario, no como una emergencia.')}
    </div>
    ${citaDoc('Límite duro que ni el dinero resuelve: el concreto se coloca dentro de los 60 a 90 minutos del mezclado, y menos cuando hace calor. Eso fija el radio máximo aunque sobren camiones.', true)}

    ${h2Doc('o-tren', 'Un solo organismo a 1–2 m por minuto', 'El tren de colado')}
    <div class="tren" role="img" aria-label="Tren de colado: cuatro máquinas en serie">
      <div class="m entrada"><b>Revolvedoras</b><span>una descarga cada 2 minutos</span></div><div class="fl">→</div>
      <div class="m"><em>1</em><b>Colocadora-esparcidora</b><span>reparte el concreto parejo delante de la pavimentadora</span></div><div class="fl">→</div>
      <div class="m"><em>2</em><b>Pavimentadora de cimbra deslizante</b><span>control 3D e insertadora de pasajuntas</span></div><div class="fl">→</div>
      <div class="m"><em>3</em><b>Textura y curado</b><span>membrana en el mismo paso, inmediata</span></div><div class="fl">→</div>
      <div class="m"><em>4</em><b>Pasarela de trabajo</b><span>acceso a la losa recién colada sin pisarla</span></div>
    </div>
    <p>Las cuatro máquinas <b>viajan juntas, en serie, a la misma velocidad</b>. El orden no es negociable y la distancia entre ellas tampoco: si la colocadora se separa de más, el concreto pierde trabajabilidad antes de entrar al molde; si la máquina de textura y curado se retrasa, la superficie se seca al aire y se pierde la mitad del trabajo del curado interno.</p>
    ${citaDoc('El tren no construye la carretera: le pone la última capa a algo que ya estaba listo. El drenaje, semanas antes; la base, días antes; el acero, dos días antes.')}

    ${h2Doc('o-flotilla', 'Para un frente de 1 km/día', 'La flotilla completa')}
    <p>Organizada por los cinco frentes que avanzan en paralelo, que es como se administra en obra. La decisión financiera: <b>se compra lo que define la calidad y opera todo el año; se renta lo intensivo pero esporádico; se subcontrata la capacidad pura.</b></p>
    <h3>Frente 1 · Terracería y subrasante</h3>
    ${tablaDoc(['Equipo', 'Cant.', 'Para qué', 'Decisión'], [
      ['Motoconformadora con control 3D GNSS', '2', 'Nivelación fina de la subrasante sin estacas', COMPRA],
      ['Compactador vibratorio liso 12 t', '2', 'Compactación de los 30 cm superiores', COMPRA],
      ['Compactador pata de cabra', '1', 'Suelos arcillosos', RENTA],
      ['Estabilizadora / recicladora de suelos', '1', 'Mezclar la cal en sitio cuando hay arcilla expansiva', RENTA],
      ['Distribuidora de cal', '1', 'Dosificación uniforme del estabilizante', RENTA],
      ['Excavadora 20 t + cargador frontal', '1 + 1', 'Corte, carga, apoyo general', COMPRA],
      ['Camiones de volteo 14 m³', '8', 'Acarreo de material', RENTA + ' ' + SUBC],
      ['Pipa de agua 10,000 L', '2', 'Humedad óptima de compactación', COMPRA],
    ], ['', 'num', '', ''])}
    <h3>Frente 2 · Drenaje <span style="font-weight:600;color:var(--txt3);font-size:13px">— va adelante del colado, nunca detrás</span></h3>
    ${tablaDoc(['Equipo', 'Cant.', 'Para qué', 'Decisión'], [
      ['Retroexcavadora', '2', 'Zanjas de dren y descargas', COMPRA],
      ['Zanjadora continua', '1', 'Dren longitudinal de borde a ritmo del frente', RENTA],
      ['Compactador de zanja', '2', 'Relleno del dren sin asentamientos', RENTA],
      ['Camión grúa ligero', '1', 'Tubo, geotextil, cabezales', RENTA],
    ], ['', 'num', '', ''])}
    <h3>Frente 3 · Base y capa de deslizamiento</h3>
    ${tablaDoc(['Equipo', 'Cant.', 'Para qué', 'Decisión'], [
      ['Extendedora de alta densidad (tipo asfalto)', '1', 'Colocar la base de concreto pobre y, si se elige, la capa inferior de RCC', COMPRA],
      ['Rodillo vibratorio liso 10–12 t', '2', 'Compactación del RCC', COMPRA],
      ['Rodillo neumático', '1', 'Sellado de superficie del RCC', COMPRA],
      ['Petrolizadora / distribuidor de emulsión', '1', 'Interfaz bituminosa sobre la base', RENTA],
    ], ['', 'num', '', ''])}
    <h3>Frente 4 · El tren de colado <span style="font-weight:600;color:var(--txt3);font-size:13px">— el único donde nada se improvisa</span></h3>
    ${tablaDoc(['Equipo', 'Cant.', 'Para qué', 'Decisión'], [
      ['Planta central de mezclado 250–280 m³/h, móvil', '1', 'El corazón. Se mueve cada 15–20 km', COMPRA],
      ['Silos de cemento y de ceniza volante', '2 + 2', 'Autonomía de 2 días de colado', COMPRA],
      ['Planta de hielo o enfriador de agua', '1', 'Mantener el concreto bajo 30 °C. Innegociable en verano', COMPRA],
      ['Camiones revolvedores 8 m³', '15–29', 'Según distancia de acarreo', MIXTO],
      ['Colocadora-esparcidora', '1', 'Reparte el concreto parejo delante de la pavimentadora', COMPRA],
      ['Pavimentadora de cimbra deslizante con insertadora y control 3D', '1', 'La máquina principal', COMPRA],
      ['Máquina de textura y curado', '1', 'Textura y membrana en un solo paso, inmediata', COMPRA],
      ['Pasarela de trabajo', '1', 'Acceso a la losa recién colada sin pisarla', COMPRA],
      ['Manipulador telescópico', '1', 'Acero, sillas, canastillas', COMPRA],
      ['Estación base GNSS + rovers', '1 + 4', 'Control 3D de todo el frente', COMPRA],
      ['Torres de iluminación LED', '8', 'El colado es nocturno: sin luz no hay calidad', COMPRA],
      ['Generadores de respaldo', '2', 'Una planta parada a media noche es el peor escenario', COMPRA],
    ], ['', 'num', '', ''])}
    <h3>Frente 5 · Acabado, control y entrega</h3>
    ${tablaDoc(['Equipo', 'Cant.', 'Para qué', 'Decisión'], [
      ['Cortadora de juntas autopropulsada', '2', 'Sólo si se va por losa con juntas', RENTA],
      ['Esmeriladora de diamante', '1', 'Corrección de suavidad al final del tramo', RENTA],
      ['Perfilómetro inercial', '1', 'Medición de IRI para el bono de suavidad', COMPRA],
      ['Equipo de extracción de núcleos', '1', 'Verificación de espesor real', COMPRA],
      ['Laboratorio de campo móvil', '1', 'Revenimiento, aire, vigas, temperatura, madurez', COMPRA],
      ['Camionetas de supervisión', '4', 'Un frente de 1 km/día se recorre, no se mira', COMPRA],
    ], ['', 'num', '', ''])}
    <h3>Servicios que sostienen todo lo anterior</h3>
    ${tablaDoc(['Equipo', 'Cant.', 'Para qué'], [
      ['Taller móvil con mecánico de turno', '1', 'Reparar en el frente, no en el patio'],
      ['Camión de combustible', '1', 'Nadie deja el frente para cargar diésel'],
      ['Campamento y comedor móvil', '1', 'Turno nocturno con gente alimentada y descansada'],
      ['Refacciones críticas en sitio', '—', 'Bandas, mangueras, sensores, bombas: la lista sale del manual de cada máquina'],
    ], ['', 'num', ''])}
    ${citaDoc('Cuatro piezas no pueden fallar porque no tienen sustituto en el mercado local a media noche: la planta, la pavimentadora, la enfriadora de agua y la máquina de textura y curado. Se compran, se mantienen por horas y cada una tiene escrito qué se hace si falla a las 2 de la mañana.')}

    ${h2Doc('o-frentes', 'Kilómetros sin parar', 'Los cinco frentes avanzan al mismo tiempo')}
    <p>No se turnan: <b>avanzan en paralelo, escalonados a lo largo del corredor</b>. Cada uno hace 1 km al día y va adelante del siguiente; el tren de colado es el último y cuela sobre terreno que otros dejaron listo.</p>
    ${ganttDoc([
      ['Derecho de vía liberado', '≥ 20 km por delante del colado', [[0, 20, 'liberado', 'rgba(169,187,227,.35)']]],
      ['Frente 1 · Terracería', 'colchón ≥ 3 días', [[9, 10, 'F1', '#d9c79b']]],
      ['Frente 2 · Drenaje', 'colchón ≥ 3 días', [[6, 7, 'F2', '#9fc0ff']]],
      ['Frente 3 · Base', 'colchón ≥ 3 días', [[3, 4, 'F3', '#a8b4cf']]],
      ['Cuadrilla de acero', '2 días adelante', [[1, 3, 'acero', 'var(--amber)']]],
      ['Frente 4 · Colado', 'esta noche', [[0, 1, 'F4', 'var(--green)']]],
      ['Frente 5 · Acabado y control', 'el tramo de anteanoche', [[-2, -1, 'F5', '#cfddff']]],
    ], [-3, 21], [-2, 0, 3, 6, 9, 12, 15, 20], x => x === 0 ? 'colado' : `${x > 0 ? '+' : ''}${x} km`)}
    <p class="nota">Esquema: a 1 km/día, un colchón de 3 días son 3 km de ventaja entre frentes.</p>
    <p>Si los frentes trabajaran uno detrás de otro, la flotilla de colado estaría parada meses, cobrando renta y nómina. Escalonados, el sistema <b>absorbe los tropiezos</b>: si el drenaje pierde dos días por una línea que había que reubicar, se come dos días de su colchón y el tren ni se entera.</p>
    <div class="dcards">
      ${tarjeta('<i>1</i>Cada frente mide su colchón todos los días', 'En días de ventaja al ritmo actual, no en kilómetros abstractos.')}
      ${tarjeta('<i>2</i>Nadie gasta su colchón para verse bien', 'Un frente adelantado de más tampoco sirve: el drenaje abierto semanas de más se azolva y la base expuesta se contamina. Se mantiene, no se maximiza.')}
      ${tarjeta('<i>3</i>Si un colchón baja del mínimo, se refuerza ese frente', 'Con horas extra, equipo rentado o gente de otro frente. Reforzar cuesta miles; parar el tren cuesta cientos de miles.')}
    </div>
    ${citaDoc('Un frente completo hace ~250 km al año trabajando 250 días. Si el proyecto es más grande o el plazo más corto, no se acelera el frente: se replica, desde el otro extremo del corredor. Sacar 1.5 km/día de un solo tren se paga todo con calidad.')}

    ${h2Doc('o-dia', 'Un ciclo, no un horario', 'El día de 24 horas')}
    <p>Todo el ciclo se construye alrededor de una restricción física — el concreto entra a 30 °C o menos — que en verano obliga a colar de noche. <b>De día se prepara, de noche se cuela, de madrugada se repara.</b></p>
    ${ganttDoc([
      ['Juntas', '06:00 cierre · 17:30 armar la noche', [[0, 0.5, '', 'var(--amber)'], [11.5, 11.9, '', 'var(--amber)']]],
      ['Frentes 1–3 y acero', 'el día prepara', [[1, 11, 'El día prepara', '#d9c79b']]],
      ['Tren de colado', 'se arma · cuela · entrega', [[10, 13, 'Se arma', '#9fc0ff'], [13, 23, 'Cuela: 1,000 m', 'var(--green)'], [23, 24, '', '#cfddff']]],
      ['Mantenimiento', 'desde que termina el colado', [[23, 24, '', '#ff9b8a'], [0, 10, 'Repara el tren', '#ff9b8a']]],
    ], [0, 24], [0, 4, 8, 12, 16, 20, 24], x => `${String((x + 6) % 24).padStart(2, '0')}:00`)}
    <div class="dcards">
      ${tarjeta('06:00 · Junta de cierre', 'Quince minutos de pie con el tablero de la noche. Aquí se deciden los ajustes, no en una junta semanal.')}
      ${tarjeta('07:00–17:00 · El día prepara', 'Terracería, drenaje y base avanzan kilómetros adelante. La cuadrilla de acero coloca la varilla de <b>pasado mañana</b>, no la de esta noche.')}
      ${tarjeta('16:00–19:00 · El tren se arma', 'Arranca la planta, se verifica la temperatura de agregados y agua, se prueban las primeras revolturas y se encienden las torres.', 'Las tres horas más importantes del día, y las que más se recortan cuando hay prisa: por eso salen mal las noches.')}
      ${tarjeta('19:00–05:00 · El tren cuela', 'Diez horas, un camión cada dos minutos, mil metros. Sin parar.')}
      ${tarjeta('05:00–06:00 · Entrega', 'Se limpia el equipo, se registran los datos y se prepara el tablero. A las 06:00 vuelve a empezar.')}
    </div>
    <div class="dcards dos">
      ${tarjeta('El mantenimiento vive dentro del día', 'El tren se repara de día porque de día no trabaja.', 'Si se trata como algo que se hace «cuando se pueda», se hace cuando ya se rompió: de noche, con todo detenido.')}
      ${tarjeta('El acero va dos días adelante', 'La cuadrilla de varilla es la única parte del sistema que no se acelera comprando una máquina.', 'Si va al día, cualquier tropiezo suyo para el tren esa misma noche.')}
    </div>

    ${h2Doc('o-paros', 'Casi nunca falta capacidad: sobran interrupciones', 'Las seis cosas que detienen el tren')}
    ${tablaDoc(['#', 'Lo que pasa', 'Por qué pasa', 'Cómo se evita'], [
      ['1', '<b>No llega concreto</b>: el tren se queda esperando', 'Un camión se salió del ciclo: fue a cargar diésel, se ponchó, se atoró en un cruce.', 'Despachador con tablero en vivo, 15 % de camiones de reserva, diésel y baños en el patio de planta, ruta de acarreo levantada y cronometrada antes de arrancar.'],
      ['2', '<b>La planta se detiene</b>', 'Banda rota, báscula descalibrada, silo vacío a media noche.', 'Mantenimiento preventivo por horas, no por falla. Silos con 2 días de autonomía. Refacciones críticas en sitio. Prueba de 4 horas continuas antes de cada reubicación.'],
      ['3', '<b>El concreto llega fuera de especificación</b>', 'Temperatura arriba de 30 °C, revenimiento fuera de rango, aire bajo.', 'Enfriamiento desde la planta (hielo, agregado sombreado), no correcciones en el frente. Un camión rechazado cuesta 8 m³; uno aceptado mal cuesta 50 años.'],
      ['4', '<b>El acero no está listo adelante</b>', 'La cuadrilla de varilla avanza más lento que el tren.', 'El acero se coloca con 2 días de anticipación. Si es el limitante, se duplica esa cuadrilla: es la más barata de duplicar.'],
      ['5', '<b>Falla mecánica del tren</b>', 'Hidráulica, sensores de control 3D, vibradores.', 'Mecánico de turno en el frente. Refacciones de las 4 máquinas críticas en sitio. Bitácora de horas por máquina, cambio antes del límite.'],
      ['6', '<b>El clima</b>', 'Viento seco, lluvia, calor extremo.', 'Estación meteorológica en el frente con cálculo de evaporación en vivo. Rompevientos listos. Regla escrita de cuándo no se cuela.'],
    ], ['num', '', '', ''])}
    ${citaDoc('La séptima, la que de verdad mata proyectos en México: el frente alcanza un punto que no está liberado — un predio sin acuerdo, un cruce de ducto, una línea eléctrica, un permiso ambiental. No detiene el tren una noche: lo detiene semanas, con toda la flotilla y la plantilla en nómina. La defensa: siempre 20 km liberados por delante, con un responsable dedicado y un semáforo semanal. Bajo 10 km se levanta la alarma; bajo 5, se frena a propósito para no quedar atrapados.', true)}
    <p><b>La cuenta que justifica todo:</b> una hora de paro del tren cuesta el 10 % de la producción del día, con toda la flotilla y toda la plantilla en nómina. Cada antídoto de la tabla se paga con evitar una sola interrupción al mes.</p>

    ${h2Doc('o-tablero', 'Doce números, cada mañana a las 6:00', 'El tablero diario')}
    ${tablaDoc(['Indicador', 'Meta', 'Quién lo reporta'], [
      ['Metros colados', '≥ 1,000 m', 'Residente de colado'],
      Object.assign(['<b>Minutos de paro del tren, con causa</b>', 'Menos de 30 min', 'Residente de colado'], {act: true}),
      ['Intervalo promedio entre camiones', '≤ 2.5 min', 'Despachador'],
      ['Camiones fuera de ciclo', '0', 'Despachador'],
      ['m³ colocados contra m³ teóricos', '± 3 %', 'Jefe de planta'],
      ['Temperatura máxima del concreto en descarga', '≤ 30 °C', 'Laboratorio'],
      ['Camiones rechazados y por qué', 'Se registran todos', 'Laboratorio'],
      ['Tiempo mezclado → colocación (el peor del turno)', '≤ 75 min', 'Laboratorio'],
      ['Tasa de evaporación máxima de la noche', 'Menos de 0.5 kg/m²/h', 'Laboratorio'],
      Object.assign(['<b>Colchón de los frentes previos</b>', '≥ 3 días cada uno', 'Superintendente'], {act: true}),
      Object.assign(['<b>Kilómetros liberados por delante</b>', '≥ 20 km', 'Superintendente'], {act: true}),
      ['IRI del tramo colado anteanoche', '≤ 1.0 m/km', 'Frente 5'],
    ])}
    <div class="dcards">
      ${tarjeta('Minutos de paro: el indicador rey', 'Los metros son el resultado; los minutos de paro, la causa.', 'Si se persigue el resultado sin ver la causa, la reacción natural es apurar la pavimentadora, y así se arruina el acabado.')}
      ${tarjeta('Colchón de los frentes previos', 'El único indicador que avisa con días de anticipación que el frente se va a parar.', 'Todos los demás reportan lo que ya pasó.')}
      ${tarjeta('Kilómetros liberados por delante', 'Evita la pérdida más cara de todas.', 'Se revisa aunque no haya problema, porque cuando lo hay ya es tarde.')}
    </div>
    <h3>Cómo se captura sin que sea una carga</h3>
    <ul>
      <li><b>La planta</b> entrega sola m³, hora de mezclado y temperatura por camión.</li>
      <li><b>El GPS de los camiones</b> da el ciclo, el intervalo y quién se salió de ruta.</li>
      <li><b>El control 3D de la pavimentadora</b> da metros, velocidad y los minutos exactos detenida.</li>
      <li><b>Los sensores de madurez</b> dan la temperatura interna y cuándo se puede abrir.</li>
      <li><b>El laboratorio</b> captura en tableta, no en papel.</li>
    </ul>
    <p>El residente no llena el tablero: lo <b>revisa</b> y decide con él. Es el único diseño que sobrevive al mes tres de una obra.</p>

    ${h2Doc('o-movilizacion', 'Antes del primer metro', 'Movilización')}
    <p>La velocidad de un frente se decide antes de que empiece. Estas doce cosas tienen que existir y estar probadas antes de colar el primer metro:</p>
    <ul class="check">
      <li><b>Tramo de prueba de 500 m construido y evaluado</b>, con las tres variantes instrumentadas. Es también el entrenamiento real de la cuadrilla.</li>
      <li><b>Banco de caliza contratado para el volumen completo</b>, con reservas verificadas y ensayo de no reactividad aprobado.</li>
      <li><b>Diseño de mezcla validado con los agregados reales del banco</b>, no con muestras.</li>
      <li><b>Planta montada, calibrada y probada 4 horas continuas</b> a 250 m³/h, con el producto pasando laboratorio.</li>
      <li><b>Modelo digital 3D del corredor</b> cargado en motoconformadoras, pavimentadora y rovers, verificado contra puntos físicos.</li>
      <li><b>20 km de derecho de vía liberados</b>, con predios, cruces de ductos y reubicación de líneas resueltos.</li>
      <li><b>Plan de tránsito y desvíos autorizado</b>, con señalización nocturna completa en sitio.</li>
      <li><b>Contrato de transporte firmado</b> con la cláusula de mando: el chofer responde al despachador de la obra.</li>
      <li><b>Refacciones críticas de las cuatro máquinas clave</b>, físicamente en el almacén del frente.</li>
      <li><b>Protocolo escrito de qué hacer si falla cada máquina a las 2 a. m.</b>, firmado por quien decide.</li>
      <li><b>Tablero diario funcionando</b> con datos reales del tramo de prueba, no una plantilla vacía.</li>
      <li><b>Tres días de capacitación de la cuadrilla de colado</b> en el tramo de prueba: agua, temperatura y curado explicados hasta que se repitan solos.</li>
    </ul>
    <h3>La secuencia de arranque</h3>
    ${ganttDoc([
      ['Bancos, mezcla, contrataciones', 'pedido de equipo', [[0, 4, 'sem. 1–4']]],
      ['Planta, campamento', 'primeros 20 km liberados', [[4, 8, 'sem. 5–8']]],
      ['Tramo de prueba', 'se cuela, instrumenta y mide', [[8, 10, 'sem. 9–10', 'var(--amber)']]],
      ['Ajustes de mezcla y proceso', 'con lo que dijo el tramo', [[10, 12, 'sem. 11–12']]],
      ['Arranque a ritmo parcial', '400–600 m por noche', [[12, 13, '13', '#9fc0ff']]],
      ['Ritmo pleno', '1,000 m por noche', [[13, 16, 'sem. 14–16', '#9fc0ff']]],
    ], [0, 16], [0, 4, 8, 12, 16], x => `sem. ${x}`)}
    ${citaDoc('Ningún frente arranca a velocidad plena, y el que lo intenta paga con calidad. Programar el arranque parcial por adelantado — en lugar de prometer 1 km desde la primera noche y no cumplirlo — es la diferencia entre un proyecto que se acelera y uno que arrastra el retraso desde la semana 13.')}
  </div>`;
};
