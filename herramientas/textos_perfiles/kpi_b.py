# -*- coding: utf-8 -*-
# RLR · KPI principal y motivos de despido — Ricardo López Reyero
K = {}

# ───────────── Frente 4 · Colado (d_colado.py) ─────────────

K['Cabo de colado'] = dict(
    kpi=dict(
        nombre='Minutos de paro atribuibles a la cuadrilla',
        meta='Menos de 10 minutos por noche, con cero casos de agua añadida',
        mide='El registro de paros del tren (hora de inicio, fin y causa) que el cabo entrega a las 05:00; lo valida el Residente de colado en la junta de las 06:00, cada día.',
        alerta='Más de 10 minutos atribuibles a la cuadrilla en 3 noches de un mismo mes',
    ),
    despido=[
        'Permitir o tolerar que alguien añada agua al concreto en el frente, o no detener el tren al enterarse.',
        'Borrar, esconder o cambiarle la hora o la causa a un paro en el registro de la noche.',
        'Mandar colar sobre acero que Calidad no ha liberado, o reanudar un colado detenido sin la orden escrita del Director de Proyecto.',
        'Ordenar a alguien pisar la losa fresca o meterse entre dos máquinas en marcha, o dejar un puesto de seguridad del tren sin cubrir a sabiendas.',
        'Reprender, cambiar de puesto o mandar a casa a quien detuvo el tren por seguridad o por calidad.',
    ],
)

K['Operador de pavimentadora'] = dict(
    kpi=dict(
        nombre='IRI del tramo que coló',
        meta='1.0 m/km o menos, promedio de cada tramo medido',
        mide='El Operador de perfilómetro mide el tramo colado anteanoche y lo reporta por operador en la junta de las 06:00; lo revisa el Cabo de colado cada día.',
        alerta='Más de 1.0 m/km en 3 tramos de un mismo mes, o cualquier tramo arriba de 1.3 m/km',
    ),
    despido=[
        'Operar la pavimentadora con el control 3D apagado, puenteado o sin verificarlo contra un punto de control, y seguir colando.',
        'Acelerar la máquina por encima de la velocidad indicada para recuperar metros después de un paro, en contra de la instrucción del cabo.',
        'Anular un paro de emergencia, una alarma o un dispositivo de seguridad de la máquina.',
        'Ocultar una junta fría, una falta de espesor o una caída de orilla que vio, o no anotarla en la bitácora.',
        'Operar la pavimentadora sin la certificación vigente exigida para ese equipo, o prestarle los mandos a alguien que no la tiene.',
    ],
)

K['Ayudante de pavimentadora'] = dict(
    kpi=dict(
        nombre='Avisos a tiempo confirmados por el operador',
        meta='100 % de las fallas de sensores, orilla y cabeza de concreto avisadas antes de que salgan en la medición',
        mide='El operador confirma cada aviso por radio y queda en la bitácora de la máquina; lo cruza el Cabo de colado contra los defectos de orilla y espesor que reporta Calidad, cada semana.',
        alerta='Un defecto de orilla, sensor o cabeza de concreto que no se avisó, dos veces en un mismo mes',
    ),
    despido=[
        'Callar a sabiendas un sensor golpeado, una caída de orilla o una falta de barras de amarre, y dejar que la máquina siga colando.',
        'Mover, ajustar o limpiar un sensor del control 3D sin avisar al operador, y ocultarlo después.',
        'Caminar detrás de la máquina o entre la máquina y un camión después de haber sido advertido por escrito.',
        'Anotar como insertadas barras de amarre que no se colocaron.',
    ],
)

K['Operador de colocadora-esparcidora'] = dict(
    kpi=dict(
        nombre='Paros de pavimentadora por falta de reparto',
        meta='Cero paros por reparto, con descarga promedio de 6 minutos o menos por camión',
        mide='El registro de paros del tren y la hora de entrada y salida de cada camión que anota el Controlador de descarga; lo revisa el Cabo de colado a las 05:00, cada noche.',
        alerta='Un paro atribuible al reparto en 2 noches de un mismo mes, o descarga promedio arriba de 7 minutos en 3 noches',
    ),
    despido=[
        'Permitir que un chofer añada agua a la olla para que el concreto baje por la banda, o pedírselo.',
        'Echar concreto sobre el acero y mover sillas o barras, y seguir sin avisar al cabo.',
        'Operar la colocadora sin la certificación exigida, o anular sus dispositivos de seguridad o paro de emergencia.',
        'Recibir un camión que el laboratorista no liberó.',
    ],
)

