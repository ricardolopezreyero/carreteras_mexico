/* ── Ejecución · Pavimento para 50 años: la especificación y su porqué — RLR ── */
PAGINAS.pavimento = () => {
  const enlace = (url, t) => `<a href="${url}" target="_blank" rel="noopener">${t}</a>`;
  const TX = 'https://www.cementx.org/solid_state_insights/crcp-in-texas', FHWA = 'https://international.fhwa.dot.gov/pubs/pl07027/llcp_07_03.cfm';
  const cal = (pos, tipo) => pos.map(x => `<i class="${tipo}" style="left:${x * 2}%"></i>`).join('');
  pagina.innerHTML = `<div class="doc">
    ${heroDoc('No estamos decidiendo cómo pavimentar. Estamos decidiendo <em>cuántas veces</em>.',
      'Con la práctica común en México, una carretera asfáltica se reconstruye 3 o 4 veces en 50 años. Una de concreto bien hecha se construye una vez y se le hace mantenimiento menor. El dinero total es parecido; lo que cambia es que en un caso se gasta una vez y en el otro para siempre, en obras que además cierran el camino cada década. Esta es la especificación de la segunda opción, para tránsito de tráileres en clima cálido extremo, con el detalle suficiente para construirla y para exigirla.')}
    ${indiceDoc([['p-seriedad', 'Por qué en serio'], ['p-muere', 'Cómo se muere'], ['p-concreto', 'Por qué concreto'], ['p-capas', 'Capa por capa'], ['p-losa', 'La losa'], ['p-mezcla', 'La mezcla'], ['p-mejoras', '8 mejoras'], ['p-no', 'Lo que no'], ['p-obra', 'Reglas de obra'], ['p-recorte', 'Si no alcanza'], ['p-50', '50 años'], ['p-garantia', 'Garantía'], ['p-region', 'Por región'], ['p-fuentes', 'Fuentes']])}

    ${h2Doc('p-seriedad', 'Antes de empezar', 'Por qué no estamos jugando con esto')}
    <p>Ninguna decisión de esta especificación es una preferencia técnica ni un lujo: <b>cada una bloquea una forma específica en la que las carreteras se mueren.</b> Y los errores en un pavimento <b>no se ven cuando se cometen</b>.</p>
    <p>Un concreto mal curado en junio se ve igual que uno bien curado, durante ocho años. Un espesor de 24 cm donde el proyecto decía 27 se ve igual en la foto de la entrega. Un dren tapado con tierra durante la obra se ve igual que uno que funciona. Cuando el daño se hace visible ya no existe la reparación: existe la reconstrucción, y la paga otra administración, otro presupuesto y otros usuarios.</p>
    ${citaDoc('El costo de equivocarse no lo paga quien se equivoca. Por eso la calidad no puede depender de la buena voluntad de nadie: tiene que estar escrita, medida y penalizada.')}

    ${h2Doc('p-muere', 'Lo más importante del documento', 'Cómo se muere una carretera')}
    <p>Las carreteras no se desgastan como un zapato. <b>Se mueren de cinco enfermedades</b>, y casi siempre de la primera. Todo lo demás de esta especificación son las cinco vacunas.</p>
    ${tablaDoc(['Enfermedad', 'Qué pasa en realidad', 'Cómo se ve por fuera', 'La vacuna'], [
      ['1 · Agua atrapada', 'El agua entra por una grieta y se queda debajo de la losa. Cada tráiler la bombea a presión y lava la tierra de abajo: se forma un hueco, la losa queda colgando y se rompe.', 'Grietas en esquinas, escalones entre losas, agua que brota al pasar un camión.', '<b>Drenaje de borde real + base tratada + losa impermeable</b>'],
      ['2 · Soporte desigual', 'El suelo no es blando: es desigual. Firme, blando, firme. La losa trabaja como una tabla apoyada en tres puntos y se parte por el que no tiene apoyo.', 'Grietas transversales que aparecen «sin razón», a intervalos irregulares.', '<b>Compactación uniforme medida punto por punto, no por promedio</b>'],
      ['3 · Contracción', 'El concreto se encoge al secarse. Si está amarrado a una base rígida no puede encogerse libre y se agrieta en los primeros días de vida. La grieta queda ahí 50 años.', 'Grietas finas tempranas que después se abren y se desportillan.', '<b>Menos cemento, curado interno, interfaz que deja deslizar</b>'],
      ['4 · Temperatura', 'El sol calienta la cara de arriba y la de abajo queda fría: la losa se pandea como una papa frita, se despega de su base y se rompe por el centro. Pasa todos los días: 18 mil veces en 50 años.', 'Grietas longitudinales al centro del carril, losas que «suenan» huecas.', '<b>Agregado calizo de baja expansión térmica</b>'],
      ['5 · Corrosión', 'El acero se oxida, el óxido ocupa más espacio y revienta el concreto desde dentro. Si era el acero que mantenía cerradas las grietas, las grietas se abren.', 'Manchas cafés, desportillamiento en juntas, grietas que crecen solas.', '<b>Acero galvanizado o inoxidable; pasajuntas de fibra de vidrio</b>'],
    ])}
    ${citaDoc('Ninguna de las cinco es «la carretera aguantó demasiado peso».')}
    <p>La intuición dice que una carretera se rompe porque pasan camiones muy pesados y que la solución es hacerla más gruesa. Es falso: <b>el espesor resuelve la carga, y la carga es el problema fácil</b>, el que sabemos calcular desde hace 60 años. Lo que mata a las carreteras es agua, suelo desigual, contracción, sol y óxido: cinco cosas que cuestan casi nada resolver bien y que no se resuelven con más concreto encima.</p>
    ${citaDoc('No estamos construyendo algo más grueso: estamos construyendo algo más seco, más parejo y más quieto.')}

    ${h2Doc('p-concreto', 'La decisión de material', 'Asfalto o concreto: por qué concreto')}
    <p>El asfalto no es un mal material: no es el correcto para esto, y la razón es una sola. <b>El asfalto se ablanda con el calor; el concreto no.</b> En un día de 45 °C la superficie negra pasa de 60 °C y el asfalto se vuelve una plastilina firme: un tráiler de 40 toneladas, despacio en una subida, deja su huella y el siguiente la hace más profunda. Eso es el ahuellamiento, y cuando llueve esas canaletas se llenan de agua: ahí empieza la enfermedad 1. El concreto está pegado con piedra hecha por reacción química; a 60 °C es igual de rígido que a 20 °C.</p>
    <h3>Los tres lugares donde se vuelve decisivo</h3>
    <div class="dcards">
      ${tarjeta('Subidas largas', 'El tráiler va a 30 km/h y planta su peso.')}
      ${tarjeta('Frenado y arranque', 'Casetas, cruces, semáforos y accesos.')}
      ${tarjeta('Patios de maniobra', 'El camión gira con el peso encima.')}
    </div>
    <p>Ahí un asfalto se ahuella en meses, no en años. <b>Ahí el concreto no es una preferencia: es la única opción honesta.</b></p>
    <h3>No es teoría: carreteras que ya lo probaron</h3>
    ${tablaDoc(['Evidencia', 'Qué dice'], [
      [enlace(TX, 'I-610, Houston'), 'Pavimento de concreto reforzado continuo <b>acercándose a 65 años de servicio</b>.'],
      [enlace(TX, 'Texas, promedio estatal'), 'Sus pavimentos de este tipo duran en promedio <b>39.5 años antes de la primera rehabilitación</b>, diseñados para 30.'],
      [enlace(FHWA, 'Quebec, Canadá'), 'De todo lo construido con estos criterios desde 1994, <b>menos del 1 % de las losas se ha agrietado</b>.'],
      [enlace(TX, 'Texas, costo comparado'), 'En un tramo real el concreto costó <b>menos</b> que el asfalto por unidad de superficie y necesitó mucho menos mantenimiento.'],
      [enlace(FHWA, 'Alemania, Austria, Bélgica, Países Bajos'), 'Diseñan sus autopistas de concreto a 30 años como <b>mínimo</b> de norma, y algunos a 40.'],
    ])}
    ${citaDoc('«El concreto es más caro.» Es más caro el día que se firma el cheque. Es más barato cualquier año después del doce.', true)}

    ${h2Doc('p-capas', 'La receta', 'Capa por capa, de abajo hacia arriba')}
    <p>Una carretera no es una plancha de concreto: son <b>cinco capas trabajando juntas</b>, y la de concreto es apenas la de arriba. Van en el orden en que se construyen, que también es el orden en que importan.</p>
    <div class="corte" role="img" aria-label="Corte transversal del pavimento">
      <div class="capa losa" style="min-height:64px"><b>Losa CRCP</b><span>concreto reforzado continuo, sin juntas · acero a un tercio del espesor</span></div><div class="cota">27 cm</div>
      <div class="capa interfaz" style="min-height:24px"><b>Interfaz bituminosa</b><span>deja deslizar la losa</span></div><div class="cota">4–6 cm</div>
      <div class="capa base" style="min-height:46px"><b>Base de concreto pobre</b><span>f'c 100–150 kg/cm²</span></div><div class="cota">15–20 cm</div>
      <div class="capa subbase" style="min-height:44px"><b>Subbase drenante + geotextil</b><span>con dren de borde de 10 cm</span><i class="dren" title="Dren de borde perforado"></i></div><div class="cota">15–20 cm</div>
      <div class="capa suelo" style="min-height:62px"><b>Subrasante compactada</b><span>95 % Proctor modificado, punto por punto</span></div><div class="cota">30 cm</div>
    </div>
    <div class="dcards dos">
      ${tarjeta('Capa 1 · El suelo: lo que se hace primero y casi nadie revisa', 'Compactar los 30 cm superiores al 95 % Proctor modificado, verificando <b>punto por punto</b>, no por promedio. <br><br><b>Arcilla expansiva</b> (índice plástico mayor a 20): estabilizar 30 cm con cal al 3–5 % o sustituir el material. <b>Suelos con sulfatos:</b> medirlos antes de estabilizar; si pasan de ~0.1 %, la cal o el cemento forman un mineral expansivo que levanta el pavimento años después.', 'La losa no necesita un suelo fuerte: necesita uno <b>parejo</b> (enfermedad 2). Un suelo uniformemente mediano es mejor que uno excelente con una bolsa blanda cada 40 m, porque ahí se va a partir la losa. El error de los sulfatos es caro y frecuente en zonas yesíferas del norte, y se evita con un ensayo de costo trivial.')}
      ${tarjeta('Capa 2 · El drenaje: el filtro que descarta todo lo demás', 'Subbase granular drenante de 15–20 cm envuelta en geotextil. <b>Tubo de dren perforado de 10 cm a lo largo del borde</b>, con salidas cada 60–100 m, cabezal visible y registro de limpieza. Rasante de la losa al menos 80 cm arriba del nivel más alto del agua subterránea. Bombeo transversal del 2 %, sin zonas planas.', 'Es la enfermedad 1 y la causa de la mayoría de los pavimentos destruidos del país: se puede tener el mejor concreto del mundo flotando sobre un charco. El dren tiene que ser <b>inspeccionable y limpiable</b>: uno que nadie puede revisar en el año 20 es, en la práctica, un dren que no existe.')}
      ${tarjeta('Capa 3 · La base rígida y la lámina que la deja deslizar', '15–20 cm de concreto pobre (f\'c 100–150 kg/cm², con apenas 120–150 kg de cemento por m³). Encima, <b>interfaz bituminosa de 4–6 cm</b> o doble riego de emulsión con geotextil.', 'La base, para que la losa se apoye en algo que no se lava ni se deforma: Bélgica usa 20 cm de concreto pobre y Austria 20 cm de base cementada. La interfaz — el detalle que casi nadie pone en México — deja que la losa se encoja al secarse sin agrietarse (enfermedad 3). Bélgica la usa desde 1991. Cuesta poco.')}
      ${tarjeta('Capa 4 · La losa: una carretera sin juntas', 'Losa de concreto reforzado continuo (CRCP) de <b>27 cm</b>, sin juntas. Detalle en el apartado siguiente.', 'Es la decisión más importante del diseño.')}
    </div>

    ${h2Doc('p-losa', 'La decisión más importante del diseño', 'La losa: concreto reforzado continuo, sin juntas')}
    <p>Una carretera de concreto normal lleva una junta cada 4.5 m: <b>más de 220 juntas por kilómetro</b>. Y las juntas son exactamente donde todo falla: por ahí entra el agua, ahí se escalonan las losas, ahí se desportilla el concreto y ahí hay que resellar cada 8 años, para siempre.</p>
    <p>El <b>CRCP</b> acepta el agrietamiento en lugar de pelear contra él: acero corrugado a lo largo de toda la carretera, colado sin juntas, y el concreto se agrieta solo cada 1 o 2 m. <b>El acero mantiene esas grietas cerradas y finas — menos de medio milímetro — toda la vida del pavimento</b>: una grieta así no deja pasar agua, no se escalona y no se desportilla. Cero juntas, cero resellado.</p>
    ${tablaDoc(['Elemento', 'Especificación', 'Por qué'], [
      ['Espesor', '<b>27 cm</b>', 'Rango europeo de autopista: 23–30 cm.'],
      ['Acero longitudinal', '<b>0.70 % del área</b>: varilla #6 (19 mm) cada 15 cm', 'Es el porcentaje que mantiene la grieta cerrada. Países Bajos 0.70 %, Bélgica 0.76 %, Quebec 0.70–0.76 %.'],
      ['Acero transversal', '#4 (12.7 mm) cada 90 cm', 'Sostiene el longitudinal en posición.'],
      ['Posición del acero', 'A un tercio del espesor desde arriba, sobre sillas, con 7 cm de recubrimiento mínimo', 'Cerca de donde nacen las grietas.'],
      ['Anclaje de los extremos', 'Vigas de anclaje terminal, o junta de viga ancha en puentes y accesos', 'Sin esto el pavimento «camina» longitudinalmente. <b>No es opcional.</b>'],
    ])}
    ${citaDoc('Si el contratista no tiene experiencia real en CRCP, no se le fuerza: losa con juntas de 30 cm, juntas cada 4.5 m y pasajuntas de 32 mm de diámetro y 45 cm de largo cada 30 cm en las huellas de rodada. Un CRCP mal ejecutado es peor que una losa con juntas bien hecha.', true)}
    <h3>La geometría que regala vida sin costar nada</h3>
    <div class="planta-carril" role="img" aria-label="Carril colado de 4.20 m con raya a 3.60 m">
      <div class="carril-vista">
        <i class="extra"></i><i class="raya"></i>
        <i class="llanta" style="left:8%;top:18px"></i><i class="llanta" style="left:62%;top:18px"></i>
        <i class="llanta" style="left:8%;top:44px"></i><i class="llanta" style="left:62%;top:44px"></i>
        <span class="etq" style="left:24%;top:26px">huellas del tráiler</span>
        <span class="etq" style="right:1%;top:26px">60 cm de más</span>
      </div>
      <div class="medidas"><span>eje de la carretera</span><span>raya de pintura a 3.60 m</span><span>borde de la losa a 4.20 m</span></div>
    </div>
    <p><b>Carril ensanchado: la losa se cuela de 4.20 m, pero la raya se marca a 3.60 m.</b> Es el detalle más rentable de todo el documento: el punto más débil de una losa es su borde libre, y la huella del tráiler pasa justo por ahí. Con 60 cm de más, el camión pisa el centro y no el borde; los esfuerzos y la fatiga bajan muchísimo. Cuesta 60 cm de concreto por metro lineal y compra años. Lo completa un <b>hombro de concreto amarrado</b> con barras del #4 cada 75 cm, que le da apoyo lateral a la losa en lugar de dejarla terminar en el aire.</p>

    ${h2Doc('p-mezcla', 'Casi todo va contra la intuición', 'La mezcla de concreto, explicada')}
    <div class="dcards dos">
      ${tarjeta('Menos cemento, no más', '<b>Máximo 350 kg de cementante por m³, ni un kilo más.</b> La resistencia se consigue acomodando bien las piedras — granulometría optimizada en tres tamaños — y usando poca agua.', 'Un concreto son piedras pegadas con pasta, y la pasta es la que se encoge y calienta la losa al fraguar: cada kilo extra es más contracción y más grietas (enfermedad 3). Un concreto sobre-cementado es más caro, más fuerte en la probeta y se agrieta antes en la carretera. Las tres cosas a la vez.')}
      ${tarjeta('Caliza, no grava de río', '<b>Caliza triturada</b> no reactiva, tamaño máximo 25–37.5 mm, 100 % triturada con al menos dos caras fracturadas, desgaste Los Ángeles ≤ 30 %, absorción ≤ 2.5 %, partículas planas o alargadas ≤ 10 %.', 'Con el sol, la losa se calienta arriba y abajo sigue fresca: se pandea (enfermedad 4). Cuánto depende casi por completo de la piedra: caliza y granito se expanden unas 4 unidades; cuarzo y pedernal, 7. Una losa de grava silicosa se mueve casi al doble. Y el norte de México tiene caliza de sobra: el insumo que más vida da es el más barato y cercano.')}
      ${tarjeta('El agua es el enemigo', '<b>Agua/cementante ≤ 0.42 y cero agua añadida en la obra.</b> La manejabilidad se consigue con superfluidificante, nunca con agua.', 'Toda el agua que sobra deja un poro al evaporarse, y los poros conectados son los túneles por donde entra todo lo que destruye el concreto. Bajar de 0.45 a 0.42 reduce la permeabilidad de forma desproporcionada: <b>esa cifra, más que la resistencia, define si el pavimento llega a 50 años.</b>')}
      ${tarjeta('Ceniza volante, y no para abaratar', '<b>Sustituir 20–25 % del cemento por ceniza volante clase F</b>, o usar cementos mexicanos CPC 40 RS/BRA o CPP, ya formulados para esto.', 'Apaga la reacción álcali-sílice — un gel que hincha y agrieta el concreto desde dentro, en red, a los 20 o 30 años —, cierra la porosidad a largo plazo y baja el calor de fraguado. Es el ingrediente que convierte 30 años en 50.')}
      ${tarjeta('Burbujas de aire a propósito', '<b>Aire incluido de 5–7 %</b>, con factor de espaciamiento ≤ 0.20 mm.', 'Porque en Torreón hiela: el agua del concreto se congela, se expande 9 % y revienta la superficie en escamas si no tiene a dónde ir. Las burbujas son ese lugar. Importa qué tan juntas están, no sólo cuántas: burbujas grandes y separadas no protegen nada.')}
    </div>
    <h3>La dosificación completa</h3>
    ${tablaDoc(['Parámetro', 'Valor', 'Qué defiende'], [
      ['Cementante total', '<b>320–350 kg/m³</b>', 'Contracción y agrietamiento temprano'],
      ['Sustitución', '<b>20–25 % ceniza volante clase F</b> o 35–50 % escoria', 'Reacción álcali-sílice, permeabilidad, calor'],
      ['Agua/cementante', '<b>≤ 0.42</b>', 'Permeabilidad: el parámetro que define la vida útil'],
      ['Agregado grueso', '<b>Caliza triturada</b> no reactiva, 25–37.5 mm', 'Pandeo térmico y desgaste'],
      ['No reactividad', 'Expansión <b>menor a 0.10 % a 16 días</b> (ASTM C1260)', 'La falla de los años 20–30'],
      ['Granulometría', 'Combinada optimizada en tres fracciones', 'Menos pasta con la misma resistencia'],
      ['Aire incluido', '<b>5–7 %</b>, espaciamiento ≤ 0.20 mm', 'Heladas de invierno'],
      ['Aditivo', 'Superfluidificante de policarboxilato, revenimiento 3–5 cm', 'Agua/cementante bajo sin agua de más'],
      ['Resistencia', '<b>MR 48 kg/cm² a 28 días</b>, en vigas', 'Carga de tráiler. Medir también a 90 días'],
      Object.assign(['Permeabilidad', '<b>Menor a 1,500 coulombs</b> o resistividad ≥ 20 kΩ·cm', 'Durabilidad medida, no prometida'], {act: true}),
      Object.assign(['Contracción', '≤ 400 microstrain a 28 días', 'Agrietamiento de nacimiento'], {act: true}),
    ])}
    <p class="nota">Los dos últimos renglones son los más importantes y los que casi nunca se piden en México: <b>especifican la durabilidad directamente</b> en lugar de suponerla a partir de la resistencia. Un concreto puede ser muy resistente y muy permeable a la vez: el resistente pasa la prueba y el permeable se muere en el año 22.</p>

    ${h2Doc('p-mejoras', 'De 50 a 75 años', 'Las ocho mejoras que existen hoy y casi no se usan')}
    <p>Todo lo anterior es un pavimento de 50 años. Estas ocho cosas lo llevan más lejos: tres cambian de categoría el resultado, dos hacen la obra más fácil de ejecutar y tres cuestan casi nada.</p>
    ${citaDoc('La número uno, para un clima como el nuestro: curado interno. El concreto carga su propia cantimplora, repartida en millones de puntos.')}
    <p>El problema de Torreón no es el calor: <b>es que el agua de curado se va antes de que el cemento la use</b>. Aun con membrana a doble dosis, el concreto se seca por dentro, se microagrieta desde el primer día, y esas grietas invisibles son la autopista por donde entra, 25 años después, lo que lo mata. La solución: sustituir <b>20–25 % de la arena por agregado ligero presaturado</b> — pómez o tezontle empapados de 24 a 72 horas antes —, que entrega el agua desde dentro mientras el cemento fragua. Cura de adentro hacia afuera.</p>
    <p>No es experimental: la FHWA de Estados Unidos lo tiene como innovación prioritaria y afirma que permite concretos que <b>pueden durar más de 75 años</b>; ya es práctica establecida en Texas, Nueva York, Indiana, Utah, Kansas, Ohio, Luisiana y Carolina del Norte. Y el agregado ligero que otros países fabrican en horno, <b>México lo tiene natural y barato</b>. La única exigencia es de control: medir la humedad del agregado en cada bachada; si entra seco, en lugar de dar agua la roba.</p>
    ${tablaDoc(['#', 'Mejora', 'Qué problema resuelve', 'Costo'], [
      ['1', '<b>Curado interno</b> con pómez o tezontle presaturado, 20–25 % de la arena', 'El curado que se evapora antes de servir. La mejora más grande disponible hoy.', 'Marginal'],
      ['2', '<b>Reductor de contracción</b> (1–2 % del cementante) y cemento expansivo tipo K en tramos críticos', 'El agrietamiento que ningún espesor evita. Con el punto 1 son sinérgicos, no alternativos.', 'Bajo'],
      ['3', '<b>Acero sin corrosión</b>: galvanizado o inoxidable revestido; pasajuntas de fibra de vidrio', 'Borra la enfermedad 5. Barras de fibra de vidrio evaluadas tras 18 y 20 años de exposición real no muestran degradación.', 'Unos puntos del acero'],
      ['4', '<b>Capa inferior de concreto compactado con rodillo (RCC)</b>: 22 cm + 5 cm convencional arriba', 'Cambia el proceso difícil por uno fácil: se coloca con pavimentadora de asfalto, sin cimbra ni acero ni revenimiento.', 'Neutro o menor'],
      ['5', '<b>Paneles prefabricados</b> en cruces, accesos y reparaciones futuras', 'Calidad de fábrica y obra sin cierres largos: Caltrans instala 150 m por noche contra 10 días de colado en sitio.', 'Mayor inicial, menor a 50 años'],
      ['6', '<b>Suavidad como requisito</b>: IRI de aceptación ≤ 1.0 m/km con bono y penalización', 'Un pavimento rugoso recibe más golpe de cada eje; los construidos más lisos conservan su suavidad más tiempo y duran más.', 'Redactar un párrafo'],
      ['7', '<b>Especificar por desempeño, no por ingrediente</b>', 'Si la ceniza volante escasea, la mezcla evoluciona sin reabrir el contrato.', 'Cero'],
      ['8', '<b>Sensores embebidos</b> de madurez, temperatura y humedad interna', 'Abrir a tráfico y cortar juntas con dato, no con calendario; mantenimiento por excepción desde un tablero.', 'Miles de pesos por km'],
    ], ['num', '', '', ''])}

    ${h2Doc('p-no', 'Para contestar a cualquier proveedor', 'Lo que NO vamos a usar, y por qué')}
    <p>La regla general: <b>para un activo que debe durar 50 años se exige evidencia de campo de al menos 30.</b> No basta con que funcione en el laboratorio; un material nuevo puede ser excelente y aun así no tener derecho a estar en esta obra.</p>
    ${tablaDoc(['Lo que van a ofrecer', 'Por qué no'], [
      ['Concreto autorreparable con bacterias', 'No hay historial de campo en pavimentos. Tecnología interesante, proyecto equivocado.'],
      ['Grafeno o nanomateriales', 'Resultados de laboratorio sin escala industrial ni cadena de suministro confiable. No en obra pública.'],
      ['Geopolímeros o cementos activados alcalinamente', 'Muy durables en probeta, sin historial largo en pavimento, con riesgos de retracción y eflorescencia.'],
      ['Humo de sílice en dosis alta, solo', 'Baja la permeabilidad pero <b>sube</b> la contracción. Sólo acompañado de curado interno; nunca solo.'],
      ['Fibras para reducir espesor o sustituir el acero', 'Las fibras controlan microfisuración: no son estructura ni reemplazan al refuerzo.'],
      ['Aditivos «impermeabilizantes integrales»', 'La relación agua/cemento y el curado ya hacen ese trabajo. Lo demás es reventa.'],
      ['Más cemento', 'El impulso equivocado más común y más caro: más cemento = más contracción = más grietas.'],
    ])}
    ${citaDoc('«Ahí no pasan tantos camiones, ahí le bajamos.» El espesor sí se ajusta por tránsito: es ingeniería normal. Lo que no se ajusta nunca es el drenaje, la uniformidad del suelo, la relación agua/cemento y el curado, porque no dependen del peso de los camiones: dependen del agua, del suelo y del sol.', true)}

    ${h2Doc('p-obra', 'Donde se pierde la mitad de la vida útil', 'Construcción: las tres reglas que no se negocian')}
    <p>Se puede tener la mezcla perfecta y arruinarla en una tarde de junio, de forma invisible: nada de esto se nota en la foto de la entrega.</p>
    <div class="dcards">
      ${tarjeta('<i>1</i>Se cuela de noche', 'El concreto entra a la obra <b>a 30 °C o menos</b>: colado nocturno o de madrugada, agua con hielo o enfriada, agregado sombreado y prehumedecido, tuberías expuestas pintadas de blanco.', 'Un concreto que entra caliente fragua más rápido de lo que se puede manejar, desarrolla menos resistencia y se agrieta de nacimiento por contracción plástica.')}
      ${tarjeta('<i>2</i>Cero agua añadida', 'Si llega un camión con la mezcla dura, <b>se rechaza o se maneja con aditivo. Nunca con agua.</b> Escrito, explicado en la plática de arranque y respaldado con autoridad real para rechazar el camión.', 'Una cubeta de agua facilita el trabajo veinte minutos y sube la permeabilidad de ese tramo cincuenta años. Es la decisión de mayor daño por segundo en una obra, y casi siempre la toma alguien con buena intención.')}
      ${tarjeta('<i>3</i>El curado empieza de inmediato', 'Evaporación <b>por debajo de 0.5 kg/m² por hora</b>, con rompevientos y membrana de curado a <b>doble dosis</b>, aplicada inmediatamente después de texturizar, no al terminar el turno.', 'En clima caliente, un curado descuidado hace perder hasta 40 % de la resistencia, y el concreto se ve igual de bien.')}
    </div>
    <h3>El resto del control de obra</h3>
    <ul>
      <li><b>Pavimentadora de cimbra deslizante</b> con control 3D sin hilos; acero sobre sillas en CRCP, o insertadora de pasajuntas en losa con juntas.</li>
      <li><b>Corte de juntas</b> (si hay juntas) en la ventana de 4 a 12 horas, a un cuarto del espesor, con análisis de la ventana real del día.</li>
      <li><b>Aceptación:</b> espesor por núcleos extraídos con penalización económica, resistencia por vigas y aire medido por camión.</li>
      <li><b>No abrir a tráfico</b> antes de MR 30 kg/cm², verificado por método de madurez.</li>
    </ul>
    ${citaDoc('Ninguna de las tres reglas cuesta dinero: colar de noche cuesta logística, no echar agua es gratis y curar a tiempo cuesta atención. Son las más baratas del proyecto y las que más vida deciden.')}

    ${h2Doc('p-recorte', 'Decidido en frío, antes de la junta', 'Si el presupuesto no alcanza')}
    <p>Va a pasar. El orden se decide antes, no en la junta donde hay que recortar 15 % para el viernes. La lista va de lo intocable a lo prescindible: <b>se recorta desde abajo, nunca desde arriba.</b></p>
    <div class="escalera">
      ${[['1', 'int', 'Intocable', 'Drenaje de borde y uniformidad del suelo', 'Sin esto, todo lo demás es decoración. Son las enfermedades 1 y 2.'],
         ['2', 'int', 'Intocable', 'Agua/cemento ≤ 0.42, cementante ≤ 350 kg, curado a tiempo', 'Es gratis: especificar bien y supervisar. Recortar aquí es regalar años por cero pesos de ahorro.'],
         ['3', 'int', 'Intocable', 'Agregado calizo no reactivo', 'En el norte de México es el disponible y barato: no hay ahorro real en cambiarlo.'],
         ['4', 'gratis', 'Casi gratis', 'Carril ensanchado a 4.20 m', '60 cm de concreto por metro lineal a cambio de años de vida.'],
         ['5', 'alto', 'Alto valor', 'Base de concreto pobre + interfaz bituminosa', 'Protege contra bombeo y contra agrietamiento por contracción.'],
         ['6', 'alto', 'Alto valor', 'Curado interno con pómez presaturada', 'Costo marginal, el beneficio más grande de la lista de mejoras.'],
         ['7', 'neg', 'Negociable', 'CRCP en lugar de losa con juntas y pasajuntas', 'Sin contratista con experiencia real, la losa con juntas bien hecha es la decisión correcta.'],
         ['8', 'neg', 'Negociable', 'Sensores e instrumentación', 'Se pueden instalar sólo en tramos representativos.'],
         ['9', 'pres', 'Prescindible', 'Doble capa con agregado expuesto', 'Lujo verdadero: se justifica con volumen grande, no siempre.'],
         ['10', 'pres', 'Prescindible', 'Paneles prefabricados en todo el trazo', 'Se reservan para cruces y accesos, donde sí son insustituibles.'],
      ].map(([n, c, e, q, p]) => `<div class="escalon"><div class="n">${n}</div><div class="q">${q}<br><span class="chip-c ${c}" style="margin-top:6px">${e}</span></div><div class="p">${p}</div></div>`).join('')}
      <div class="recorta">↑ Se recorta desde el renglón 10 hacia arriba. Nunca desde el 1.</div>
    </div>
    <h3>La trampa que hay que evitar</h3>
    <p>El recorte que siempre se propone primero es <b>bajar el espesor</b>, porque es el más fácil de calcular y el más visible. Y es el equivocado: el espesor resuelve la carga, que es el problema fácil. Bajar de 27 a 24 cm cuesta algo de vida por fatiga; eliminar el dren de borde para pagar esos tres centímetros cuesta <b>el pavimento completo</b>.</p>
    ${citaDoc('Una losa de 24 cm bien drenada, bien curada y con buen agregado le gana a una de 30 cm mal drenada. Mucho. Y además es más barata.')}

    ${h2Doc('p-50', 'Mirar el calendario, no el precio', 'Qué pasa en 50 años')}
    <div class="cal" role="img" aria-label="Intervenciones a 50 años por tipo de pavimento">
      <div class="cal-fila"><b>Asfalto<span>4 obras completas</span></b><div class="cal-linea">${cal([6, 18, 30, 42], 'barra')}${cal([12, 24, 36, 48], 'rombo')}</div></div>
      <div class="cal-fila"><b>Concreto con juntas<span>rehabilitación a los 25–35</span></b><div class="cal-linea">${cal([9, 18, 27, 38, 47], 'barra')}${cal([30], 'rombo')}</div></div>
      <div class="cal-fila"><b>Esta especificación<span>CRCP · 50+ años</span></b><div class="cal-linea"><i class="vida" style="width:100%"></i>${cal([25, 40], 'barra')}</div></div>
      <div class="cal-eje"><div></div><div>${[0, 10, 20, 30, 40, 50].map(x => `<span style="left:${x * 2}%">año ${x}</span>`).join('')}</div></div>
      <div class="cal-ley"><span><i style="width:12px;height:12px;transform:rotate(45deg);background:#ff9b8a"></i>obra que cierra el camino</span><span><i style="width:3px;height:14px;background:#9fc0ff"></i>mantenimiento menor, de semanas</span><span><i style="width:18px;height:8px;border-radius:4px;background:rgba(86,239,159,.5)"></i>servicio sin reconstruir</span></div>
    </div>
    <p class="nota">Esquema con los rangos del documento. <b>Asfalto:</b> reparaciones cada 10–15 años y reconstrucción en ese mismo horizonte. <b>Concreto con juntas:</b> rehabilitación entre los 25 y 35 años, más resellado de sus 220 juntas por km cada 8–10 años. <b>CRCP:</b> Texas promedia 39.5 años antes de la primera rehabilitación con diseños para 30; el I-610 de Houston se acerca a 65, y con curado interno la FHWA habla de más de 75. Su mantenimiento en 50 años: unos pocos parches y uno o dos esmerilados de diamante.</p>
    <h3>El costo, dicho sin adornos</h3>
    <p><b>Sí, esta carretera cuesta más el día que se firma</b>: alrededor de 20–30 % más que un asfalto equivalente, y algo más que un concreto estándar. Pero hay un dato de campo: en un tramo real de Texas (US 287/US 81) el concreto reforzado continuo salió <b>más barato que el asfalto</b> por unidad de superficie — 42.65 contra 45.57 dólares por yarda cuadrada — y con mucho menos mantenimiento. Lo que no admite discusión es el resto del calendario: las cuatro obras del asfalto también hay que pagarlas, a precios de 2038, 2050 y 2062, más el camino cerrado, los desvíos y los kilómetros que los tráileres recorren sobre pavimento malo.</p>

    ${h2Doc('p-garantia', 'Gobernanza, no ingeniería', 'Cómo se garantiza que llegue a los 50 años')}
    <p>Con esta especificación el material puede durar 75 años. Lo que decide si los dura son tres cosas que no dependen del diseño:</p>
    <ol><li>Que el dren de borde siga funcionando en el año 20.</li><li>Que alguien saque núcleos y mida el espesor real, con poder de rechazar.</li><li>Que en junio se cuele de noche, aunque el contratista quiera terminar antes.</li></ol>
    <h3>Lo que hay que escribir en el contrato</h3>
    <div class="dcards">
      ${tarjeta('Especificación por desempeño', 'Se exige permeabilidad, expansión, contracción y suavidad medidas, no una lista de insumos.')}
      ${tarjeta('Garantía de 5 a 7 años', 'A cargo del contratista, con fianza. Cambia por completo quién carga el riesgo de un atajo.')}
      ${tarjeta('Aceptación por núcleos', 'Con penalización económica por espesor y densidad faltantes. No por acta firmada.')}
      ${tarjeta('Bono y penalización por suavidad', 'El IRI alinea al contratista con la durabilidad en lugar de con la prisa.')}
      ${tarjeta('Conservación plurianual', 'Para que el dren tenga dueño en el año 20 y no sólo en el año 1.')}
    </div>
    ${citaDoc('La palanca que rinde más que cualquier aditivo: destinar alrededor del 5 % del presupuesto a supervisión independiente y laboratorio con autoridad real de rechazo. Es la única medida que protege a todas las demás.')}
    <h3>El tramo de prueba</h3>
    <p>Antes de comprometer el corredor completo, <b>500 metros con tres variantes instrumentadas</b>: una con curado interno, una sin él y una con capa inferior de RCC. Un año de datos reales — en este clima, con estos agregados, con este contratista — y se escala la que ganó. Convierte una decisión de fe en una con evidencia, y da el argumento irrefutable ante quien tenga que firmar el resto.</p>
    <h3>Y después: mantenimiento por excepción</h3>
    <p>Ningún pavimento es «olvidarse de él». Lo que compra esta especificación es que 50 años de mantenimiento se reduzcan a unos pocos parches de losa y uno o dos esmerilados de diamante: semanas de obra, no años. Y con los sensores, el mantenimiento deja de ser una inspección periódica y se vuelve una alerta: <b>el activo avisa qué tramo necesita atención, y cuándo.</b></p>

    ${h2Doc('p-region', 'Para toda la red del mapa', 'Qué se ajusta por región y qué no')}
    <p>El documento está escrito para La Laguna: calor extremo en verano y heladas en invierno. Llevado a los ${fmt(M[4].km)} km de corredores del modelo, esto es lo que cambia por región y lo que no, siguiendo la misma regla del documento: se ajusta lo que depende del tránsito o del clima, nunca lo que depende del agua, del suelo y del sol.</p>
    ${tablaDoc(['Requisito', '¿Se ajusta?', 'Cómo'], [
      ['Espesor de la losa', 'Sí, por corredor', 'Con el tránsito pesado de cada corredor, dentro del rango de autopista de 23–30 cm; referencia de 27 cm.'],
      ['Aire incluido 5–7 %', 'Sí, por clima', 'Obligatorio donde hiela (altiplano, norte y sierras). Donde nunca hiela lo decide el laboratorio, porque su razón de ser son las heladas.'],
      ['Colado nocturno', 'El horario sí; la regla no', 'El concreto entra a 30 °C o menos en cualquier región; el horario lo dicta la temperatura del lugar.'],
      ['Agregado calizo', 'No', 'Mismos límites en cada banco: no reactivo, Los Ángeles ≤ 30 %, absorción ≤ 2.5 %.'],
      ['Curado interno', 'Sí, por logística', 'Pómez y tezontle abundan en el centro volcánico del país; lejos de ahí, el tramo de prueba decide si el acarreo lo justifica.'],
      ['Arcilla expansiva y sulfatos', 'Se miden en todo el trazo', 'Estabilizar con cal sólo después de medir sulfatos.'],
      Object.assign(['Drenaje, uniformidad del suelo, agua/cemento ≤ 0.42, curado a tiempo', '<b>Nunca</b>', 'No dependen del peso de los camiones: dependen del agua, del suelo y del sol, que son iguales en todo el trazo.'], {act: true}),
    ])}

    ${h2Doc('p-fuentes', 'Todas las cifras vienen de aquí', 'Fuentes')}
    <ul>
      <li>${enlace(TX, 'CRCP in Texas — Cement Council of Texas')}</li>
      <li>${enlace(FHWA, 'Long-Life Concrete Pavements in Europe and Canada — FHWA')}</li>
      <li>${enlace('https://www.fhwa.dot.gov/innovation/everydaycounts/edc_7/enhancing_epic.cfm', 'Enhancing Performance with Internally Cured Concrete (EPIC²) — FHWA')}</li>
      <li>${enlace('https://ucprc.ucdavis.edu/pdf/CTE%20-%20KOHLER.pdf', 'Coefficient of Thermal Expansion of Concrete Pavements — UCPRC')}</li>
      <li>${enlace('https://www.cptechcenter.org/wp-content/uploads/2018/03/two-lift.pdf', 'Two-Lift Portland Cement Concrete Paving — CP Tech Center')}</li>
      <li>${enlace('http://rccpavementcouncil.org/what-is-roller-compacted-concrete-pavement/', 'Roller Compacted Concrete Pavement — RCC Pavement Council')}</li>
      <li>${enlace('https://www.volpe.dot.gov/news/benefits-outweigh-costs-precast-concrete-pavement', 'Benefits Outweigh Costs for Precast Concrete Pavement — USDOT Volpe Center')}</li>
      <li>${enlace('https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-HRT-05-069.pdf', 'Achieving a High Level of Smoothness in Concrete Pavements — FHWA-HRT-05-069')}</li>
      <li>${enlace('https://www.sciencedirect.com/science/article/pii/S2214509521000097', 'Condition assessment of GFRP rebar after 18 years of service life')}</li>
      <li>${enlace('https://insulativeconcrete.com/PDFs/Pumice_Aggregates-InternalWaterCuring.pdf', 'Pumice Aggregates for Internal Water Curing — Lura')}</li>
      <li>${enlace('https://micrs.sct.gob.mx/images/DireccionesGrales/DGST/Manuales/Manual_de_seleccion_de_asfaltos/DGST_Manual_Seleccion_de_asfalto.pdf', 'Manual de selección de asfaltos — SICT/DGST')}</li>
      <li>${enlace('https://conpreconcretos.com/blog/concreto-mr-pavimentos.html', 'Concreto MR para pavimentos — Conpre Concretos')}</li>
    </ul>
  </div>`;
};
