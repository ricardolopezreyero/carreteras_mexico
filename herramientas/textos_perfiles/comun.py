# -*- coding: utf-8 -*-
# RLR · Lo que llevan todos los manuales de ingreso — Ricardo López Reyero
# Sale del manifiesto y del documento "Pavimento para 50 años" (docs/Proyecto_Pavimento_50_anios.md).

def carta(puesto, mision):
    return [
        'Te estás sumando a un proyecto que parte de una idea sencilla: vamos a estar en esta tierra por milenios, y para que nos vaya bien tenemos que estar cerca. Donde llega un buen camino llegan las personas, el trabajo, las familias y el comercio. Cada kilómetro que construimos acerca a dos ciudades, y lo hace durante cincuenta años.',
        'Aquí se construye una sola vez y bien hecho. Eso suena sencillo y no lo es: los errores de un pavimento no se ven cuando se cometen. Un concreto mal curado en junio se ve igual que uno bien curado durante ocho años; una cubeta de agua añadida a las tres de la mañana no aparece en ninguna foto. Por eso aquí la calidad no depende de la buena voluntad de nadie: está escrita, se mide y se respeta, empezando por ti.',
        f'Tu puesto, **{puesto}**, existe para esto: {mision[0].lower() + mision[1:]}',
        'Este documento tiene lo que necesitas saber para hacerlo bien desde la primera semana: quién buscamos que seas, lo que tienes que saber y cómo te vamos a formar. Léelo completo antes de tu primer turno. Al final hay una constancia que firmamos tú y tu jefe directo.',
        'Gracias por elegir construir con nosotros. Cada tramo que entreguemos llevará el nombre de su cuadrilla.',
    ]

DIA1 = ('Día 1', 'Inducción con Seguridad e higiene y tu jefe directo: por qué construimos así (el manifiesto), las cinco enfermedades y las tres reglas, las reglas de autoridad, el equipo de protección, el recorrido completo del frente de noche y de día, y la entrega de este documento. Alta en el IMSS y en el seguro médico desde este día.')

COMPROBACION = [
    '¿A qué temperatura máxima puede entrar el concreto a la obra?',
    'Llega un camión con la mezcla dura. ¿Qué se hace y qué no se hace nunca?',
    '¿Quién puede detener el trabajo por seguridad, y qué le pasa si se equivocó?',
    '¿Quién puede reanudar un colado detenido?',
    '¿De qué cinco cosas se muere una carretera?',
]

PROMETEMOS = [
    'Tu pago, siempre el mismo día, con un recibo claro. Tu variable del mes se ve al día en el tablero: sabes cuánto llevas ganado.',
    'Turnos publicados con dos semanas de anticipación. Ciclos de 12 días de trabajo y 4 de descanso, con transporte pagado a casa. Nunca se dobla turno; la noche lleva 20 % de prima.',
    'Campamento digno: habitaciones de máximo dos personas, aire acondicionado, internet y lavandería. Tres comidas calientes al día, incluida la de medianoche. Sombra e hidratación en el frente.',
    'IMSS completo desde el primer día y seguro de gastos médicos mayores para todos. Chequeo médico al entrar y cada seis meses.',
    'Capacitación pagada y certificaciones que te llevas puestas. Una escalera de crecimiento escrita, con sus requisitos. Si enseñas, cobras un bono por enseñar.',
    'Fondo de ahorro con aportación igual de la empresa y reparto de utilidades de ley.',
    'Continuidad: contratos de varios años y prioridad en el siguiente corredor. Y una placa con el nombre de tu cuadrilla en cada tramo que entreguemos.',
]
PEDIMOS = [
    'Llegar a tiempo y en condiciones: descansado, sin alcohol ni sustancias. Un frente nocturno no perdona el cansancio.',
    'Decir la verdad en el tablero y en la junta, sobre todo cuando la noticia es mala. Un problema dicho a tiempo cuesta minutos; escondido, cuesta semanas.',
    'Parar cuando algo está mal. Nadie te va a reclamar por detener el trabajo por seguridad o por calidad.',
    'Nunca añadir agua al concreto, ni permitir que otro lo haga.',
    'Cuidar al de al lado: su seguridad, su trabajo y su aprendizaje.',
    'Aprender, y cuando ya sepas, enseñar.',
]