K['Operador de textura y curado'] = dict(
    kpi=dict(
        nombre='Metros sin curar a tiempo',
        meta='Cero metros, con membrana dentro de la doble dosis cada noche',
        mide='El consumo de membrana contra los metros cuadrados colados, anotado por el operador y revisado por el laboratorista de turno; lo valida Calidad en la revisión de la mañana, cada día.',
        alerta='Cualquier tramo sin curar a tiempo, o consumo de membrana bajo la doble dosis en 2 noches de un mismo mes',
    ),
    despido=[
        'Bajar la dosis de membrana a propósito para que alcance, o diluirla.',
        'Anotar un consumo de membrana o unos metros curados que no corresponden a lo aplicado.',
        'Dejar a sabiendas un tramo, un costado o una cabecera sin curar y no avisarlo al cabo.',
        'Tapar boquillas que no tiran o ocultar una falla de la máquina para no parar.',
    ],
)

K['Cuadrilla de acero (fierreros)'] = dict(
    kpi=dict(
        nombre='Tramos de acero liberados a la primera',
        meta='95 % o más de los tramos liberados por Calidad a la primera revisión, con 2 días de acero adelante del tren',
        mide='Las actas de liberación de acero de Calidad y el cadenamiento de acero colocado; las revisa el Cabo de colado en la junta de las 06:00, cada día.',
        alerta='Menos de 90 % liberado a la primera en un mes, o menos de 2 días de acero adelante en 3 días del mismo mes',
    ),
    despido=[
        'Quitar, cortar o mover acero ya liberado por Calidad sin avisar, o volver a armar un tramo rechazado y darlo por revisado.',
        'Dejar a propósito sillas sueltas, traslapes cortos o varillas faltantes para ir más rápido, y ocultarlo.',
        'Raspar o dañar el acero protegido y taparlo sin reportarlo.',
        'Levantar cargas de acero con el equipo de izaje sin la autorización o las eslingas exigidas, poniendo en riesgo a la cuadrilla.',
    ],
)

K['Acabador'] = dict(
    kpi=dict(
        nombre='Orillas y cabeceras aceptadas por Calidad',
        meta='100 % aceptadas a la primera, con cero casos de agua añadida',
        mide='La revisión de Calidad de orillas y cabeceras al cierre de cada noche; la registra el laboratorista y la revisa el Cabo de colado a las 05:00.',
        alerta='Una orilla o cabecera rechazada en 2 noches de un mismo mes',
    ),
    despido=[
        'Echar agua sobre la superficie para cerrarla o para que la mezcla se deje trabajar.',
        'Tapar o disimular un defecto repetido de la máquina en lugar de avisar al cabo y al laboratorista.',
        'Pisar la losa fresca teniendo la pasarela disponible, después de haber sido advertido por escrito.',
    ],
)

K['Controlador de descarga'] = dict(
    kpi=dict(
        nombre='Camiones registrados y avisados al laboratorista',
        meta='100 % de los camiones con hora, ticket y aviso al laboratorista antes de descargar',
        mide='La hoja de registro de camiones cruzada con el registro de ensayos del laboratorista y el GPS del despacho; la revisa el Cabo de colado a las 05:00, cada noche.',
        alerta='Un camión sin registro o sin aviso al laboratorista en 2 noches de un mismo mes',
    ),
    despido=[
        'Dejar descargar un camión sin avisar al laboratorista, o uno que el laboratorista rechazó.',
        'Ver a un chofer añadir agua y no detener la descarga ni reportarlo.',
        'Anotar horas de llegada o de salida inventadas, o cambiar un ticket.',
        'Guiar una reversa parado detrás del camión, o dejar pasar a alguien por detrás, después de haber sido advertido por escrito.',
    ],
)

