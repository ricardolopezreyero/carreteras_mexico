/* ── Ejecución · Plantilla y organigrama: la gente de un frente de 1 km/día — RLR ── */
PAGINAS.equipo = () => {
  // la plantilla de un frente, por grupo (choferes: 15–29 según acarreo, más 15 % de relevo; aquí a 10 km)
  const GENTE = [
    ['Mando y staff', 15, '#cfddff', 'día y noche'], ['Frente 1 · Terracería', 15, '#d9c79b', 'día'], ['Frente 2 · Drenaje', 10, '#9fc0ff', 'día'],
    ['Frente 3 · Base', 11, '#a8b4cf', 'día'], ['Frente 4 · Colado', 34, '#56EF9F', 'noche'], ['Frente 5 · Acabado', 6, '#e7edfb', 'día'],
    ['Mantenimiento', 5, '#ff9b8a', 'madrugada'], ['Choferes de revolvedora', 25, '#FFC857', 'noche · 22 + relevo'],
  ];
  const total = GENTE.reduce((s, g) => s + g[1], 0);
  const cotiza = cotizar({});   // corredor de referencia: 100 km, 4 carriles
  const perfil = (titulo, quien, responde, autoridad, senal) => `<div class="dcard"><h4>${titulo}</h4>
    <div class="porque" style="margin-top:0"><b>Quién es.</b> ${quien}</div>
    <div class="porque"><b>De qué responde.</b> ${responde}</div>
    ${autoridad ? `<div class="porque"><b>Qué autoridad tiene.</b> ${autoridad}</div>` : ''}
    <div class="porque" style="color:var(--green)"><b style="color:var(--green)">La señal de que contrataste bien.</b> ${senal}</div></div>`;
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('Calidad y Seguridad <em>jamás</em> reportan a Producción.',
      'Un frente de 1 km/día tiene unas 115 personas. La pregunta no es cuántas: es cómo se acomodan para que la velocidad y la calidad no peleen entre sí. Y pelean todas las noches, a las tres de la mañana, cuando llega un camión con el concreto a 32 °C y alguien tiene que decidir si se cuela o se tira. En ese momento decide el organigrama, no la buena voluntad de nadie.')}
    ${indiceDoc([['e-plantilla', 'La plantilla'], ['e-frentes', 'Por frente'], ['e-sueldos', 'Sueldos y variable'], ['e-organigrama', 'Organigrama'], ['e-perfiles', 'Perfiles'], ['e-autoridad', 'Reglas de autoridad'], ['e-juntas', 'Juntas'], ['e-contratar', 'Contratar'], ['e-gozo', 'Un gozo trabajar aquí']])}

    ${h2Doc('e-plantilla', 'De día se prepara, de noche se cuela, de madrugada se repara', 'La plantilla de un frente')}
    <div class="pila-gente" role="img" aria-label="Personas por grupo en un frente">${GENTE.map(([n, c, col]) => `<div style="flex:${c};background:${col}" title="${n}: ${c}">${c}</div>`).join('')}</div>
    <div class="pila-ley">${GENTE.map(([n, c, col, t]) => `<span><i style="background:${col}"></i><b style="color:#fff">${c}</b>&nbsp;${n} <span style="opacity:.75">· ${t}</span></span>`).join('')}</div>
    <p class="nota" style="margin-top:12px"><b>${total} personas con la planta a 10 km del colado.</b> Son 96 puestos fijos más los choferes, que van de 15 a 29 según la distancia de la planta, más 15 % de relevo: de 113 a 129 personas en total. La tabla de mando y staff suma 15 puestos (el documento de origen decía 14). La estructura de proyecto — Director, Gerente de calidad, Gerente de logística, Ingeniero de datos y Responsable de liberaciones — va aparte y se comparte entre frentes.</p>
    <h3>Mando y staff · 15 personas</h3>
    ${tablaDoc(['Puesto', 'Cant.', 'Turno', 'De qué responde'], [
      ['Superintendente de frente', '1', 'Día + arranque de colado', 'Avance, secuencia, decisiones de campo'],
      ['Ingeniero residente de colado', '1', 'Noche', 'El tren. Autoridad para parar'],
      ['Jefe de planta', '2', 'Uno por turno', 'Dosificación, temperatura, continuidad'],
      ['Jefe de laboratorio', '1', 'Día, disponible de noche', 'Calidad y liberaciones'],
      ['Laboratoristas', '3', 'Rotando', 'Revenimiento, aire, vigas, madurez'],
      ['Topógrafo / control 3D', '2', 'Día y noche', 'Modelo digital, rasante, as-built'],
      ['Despachador de camiones', '2', 'Uno por turno', 'El ritmo de 2 minutos. Puesto clave'],
      ['Seguridad e higiene', '2', 'Día y noche', 'Señalización, tránsito, incidentes'],
      ['Almacén y refacciones', '1', 'Día', 'Que no falte un sensor a las 2 a. m.'],
    ], ['', 'num', '', ''])}

    ${h2Doc('e-frentes', 'Cada cuadrilla, con su turno', 'La plantilla por frente')}
    <div class="dcards">
      <div class="dcard"><h4>Frente 1 · Terracería · 15 · día</h4>${tablaDoc(['Puesto', 'Cant.'], [['Cabo de frente', '1'], ['Operadores de maquinaria', '6'], ['Ayudantes generales', '6'], ['Regadores / control de humedad', '2']], ['', 'num'])}</div>
      <div class="dcard"><h4>Frente 2 · Drenaje · 10 · día</h4>${tablaDoc(['Puesto', 'Cant.'], [['Cabo de drenaje', '1'], ['Operadores', '3'], ['Cuadrilla de tubo, geotextil y cabezales', '6']], ['', 'num'])}</div>
      <div class="dcard"><h4>Frente 3 · Base · 11 · día</h4>${tablaDoc(['Puesto', 'Cant.'], [['Cabo de base', '1'], ['Operadores de extendedora y rodillos', '4'], ['Cuadrilla de apoyo y riego de liga', '6']], ['', 'num'])}</div>
      <div class="dcard"><h4>Frente 5 · Acabado · 6 · día</h4>${tablaDoc(['Puesto', 'Cant.'], [['Cabo de acabado', '1'], ['Operadores de corte y esmerilado', '2'], ['Cuadrilla de núcleos y mediciones', '2'], ['Operador de perfilómetro', '1']], ['', 'num'])}</div>
      <div class="dcard"><h4>Mantenimiento · 5 · madrugada</h4><div class="que">Entran cuando termina el colado, a las 5 de la mañana, y dejan todo listo para la noche siguiente: 1 jefe, 3 mecánicos y 1 llantero-lubricador.</div></div>
      <div class="dcard"><h4>Choferes de revolvedora · 15–29 + 15 %</h4><div class="que">Según la distancia de acarreo. Es la partida más elegible para subcontrato, con una condición en el contrato del transportista: <b>el chofer responde al despachador de la obra, no a su patrón.</b></div><div class="porque">Un solo camión que se desvía a cargar diésel rompe el ritmo de dos minutos.</div></div>
    </div>
    <h3>Frente 4 · El tren de colado · 34 personas · noche <span style="font-weight:600;color:var(--txt3);font-size:13px">— la plantilla que decide la calidad de los 50 años</span></h3>
    ${tablaDoc(['Puesto', 'Cant.', 'Qué hace'], [
      ['Cabo de colado', '1', 'Manda el tren minuto a minuto'],
      ['Operador de pavimentadora + ayudante', '2', 'La máquina principal'],
      ['Operador de colocadora-esparcidora', '1', 'Reparto parejo del concreto'],
      ['Operador de máquina de textura y curado', '1', 'Textura y membrana inmediata'],
      ['Cuadrilla de acero', '10', 'Varilla sobre sillas, traslapes, anclajes'],
      ['Acabadores', '6', 'Bordes, orillas, correcciones puntuales'],
      ['Controladores de descarga', '2', 'Reciben un camión cada 2 min sin derrames'],
      ['Señaleros y control de tránsito', '4', 'Un frente nocturno abierto es un riesgo real'],
      ['Operadores de planta', '2', 'Planta y cargador'],
      ['Laboratorista de turno', '2', 'Prueba cada camión, no cada día'],
      ['Mecánico de turno', '1', 'Vive en el frente durante el colado'],
      ['Electricista / iluminación', '1', 'Torres, generadores, respaldo'],
      ['Apoyo general', '1', '—'],
    ], ['', 'num', ''])}
    <h3>Los tres puestos que la gente subestima</h3>
    <div class="dcards">
      ${tarjeta('<i>1</i>El despachador de camiones', 'No es un radioperador: administra el recurso más escaso de la obra, la continuidad.', 'Necesita autoridad sobre los choferes y un tablero en vivo con la posición de cada camión.')}
      ${tarjeta('<i>2</i>El laboratorista nocturno', 'Prueba cada camión y puede rechazarlo.', 'Si responde al superintendente y no al jefe de laboratorio, la calidad se negocia a las 3 de la mañana y siempre pierde.')}
      ${tarjeta('<i>3</i>El mecánico de turno en el frente', 'La diferencia entre una falla de 20 minutos y una noche perdida.', 'Es que alguien con herramienta esté a 100 metros, no a 40 kilómetros.')}
    </div>

    ${h2Doc('e-sueldos', 'Pagar bien, a tiempo y por lo que importa', 'Sueldos y variable por metas')}
    <p>Sueldos <b>arriba del mercado a propósito</b>: el turno de noche ya lleva 20 % de prima y nadie gana menos de ${mxn(Math.min(...PUESTOS.map(p => p[3])))} al mes, casi el doble del salario mínimo. Encima, cada puesto tiene un <b>variable por metas</b> que se ve todos los días en el tablero: cada quien sabe cuánto lleva ganado en el mes.</p>
    <div class="metas">
      <div class="meta"><b>${mxn(nominaMes(PUESTOS))}</b><span>nómina fija al mes de un frente</span><em>${personasFrente} personas en planilla propia (los choferes de las revolvedoras subcontratadas van en su contrato)</em></div>
      <div class="meta"><b>${mxn(variableMes(PUESTOS))}</b><span>variable al mes si se cumplen las metas</span><em>${pct(variableMes(PUESTOS) / nominaMes(PUESTOS))} sobre la nómina, en promedio</em></div>
      <div class="meta"><b>${mxn((nominaMes(PUESTOS) + variableMes(PUESTOS)) * 12 * COSTO_SOCIAL)}</b><span>costo al año, con variable y prestaciones</span><em>IMSS, INFONAVIT, aguinaldo, vacaciones y fondo de ahorro (×${COSTO_SOCIAL})</em></div>
      <div class="meta"><b>${pct(cotiza.partidas.filter(p => p[3] === 'gente').reduce((s, p) => s + p[1], 0) / cotiza.precio)}</b><span>del precio de un corredor</span><em>La gente, con bienestar y variable incluidos. Pagar bien es la decisión más barata de la obra.</em></div>
    </div>
    ${tablaDoc(['Puesto', 'Cant.', 'Sueldo mensual', 'Variable meta', 'Con meta cumplida', 'Turno'],
      [...new Set(PUESTOS.map(p => p[0]))].flatMap(g => [Object.assign([`<b style="color:var(--green)">${g}</b>`, '', '', '', '', ''], {}),
        ...PUESTOS.filter(p => p[0] === g).map(([, n, c, s, v, t]) => [n, c, mxn(s), `${v} % · ${mxn(s * v / 100)}`, `<b>${mxn(s * (1 + v / 100))}</b>`, t])]),
      ['', 'num', 'num', 'num', 'num', ''])}
    <h3>La estructura de proyecto</h3>
    ${tablaDoc(['Puesto', 'Sueldo mensual', 'Variable meta anual', 'Cómo se paga'], ESTRUCTURA.map(([n, c, s, v]) => [n, mxn(s), `${v} % · ${mxn(s * 12 * v / 100)} al año`,
      n === 'Gerente de calidad' ? 'Nada por metros: calidad medida, seguridad y tablero' : '40 % al entregar · 30 % al año 2 · 30 % al año 5, si el tramo cumple']), ['', 'num', 'num', ''])}
    <p class="nota">Sueldos brutos mensuales aproximados de 2026 para obra carretera en el norte y centro del país; se ajustan por región. El variable se calcula sobre el sueldo del mes.</p>
    <h3>Cómo se gana el variable</h3>
    <div class="metas">
      <div class="meta"><b>40 %</b><span>Metros colados</span><em>La meta del mes: 1,000 m por cada noche programada, con arranque parcial en las primeras semanas.</em></div>
      <div class="meta"><b>30 %</b><span>Calidad medida</span><em>Cero camiones con agua añadida, núcleos con el espesor completo, IRI ≤ 1.0 m/km y el curado a tiempo.</em></div>
      <div class="meta"><b>20 %</b><span>Continuidad</span><em>Menos de 30 minutos de paro por noche en promedio y los colchones de los frentes arriba de 3 días.</em></div>
      <div class="meta"><b>10 %</b><span>Seguridad</span><em>Cero accidentes con tiempo perdido en el mes.</em></div>
    </div>
    ${citaDoc('El candado: si el mes falla la calidad o la seguridad, la parte de metros no se paga. Primero bien, luego rápido. Así el bono empuja en la misma dirección que el organigrama.')}
    <div class="dcards">
      ${tarjeta('<i>1</i>Frentes y operadores: cada mes', 'Con las cuatro metas de arriba, por cuadrilla. Se ve al día en el tablero y se paga con la nómina del mes siguiente.')}
      ${tarjeta('<i>2</i>Calidad: nada por metros', 'Laboratorio y gerencia de calidad cobran por calidad medida (60 %), seguridad (25 %) y el tablero completo a tiempo (15 %).', 'Si su bono dependiera de los metros, el puesto dejaría de existir.')}
      ${tarjeta('<i>3</i>Mando: cada trimestre', 'Superintendente, residente y jefes, con las mismas metas del frente más el margen del proyecto.')}
      ${tarjeta('<i>4</i>Dirección: cuando el pavimento lo demuestra', 'El bono anual se paga en tres partes: 40 % al entregar, 30 % al año 2 y 30 % al año 5, si el tramo sigue cumpliendo la garantía.', 'Cobran cuando la carretera prueba que dura.')}
      ${tarjeta('<i>5</i>Hitos que se celebran', 'Primer kilómetro, tramo de prueba aprobado y cada 50 km sin un solo camión rechazado por agua: bono fijo para toda la cuadrilla y comida con las familias.')}
      ${tarjeta('<i>6</i>Y la utilidad se reparte', 'El 10 % de reparto de utilidades de ley, más un fondo de ahorro en el que la empresa pone lo mismo que cada persona.')}
    </div>

    ${h2Doc('e-organigrama', 'La decisión estructural más importante', 'El organigrama: cuatro líneas al mismo nivel')}
    <p>Si el laboratorista le reporta al superintendente — que es quien tiene la meta de metros —, a las tres de la mañana, con toda la flotilla esperando, un subordinado no le rechaza un camión a su jefe. No por deshonesto: por humano, y porque su evaluación depende de él. Cuando Calidad cuelga directamente del Director, <b>el rechazo se sostiene solo</b>. Nadie tiene que ser valiente: el sistema ya decidió.</p>
    <div class="org" role="img" aria-label="Organigrama del proyecto">
      <div class="org-dir"><b>Director de Proyecto</b><span>el único que reanuda un colado detenido y autoriza por escrito una desviación</span></div>
      <div class="org-tronco"></div><div class="org-rama"></div>
      <div class="org-lineas">
        <div class="org-l"><h4>Producción</h4><div class="met">hace los kilómetros · instinto: no parar</div><ul><li>Superintendente de frente</li><li>Residente de colado</li><li>5 cabos de frente</li><li>Topógrafos</li></ul></div>
        <div class="org-l calidad"><h4>Calidad</h4><div class="met">protege los 50 años · instinto: parar</div><ul><li>Gerente de calidad</li><li>Jefe de laboratorio</li><li>Laboratoristas</li><li>Núcleos y mediciones</li></ul></div>
        <div class="org-l"><h4>Logística y equipo</h4><div class="met">alimenta la máquina · la continuidad</div><ul><li>Gerente de logística</li><li>Jefes de planta</li><li>Despachador de camiones</li><li>Jefe de mantenimiento y almacén</li></ul></div>
        <div class="org-l"><h4>Soporte</h4><div class="met">donde vive la pérdida más cara</div><ul><li>Responsable de liberaciones</li><li>Ingeniero de datos</li><li>Permisos</li><li>Administración</li></ul></div>
      </div>
      <div class="org-nota">Seguridad, igual que Calidad, queda fuera de la línea de Producción. Debajo de cada caja cuelgan los cabos, cuadrillas y operadores de la plantilla.</div>
    </div>
    <div class="dcards dos">
      ${tarjeta('La tensión es deliberada, y sana', 'Producción mide avance y su instinto es no parar; Calidad mide cumplimiento y su instinto es parar.', 'Funciona siempre que las dos tengan el mismo peso jerárquico.')}
      ${tarjeta('Logística es línea propia', 'La restricción real de una obra de pavimento no es la máquina: es la cadena de suministro.', 'Si el despachador reporta a un jefe de maquinaria que reporta al superintendente, la noticia de que el ritmo se cae llega tres niveles tarde. Aquí llega directo.')}
    </div>
    ${citaDoc('La prueba de que la estructura está bien hecha: ¿quién puede detener el colado, y a quién le pide permiso? Si la respuesta es «el laboratorista, con autorización del superintendente», está mal. Si es «el laboratorista, y no le pide permiso a nadie», está bien.')}

    ${h2Doc('e-perfiles', 'Contratar despacio y pagar bien', 'Los seis perfiles que deciden el resultado')}
    <p>Cada uno de estos seis puestos puede arruinar el proyecto solo. Los ${PERFILES_DOC.length} puestos tienen su manual completo de contratación e ingreso en <a href="#perfiles" data-ir="perfiles" style="color:var(--green);font-weight:700">Perfiles de puesto →</a></p>
    <div class="dcards dos">
      ${perfil('Director de Proyecto', 'Ingeniero civil con 12 años o más y al menos un corredor completo de pavimento rígido a cuestas. Importa que ya haya vivido un proyecto que se le complicó.', 'Del costo total del ciclo de vida, no del costo de obra. Su bono no puede atarse sólo a metros ni sólo a presupuesto: debe incluir la calidad de entrega.', 'El único que reanuda un colado detenido y el único que autoriza, por escrito, una desviación de la especificación.', 'Cuando Calidad detiene el colado, pregunta por qué antes de preguntar cuánto costó.')}
      ${perfil('Superintendente de frente', '8 a 15 años en campo dirigiendo varios frentes a la vez. Donde la experiencia vale más que el título: lee un frente completo desde la camioneta.', 'Del avance y de los colchones: es el dueño de los días de ventaja de cada frente, el único indicador que avisa antes de que algo pase.', '', 'Frena a propósito el colado cuando el drenaje se le acerca demasiado, en lugar de correr hasta chocar.')}
      ${perfil('Residente de colado', 'Ingeniero de 5 a 10 años, especializado en pavimento rígido. Trabaja de noche, permanentemente. Es el dueño del tren.', 'De los metros de la noche y, sobre todo, de los minutos de paro con su causa: el insumo de la junta de las 6:00.', 'Para todo el tren sin consultar a nadie. Reanudar ya no es suyo.', 'Conoce por nombre a los operadores de las cuatro máquinas críticas y sabe qué le duele a cada una.')}
      ${perfil('Gerente de calidad', 'El puesto más difícil de llenar y el más subestimado: 10 años o más en materiales y tecnología del concreto. Idealmente del lado de la supervisión o la dependencia, porque ya sabe decir que no.', 'De que lo construido sea lo especificado. Reporta al Director y su evaluación no incluye el avance: si su bono depende de metros, el puesto deja de existir.', 'Rechaza camiones, detiene colados, para la obra. No pide permiso.', 'El primer mes genera fricción con Producción. Si no la genera, no está haciendo su trabajo o ya lo capturaron.')}
      ${perfil('Gerente de logística', 'Perfil de operaciones o cadena de suministro, no de maquinaria; puede venir de la logística industrial. Su trabajo es un problema de flujo, no de fierro.', 'De que nunca falte concreto en el frente: el intervalo de dos minutos, el inventario de cemento y ceniza, y la disponibilidad de las cuatro máquinas críticas.', '', 'Tiene la ruta de acarreo cronometrada y sabe a qué hora se pone lento cada cruce.')}
      ${perfil('Despachador de camiones', 'El controlador de tráfico aéreo de la obra. Un buen despachador vale más que un camión adicional.', 'Del intervalo promedio entre descargas y de que ningún camión se salga del ciclo.', 'Manda sobre los choferes, incluidos los subcontratados: la cláusula va firmada en el contrato del transportista.', 'Ve el tablero y sabe quién va a llegar tarde antes de que llegue tarde.')}
    </div>
    <h3>Los demás puestos de estructura</h3>
    ${tablaDoc(['Puesto', 'Perfil', 'De qué responde'], [
      ['Jefe de laboratorio', 'Especialista en concreto, 8+ años, con criterio propio', 'Diseño de mezcla, ensayos, liberaciones'],
      ['Jefes de planta (2)', 'Operadores expertos de planta central, uno por turno', 'Dosificación, temperatura, continuidad'],
      ['Jefe de mantenimiento', 'Mecánico líder con experiencia en el tren de pavimentación', 'Disponibilidad de las 4 máquinas críticas'],
      ['Ingeniero de datos', 'Técnico híbrido: obra + sistemas', 'Tablero diario, sensores, modelo 3D, as-built'],
      ['Responsable de liberaciones', 'Gestión, negociación, trato con dependencias y propietarios', 'Los 20 km liberados por delante'],
      ['Jefe de seguridad', 'Certificado, con autoridad real', 'Frente nocturno, tránsito, incidentes'],
      ['Topógrafos (2)', 'Dominio de control 3D GNSS, no sólo estación total', 'Rasante, modelo, verificación'],
      ['5 cabos de frente', 'Mando de campo, uno por frente', 'Su cuadrilla, su colchón, su calidad'],
    ])}
    <div class="dcards dos">
      ${tarjeta('Obligatorio aquí: el ingeniero de datos', 'En una obra tradicional no existe: alguien llena un Excel los viernes. Aquí hace que el tablero se llene solo desde la planta, el GPS, la pavimentadora y los sensores.', 'Sin él, el tablero de doce indicadores se vuelve una tarea más que nadie hace después del mes tres.')}
      ${tarjeta('Obligatorio aquí: el responsable de liberaciones', 'Un puesto dedicado, con reporte directo, y no «algo que ve la administración».', 'Administra el riesgo más caro de todos: un frente detenido semanas por un predio, con toda la flotilla y la nómina corriendo.')}
    </div>

    ${h2Doc('e-autoridad', 'Escritas, firmadas y pegadas en el campamento', 'Las cinco reglas de autoridad')}
    <div class="dcards">
      ${tarjeta('<i>1</i>Cualquiera detiene el colado por seguridad', 'Cualquiera. Sin consecuencias, nunca, aunque se haya equivocado.')}
      ${tarjeta('<i>2</i>Calidad detiene por especificación', 'Sin pedir permiso: rechaza camiones, para el tren, suspende la noche.')}
      ${tarjeta('<i>3</i>Sólo el Director reanuda', 'Y deja por escrito qué cambió para poder reanudar.')}
      ${tarjeta('<i>4</i>Una desviación sólo existe si está firmada', 'Un acuerdo verbal a las 3 de la mañana no es una desviación: es un defecto.')}
      ${tarjeta('<i>5</i>El despachador manda sobre los choferes', 'Propios y subcontratados. Va en el contrato del transportista.')}
    </div>

    ${h2Doc('e-juntas', 'Tres conversaciones y nada más', 'La cadencia')}
    ${tablaDoc(['Cuándo', 'Quiénes', 'Cuánto', 'Para qué'], [
      ['<b>06:00 diario</b>', 'Las cuatro líneas + Director', '15 min, de pie', 'Cerrar la noche con el tablero: metros, paros con causa, colchones'],
      ['<b>17:30 diario</b>', 'Residente, jefe de planta, despachador, laboratorio', '10 min', 'Armar la noche: cuántos m³, cuántos camiones, temperatura esperada, riesgos'],
      ['<b>Lunes</b>', 'Director + gerentes + liberaciones', '45 min', 'Las dos semanas que vienen: colchones, liberaciones, mantenimiento mayor'],
    ])}
    <p>Todo lo demás se resuelve por radio o en el tablero. <b>Si hace falta una junta extra, casi siempre es que alguien no tiene la autoridad que su puesto debería darle.</b></p>

    ${h2Doc('e-contratar', 'Cada contratación atrae a la siguiente', 'Cómo se contrata')}
    <ol>
      <li><b>Primero el Director de Proyecto.</b> Él trae, valida y a veces ya conoce al resto.</li>
      <li><b>Luego Calidad, antes que Producción.</b> Contratar primero al superintendente envía el mensaje de quién manda; contratar a Calidad primero — y que participe en elegir al superintendente — envía el contrario.</li>
      <li><b>Superintendente y Gerente de logística</b>, en paralelo.</li>
      <li><b>Los cuatro operadores de las máquinas críticas.</b> Son escasos, tienen nombre y apellido en la región y se consiguen con meses de anticipación: buscarlos cuando llega la máquina es tarde.</li>
      <li><b>El resto, con la curva de arranque</b>, para que lleguen al tramo de prueba y aprendan ahí.</li>
    </ol>
    ${citaDoc('Contratar a quien ya vivió un colado que salió mal. Alguien que sólo ha visto obras exitosas no reconoce las señales tempranas de una que se está cayendo.', true)}

    ${h2Doc('e-gozo', 'La gente buena escoge dónde trabajar', 'Que sea un gozo trabajar aquí')}
    <p>Esta obra se gana en el turno de noche, a las tres de la mañana, con gente que decide bien sin que nadie la vea. Eso no se compra con un sueldo: se construye con cómo se trata a la gente todos los días. <b>Todo lo de abajo cuesta ${mxn(BIENESTAR_DIA)} por persona al día y el ${pct(cotiza.partidas.find(p => p[0] === 'Bienestar de la gente')[1] / cotiza.precio)} del precio de un corredor.</b></p>
    <div class="dcards">
      ${tarjeta('<i>Dinero</i>Puntual, claro y visible', 'Pago siempre el mismo día, sin excepciones. Recibo claro. El variable del mes se ve al día en el tablero. Fondo de ahorro y reparto de utilidades.', 'La confianza empieza por no tener que preguntar cuándo pagan.')}
      ${tarjeta('<i>Tiempo</i>Turnos predecibles y descanso de verdad', 'Rol publicado con dos semanas de anticipación. Ciclos de 12 días de trabajo y 4 de descanso, con transporte pagado a casa. La noche lleva 20 % de prima y nunca se dobla turno.', 'La gente cansada es la que echa la cubeta de agua.')}
      ${tarjeta('<i>Lugar</i>Un campamento donde dan ganas de volver', 'Habitaciones de máximo dos personas, con aire acondicionado, internet y lavandería. Tres comidas calientes, incluida la de medianoche, y sombra e hidratación en el frente.')}
      ${tarjeta('<i>Salud</i>Cuidados desde el primer día', 'IMSS completo desde el día uno y seguro de gastos médicos mayores para todos, no sólo para el mando. Chequeo médico al entrar y cada seis meses.', 'Cualquiera puede parar el colado por seguridad, sin consecuencias.')}
      ${tarjeta('<i>Crecer</i>Una escalera que se ve', 'Ayudante → operador → cabo → residente, con los requisitos escritos. Certificaciones pagadas en concreto, control 3D y seguridad. La academia vive en el tramo de prueba, y quien enseña cobra un bono por enseñar.', 'La formación se la llevan puesta; por eso se quedan.')}
      ${tarjeta('<i>Pertenecer</i>Cada kilómetro lleva su firma', 'Una placa con el nombre de la cuadrilla en cada tramo entregado. Los hitos se celebran con las familias. Y hay continuidad: contratos de varios años y prioridad en el siguiente corredor.', 'La continuidad le gana a un sueldo mayor: la gente buena vive saltando entre obras de nueve meses.')}
    </div>
    <h3>La escalera, con sus sueldos</h3>
    ${tablaDoc(['Escalón', 'Sueldo mensual', 'Lo que se pide para subir'], [
      ['Ayudante general', mxn(14000), 'Seis meses sin faltas y el curso de seguridad y calidad del tramo de prueba'],
      ['Operador', `${mxn(25000)}–${mxn(45000)}`, 'Certificación de la máquina y 500 horas limpias en la bitácora'],
      ['Cabo de frente', `${mxn(26000)}–${mxn(34000)}`, 'Dos años como operador, su cuadrilla con colchón sano y cero rechazos por agua'],
      ['Residente de colado', mxn(72000), 'Ingeniería y un corredor completo; se forma dentro'],
      ['Superintendente', mxn(95000), 'Varios frentes a la vez y el criterio para frenar a propósito'],
    ], ['', 'num', ''])}
    ${citaDoc('La velocidad la da la logística, la duración la da la calidad, y lo único que impide que la primera se coma a la segunda es que no cuelguen del mismo jefe.')}
  </div>`;
};