ENFERMEDADES = [
    ['1 · Agua atrapada', 'El agua entra, se queda debajo de la losa, cada tráiler la bombea y lava el suelo: la losa queda colgando y se rompe.', 'Drenaje de borde real, base tratada y losa impermeable'],
    ['2 · Soporte desigual', 'Firme, blando, firme: la losa trabaja como tabla apoyada en tres puntos y se parte donde no tiene apoyo.', 'Compactación uniforme medida punto por punto'],
    ['3 · Contracción', 'El concreto se encoge al secarse; si está amarrado se agrieta en los primeros días, y la grieta dura 50 años.', 'Menos cemento, curado interno e interfaz que deja deslizar'],
    ['4 · Temperatura', 'El sol calienta la cara de arriba y la de abajo sigue fría: la losa se pandea todos los días.', 'Agregado calizo de baja expansión térmica'],
    ['5 · Corrosión', 'El acero se oxida, se hincha y revienta el concreto desde dentro.', 'Recubrimiento correcto, acero protegido y concreto poco permeable'],
]
CAPAS = [
    ['Subrasante compactada', '30 cm', '95 % Proctor modificado, verificado punto por punto: un suelo parejo'],
    ['Subbase drenante + geotextil', '15–20 cm', 'Saca el agua; con dren de borde perforado de 10 cm y salidas cada 60–100 m'],
    ['Base de concreto pobre', '15–20 cm', "f'c 100–150 kg/cm²: un apoyo que el agua no lava"],
    ['Interfaz bituminosa', '4–6 cm', 'Deja que la losa se encoja sin agrietarse'],
    ['Losa de concreto reforzado continuo (CRCP)', '27 cm', 'Sin juntas; acero #6 cada 15 cm a un tercio del espesor; carril colado de 4.20 m con la raya a 3.60 m y hombro de concreto amarrado'],
]
AUTORIDAD = [
    '**Cualquiera detiene el trabajo por seguridad.** Sin consecuencias, nunca, aunque se haya equivocado.',
    '**Calidad detiene por especificación** sin pedir permiso: rechaza camiones, para el tren, suspende la noche.',
    '**Sólo el Director de Proyecto reanuda** un colado detenido, y deja por escrito qué cambió.',
    '**Una desviación sólo existe si está firmada.** Un acuerdo de palabra a las 3 de la mañana no es una desviación: es un defecto.',
    '**El despachador manda sobre los choferes**, propios y subcontratados.',
]
SEGURIDAD = [
    'Equipo siempre puesto en el frente: casco, chaleco reflejante de alta visibilidad (clase 3 de noche), botas con casquillo, lentes y guantes; tapones cerca de la planta y de las cortadoras.',
    'Nunca caminar detrás de una máquina en reversa ni entre dos máquinas. Antes de acercarte a una máquina, busca los ojos del operador y espera su señal.',
    'Nadie entra a la zona de la pavimentadora ni pisa la losa fresca sin que el cabo lo autorice; para eso está la pasarela.',
    'De noche el frente es una zona abierta al tránsito: se respetan los conos, los señaleros y el plan de desvíos. Nadie cruza el carril abierto.',
    'Hidratación y descanso a la sombra en el día; cualquiera con mareo, dolor de pecho o golpe de calor se detiene y avisa.',
    'Todo casi-accidente se reporta el mismo día. Reportar no es acusar: es la forma de que el accidente de verdad no pase.',
]