K['Señalero · control de tránsito'] = dict(
    kpi=dict(
        nombre='Accidentes e incidentes con terceros',
        meta='Cero en su zona, con señalamiento completo en el 100 % de las revisiones',
        mide='Las revisiones de señalamiento y los reportes de incidentes y casi-accidentes de Seguridad e higiene; los revisa el jefe de Seguridad e higiene cada noche y en la junta semanal.',
        alerta='Un faltante de señalamiento en 2 revisiones de un mismo mes, o un casi-accidente no reportado el mismo día',
    ),
    despido=[
        'Abandonar su puesto frente al tránsito sin relevo.',
        'Quitar, apagar o dejar incompleto el señalamiento del plan autorizado a sabiendas.',
        'Ocultar o no reportar un accidente o casi-accidente con un vehículo en su zona.',
        'Dejar entrar un vehículo ajeno al carril de trabajo o dejar cruzar a la cuadrilla por el carril abierto sin control.',
        'Usar el celular o dormirse en el puesto con el frente abierto al tránsito.',
    ],
)

K['Operador de planta'] = dict(
    kpi=dict(
        nombre='Camiones rechazados por causa de planta',
        meta='Cero por noche, con el concreto a 30 °C o menos a la salida',
        mide='El registro de rechazos del laboratorista con su causa y la temperatura del ticket de cada camión; lo revisa el Jefe de planta a las 06:00, cada día.',
        alerta='Un camión rechazado por causa de planta en 2 noches de un mismo mes',
    ),
    despido=[
        'Añadir agua a una carga por encima de la dosificación aprobada, o cambiar la fórmula del laboratorio sin autorización escrita.',
        'Apagar, alterar o saltarse el registro automático de la planta, o cambiar un dato ya registrado.',
        'Mandar a sabiendas un camión fuera de especificación o por encima de 30 °C, o poner en el ticket una temperatura o una hora falsa.',
        'Operar la planta o el cargador sin bloqueo y etiquetado al meterse a una banda, tolva o mezcladora.',
    ],
)

K['Laboratorista de turno'] = dict(
    kpi=dict(
        nombre='Camiones aceptados fuera de especificación',
        meta='Cero, con 100 % de los camiones con temperatura y ticket revisados',
        mide='El registro en tableta de ensayos y rechazos, auditado contra los tickets de planta y las vigas; lo revisa el Jefe de laboratorio a las 06:00, cada día.',
        alerta='Un camión aceptado fuera de especificación, o un registro incompleto a las 05:00 en 2 noches de un mismo mes',
    ),
    despido=[
        'Registrar un ensayo que no hizo, o cambiar un resultado ya anotado.',
        'Aceptar a sabiendas un camión fuera de especificación, "sólo esta vez", por presión del frente.',
        'Ocultar que la evaporación pasó de 0.5 kg/m² por hora o no dar el aviso para no parar el colado.',
        'Cambiar, marcar distinto o sustituir una viga de ensayo.',
    ],
)

K['Mecánico de turno'] = dict(
    kpi=dict(
        nombre='Tiempo promedio de reparación en el frente',
        meta='20 minutos o menos por falla, con 100 % de fallas registradas con causa',
        mide='La bitácora de horas y fallas de cada máquina, cruzada con el registro de paros del tren; la revisa el Jefe de mantenimiento a las 05:00, cada día.',
        alerta='Más de 30 minutos promedio de reparación en 3 noches de un mismo mes',
    ),
    despido=[
        'Reparar una máquina sin bloqueo y etiquetado, o ponerle las manos a una máquina en marcha.',
        'Puentear o anular un paro de emergencia, una alarma o un dispositivo de seguridad para que la máquina siga trabajando.',
        'Alejarse del frente durante el colado sin relevo y sin avisar.',
        'Anotar en la bitácora una reparación que no hizo, o no anotar una falla para que no aparezca.',
    ],
)

K['Electricista · iluminación'] = dict(
    kpi=dict(
        nombre='Minutos de paro por iluminación o energía',
        meta='Cero minutos por noche, con torres y generadores encendidos antes de las 19:00',
        mide='El registro de paros del tren y la bitácora eléctrica; lo revisa el Jefe de mantenimiento a las 05:00, cada día.',
        alerta='Un paro por iluminación o energía, o equipo no listo a las 19:00, en 2 noches de un mismo mes',
    ),
    despido=[
        'Trabajar en un tablero, generador o cable energizado sin bloqueo y etiquetado, o mandar a otro a hacerlo.',
        'Anular una tierra física, un interruptor de protección o un dispositivo de seguridad eléctrico.',
        'Dirigir a sabiendas las torres hacia el carril abierto y cegar a los conductores, después de haber sido advertido.',
        'Anotar en la bitácora revisiones o cargas de combustible que no hizo.',
    ],
)

K['Apoyo general'] = dict(
    kpi=dict(
        nombre='Material listo al inicio de la noche',
        meta='100 % de la lista (rompevientos, plásticos, herramienta y agua) lista a las 18:30',
        mide='La lista de arranque que revisa el Cabo de colado a las 18:30, cada noche.',
        alerta='Faltantes en la lista en 3 noches de un mismo mes',
    ),
    despido=[
        'Pasar agua para la mezcla o echarla al concreto.',
        'Meterse a la zona de peligro de una máquina en marcha después de haber sido advertido por escrito.',
        'Tirar derrames o lavados sobre el acero, la base o la losa fresca, y no avisarlo.',
    ],
)

# ───────────── Acabado, calidad y mantenimiento (e_resto.py) ─────────────

K['Cabo de acabado'] = dict(
    kpi=dict(
        nombre='Tramos entregados dentro del IRI meta',
        meta='95 % o más de los tramos entregados en el mes con IRI de 1.0 m/km o menos',
        mide='El expediente de entrega de cada tramo con el IRI final de Topografía y Laboratorio; lo revisa el Superintendente de frente en la junta semanal y cierra el mes.',
        alerta='Menos de 90 % en un mes, o un día de atraso del Frente 5 detrás del colado en 3 días del mismo mes',
    ),
    despido=[
        'Firmar como entregado un tramo que no caminó, o con datos que no corresponden a lo medido.',
        'Ordenar meter equipo a la losa sin el dato de madurez que lo permite.',
        'Ordenar esmerilar de más, comiéndose el recubrimiento del acero, para bajar el IRI.',
        'Tirar o mandar tirar el lodo de esmerilado al dren o a la cuneta.',
        'Ocultar una grieta, un defecto o una corrección en el expediente de entrega.',
    ],
)

K['Operador de corte y esmerilado'] = dict(
    kpi=dict(
        nombre='Tramos esmerilados que pasan a la primera',
        meta='95 % o más pasan la nueva medición, con cero cortes fuera de la ventana de madurez',
        mide='La nueva medición del perfilómetro y la bitácora de corte con el dato de madurez; las revisa el Cabo de acabado cada día.',
        alerta='Menos de 90 % a la primera en un mes, o un corte fuera de ventana',
    ),
    despido=[
        'Cortar o esmerilar sin el dato de madurez, o anotar uno que no existe.',
        'Cortar o esmerilar en seco, sin agua ni aspiración, exponiendo a la cuadrilla al polvo de sílice.',
        'Tirar el lodo de esmerilado al dren o a la cuneta.',
        'Cortar a sabiendas más profundo de lo indicado, o cortar una grieta del CRCP, y no reportarlo.',
    ],
)

K['Núcleos y mediciones'] = dict(
    kpi=dict(
        nombre='Núcleos con registro completo el mismo día',
        meta='100 % de los núcleos del plan de control, con cadenamiento, GPS, foto, espesor y acero',
        mide='El plan de control contra el registro de núcleos y la cadena de custodia; lo revisa el Jefe de laboratorio cada día.',
        alerta='Un núcleo del plan sin extraer o sin registro completo en 2 días de un mismo mes',
    ),
    despido=[
        'Escoger el punto del núcleo en lugar de sortearlo, o moverlo para evitar una zona dudosa.',
        'Registrar una medida de espesor, acero o grietas que no tomó, o cambiar una ya anotada.',
        'Cambiar, sustituir o perder a propósito un núcleo, o romper su cadena de custodia.',
        'Cortar una varilla al perforar y ocultarlo.',
    ],
)