def todos(D):
    D.p('**Construimos una sola vez.** Con la práctica común, una carretera de asfalto se reconstruye tres o cuatro veces en 50 años. La nuestra se construye una vez y sólo recibe mantenimiento menor. Todo lo que sigue existe para lograr eso.')
    D.h('Cómo se muere una carretera', 3)
    D.p('No se muere por exceso de peso. Se muere de cinco enfermedades, y casi siempre de la primera:')
    D.tabla(['Enfermedad', 'Qué pasa', 'La vacuna'], ENFERMEDADES, anchos=[3.5, 8, 5.5])
    D.h('Las cinco capas, de abajo hacia arriba', 3)
    D.tabla(['Capa', 'Espesor', 'Para qué'], CAPAS, anchos=[5, 2.2, 9.8])
    D.h('Las tres reglas que no se negocian', 3)
    D.viñetas(['**Se cuela de noche:** el concreto entra a la obra a 30 °C o menos. Agua con hielo, agregado sombreado y prehumedecido.',
               '**Cero agua añadida:** si un camión llega con la mezcla dura, se rechaza o se corrige con aditivo. Nunca con agua. Una cubeta facilita el trabajo veinte minutos y sube la permeabilidad de ese tramo cincuenta años.',
               '**El curado empieza de inmediato:** evaporación por debajo de 0.5 kg/m² por hora, rompevientos y membrana a doble dosis justo después de texturizar. Un curado descuidado pierde hasta 40 % de la resistencia, y el concreto se ve igual de bien.'])
    D.cita('Ninguna de las tres cuesta dinero: colar de noche cuesta logística, no echar agua es gratis y curar a tiempo cuesta atención.')
    D.h('Quién decide: las cinco reglas de autoridad', 3); D.viñetas(AUTORIDAD)
    D.h('Cómo se trabaja', 3)
    D.viñetas(['**De día se prepara, de noche se cuela, de madrugada se repara.** El tren cuela de 19:00 a 05:00: mil metros de dos carriles por noche, con un camión cada dos minutos.',
               '**Cinco frentes avanzan al mismo tiempo, escalonados:** terracería, drenaje, base, colado y acabado. Cada uno mantiene un colchón de al menos 3 días sobre el siguiente, y siempre hay 20 km de derecho de vía liberados por delante.',
               '**Tres juntas y nada más:** 06:00 cierre de la noche con el tablero (15 minutos, de pie); 17:30 se arma la noche (10 minutos); lunes, las dos semanas que vienen.',
               '**Calidad y Seguridad no reportan a Producción.** La tensión entre avanzar y parar es deliberada, y sana.'])
    D.h('Tu seguridad', 3); D.viñetas(SEGURIDAD)

def desempeno(kpi):
    return [f"Cuando tu KPI entra en alerta ({kpi['alerta'][0].lower() + kpi['alerta'][1:]}), tu jefe directo habla contigo esa misma semana: qué pasó, qué necesitas y qué va a cambiar. Queda por escrito.",
            'Si en el mes siguiente sigue en alerta, se abre un **plan de mejora de 30 días**: una meta semanal, capacitación adicional y alguien que te acompañe. Lo firman tú y tu jefe.',
            'Si al terminar el plan no se recupera, te podemos proponer otro puesto donde rindas mejor. Si no hay acuerdo, la relación de trabajo se termina **con la indemnización completa que marca la ley**.',
            'El bajo desempeño **nunca** es despido sin indemnización. Tampoco lo es un mal número cuya causa no depende de ti (una falla de planta, una lluvia, un predio sin liberar): eso lo aclara el tablero.']