K['Operador de perfilómetro'] = dict(
    kpi=dict(
        nombre='IRI de anteanoche entregado a tiempo',
        meta='100 % de los días antes de las 06:00, con verificación del equipo registrada',
        mide='La hora de entrega del reporte y el registro de verificación diaria del equipo; los revisa el Jefe de laboratorio en la junta de las 06:00.',
        alerta='Un reporte tarde o sin verificación del equipo en 2 días de un mismo mes',
    ),
    despido=[
        'Repetir corridas a propósito hasta que salga un IRI mejor y reportar sólo esa.',
        'Alterar, borrar o sobrescribir un archivo de medición.',
        'Reportar un IRI de un tramo que no midió, o medido sin verificar el equipo, sin decirlo.',
        'Entregar a Producción los datos de un tramo antes que al Jefe de laboratorio para que se "arreglen".',
    ],
)

K['Jefe de mantenimiento'] = dict(
    kpi=dict(
        nombre='Disponibilidad de las cuatro máquinas críticas',
        meta='98 % o más durante el colado, promedio del mes',
        mide='Las horas de colado programadas contra los minutos de paro por falla mecánica del registro del tren; lo revisa el Gerente de logística en la junta semanal y cierra el mes.',
        alerta='Menos de 97 % en un mes, o una noche perdida por falla mecánica',
    ),
    despido=[
        'Autorizar que una máquina trabaje pasada de su límite de horas de una pieza crítica, o alterar el horómetro o la bitácora.',
        'Registrar como hechos mantenimientos preventivos que no se hicieron.',
        'Permitir reparaciones sin bloqueo y etiquetado o con dispositivos de seguridad anulados.',
        'Entregar el tren a producción sin probarlo y declararlo probado.',
    ],
)

K['Mecánico'] = dict(
    kpi=dict(
        nombre='Fallas repetidas en la misma máquina',
        meta='Cero fallas repetidas dentro de 30 días, con servicios preventivos a tiempo',
        mide='La bitácora de trabajos por máquina cruzada con la de fallas del frente; la revisa el Jefe de mantenimiento cada semana.',
        alerta='Una falla repetida dentro de 30 días en 2 máquinas de un mismo mes',
    ),
    despido=[
        'Trabajar en una máquina sin bloqueo y etiquetado.',
        'Anotar en la bitácora un servicio o una pieza que no puso.',
        'Entregar como reparada una máquina que no probó, o con un dispositivo de seguridad anulado.',
    ],
)

K['Llantero-lubricador'] = dict(
    kpi=dict(
        nombre='Camiones fuera de ciclo por ponchadura',
        meta='Cero por mes, con 100 % de las llantas revisadas cada día',
        mide='El registro por llanta cruzado con los reportes de fuera de ciclo del despachador; lo revisa el Jefe de mantenimiento cada semana.',
        alerta='Un camión fuera de ciclo por llanta, o un día sin revisión completa, 2 veces en un mismo mes',
    ),
    despido=[
        'Inflar una llanta de camión o de máquina sin la jaula de inflado.',
        'Dejar salir a sabiendas un camión con una llanta dañada o fuera de límite.',
        'Anotar como revisadas llantas o como engrasadas máquinas que no atendió.',
        'Tirar aceite o grasa usada al suelo, al dren o a la cuneta.',
    ],
)

K['Chofer de revolvedora (12 camiones + 15 % de relevo)'] = dict(
    kpi=dict(
        nombre='Cumplimiento de su lugar en el ciclo',
        meta='98 % o más de las vueltas en su lugar por GPS, con cero salidas de ciclo',
        mide='El GPS de cada camión contra el programa del despachador; lo revisa el Despachador de camiones cada noche y el Gerente de logística cada semana.',
        alerta='Menos de 95 % en su lugar, o una salida de ciclo, en 2 noches de un mismo mes',
    ),
    despido=[
        'Añadir agua a la olla, abrir la llave del agua con concreto dentro, o dejar que otro lo haga.',
        'Desconectar, tapar o manipular el GPS del camión.',
        'Hacer reversa en el frente sin el Controlador de descarga, o con la alarma de reversa desconectada.',
        'Manejar sin la licencia federal vigente del tipo que exige el camión.',
        'Lavar la olla en la cuneta o en el dren.',
    ],
)