DESPIDO_OBRA = [
    '**Añadir agua al concreto** en el frente, o pedir, permitir o esconder que otro lo haga.',
    '**Falsear un registro:** anotar un dato que no se midió, cambiar uno ya anotado, firmar algo que no se revisó o borrar información del tablero, de la planta o del laboratorio.',
    '**Tomar represalias** —amenazar, castigar, cambiar de turno o presionar— contra alguien que detuvo el trabajo por seguridad o por calidad, o que reportó un error o un casi-accidente.',
    '**Desactivar, quitar o puentear un dispositivo de seguridad**: alarmas de reversa, paros de emergencia, guardas, torretas, sensores o conos del plan de tránsito.',
    '**Ocultar un accidente**, una lesión o un daño a terceros, o pedirle a alguien que no lo reporte.',
    '**Operar una máquina o manejar un vehículo** sin la autorización o la licencia que pide este documento, o prestarle tu máquina a quien no la tiene.',
    '**Seguir colando o trabajando después de que Calidad o Seguridad detuvo**, o reanudar sin la autorización escrita del Director de Proyecto.',
    '**Aceptar o pedir dinero, regalos o favores** de proveedores, transportistas, subcontratistas o vecinos a cambio de algo de la obra.',
]
LEY47 = [
    'Engañar a la empresa al contratarte con documentos, referencias o capacidades falsas (se puede aplicar dentro de los primeros 30 días).',
    'Faltas de honradez, violencia, amenazas, insultos o malos tratos contra la empresa, sus directivos, sus familias o tus compañeros.',
    'Dañar a propósito máquinas, herramientas, materiales u obra; o dañarlos gravemente por un descuido tan grande que sea la única causa.',
    'Poner en peligro, por imprudencia o descuido que no tiene disculpa, la seguridad de la obra o de las personas que están en ella.',
    'Actos inmorales, hostigamiento o acoso sexual contra cualquier persona en el trabajo.',
    'Revelar información reservada de la empresa que perjudique a la empresa.',
    'Más de tres faltas de asistencia en 30 días sin permiso ni causa justificada.',
    'Desobedecer, sin causa justificada, a la empresa o a tu jefe en el trabajo para el que te contrataron.',
    'Negarte a usar el equipo de protección o a seguir los procedimientos para evitar accidentes y enfermedades.',
    'Llegar o trabajar en estado de ebriedad o bajo el efecto de drogas (salvo medicamento con receta, avisando antes de empezar el turno).',
    'Una sentencia de prisión que te impida trabajar, o dejar de tener, por tu causa, un documento que la ley exige para tu puesto (por ejemplo, la licencia federal).',
    'Otras faltas de la misma gravedad que las anteriores.',
]
NO_DESPIDO = [
    'Detener el trabajo por seguridad, aunque al final no hubiera peligro.',
    'Detener o rechazar por calidad cuando te toca hacerlo, aunque cueste metros.',
    'Reportar un error propio, un casi-accidente o una mala noticia. Al que avisa a tiempo se le agradece.',
    'Negarte a añadir agua al concreto, a firmar algo que no revisaste o a trabajar sin tu equipo de protección, aunque te lo pida un jefe.',
    'Una lesión o una enfermedad, ni tu embarazo, tu edad, tu origen, tu religión, tus opiniones o tu vida fuera de la obra.',
]
PROCESO = [
    'Toda falta grave se documenta el mismo día: qué pasó, cuándo, quién lo vio y qué evidencia hay (tablero, registro, foto).',
    'Antes de decidir, **se te escucha**: puedes dar tu versión y traer a quien quieras como testigo.',
    'Lo decide Recursos Humanos con tu jefe directo y el jefe de tu jefe; nunca una sola persona, y nunca en caliente.',
    'Si hay despido, recibes un **aviso por escrito** con la causa exacta y la fecha, como lo pide la ley, y se te paga lo que se te debe: días trabajados, parte proporcional de aguinaldo, vacaciones, prima vacacional y tu fondo de ahorro.',
]

COMUN = {'carta': carta, 'todos': todos, 'dia1': DIA1, 'comprobacion': COMPROBACION, 'prometemos': PROMETEMOS, 'pedimos': PEDIMOS,
         'desempeno': desempeno, 'despido_obra': DESPIDO_OBRA, 'ley47': LEY47, 'no_despido': NO_DESPIDO, 'proceso': PROCESO}
