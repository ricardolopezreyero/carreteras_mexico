# -*- coding: utf-8 -*-
# RLR · KPI principal y motivos de despido — Ricardo López Reyero
K = {}

# ─────────────────────────── Estructura de proyecto ───────────────────────────

K['Director de Proyecto'] = dict(
    kpi=dict(
        nombre='Km-carril aceptados contra programa',
        meta='100 % del programa trimestral, con cero desviaciones sin firma y núcleos, IRI y permeabilidad dentro de especificación',
        mide='El Ingeniero de datos cruza metros colados con la aceptación de Calidad en el tablero; lo revisa la Dirección general cada mes y a fondo cada trimestre.',
        alerta='Menos del 90 % del programa aceptado en un trimestre, o una sola desviación encontrada sin firma',
    ),
    despido=[
        'Reanudar un colado detenido por Calidad o por Seguridad sin dejar por escrito la causa y qué cambió.',
        'Autorizar de palabra, o permitir que se aplique sin su firma, una desviación de la especificación (espesor, agua/cementante, curado o drenaje).',
        'Ordenar o consentir que se cambie un dato del tablero, un ensayo o un reporte al cliente para que el avance o la calidad "se vean mejor".',
        'Remover, castigar o presionar al Gerente de calidad, a un laboratorista o a Seguridad por haber detenido el trabajo.',
        'Firmar un contrato o un precio por debajo del piso del cotizador sin la autorización escrita de la Dirección general.',
    ],
)

K['Gerente de calidad'] = dict(
    kpi=dict(
        nombre='Camiones aceptados fuera de especificación',
        meta='Cero en el mes, con 100 % de los metros colados con trazabilidad completa',
        mide='La supervisión independiente audita al azar tickets de planta, temperaturas, aire y vigas contra el tablero; lo revisa el Director de Proyecto cada mes.',
        alerta='Un solo camión aceptado fuera de especificación, o trazabilidad menor al 98 % en un mes',
    ),
    despido=[
        'Aceptar, o dejar aceptar, un camión, un banco de agregado o un lote de cemento o acero que no cumple, sabiéndolo.',
        'Liberar un tramo con núcleos, vigas, aire o permeabilidad fuera de especificación sin reportarlo al Director y a la supervisión independiente.',
        'Cambiar, borrar o fabricar un resultado de laboratorio, o firmar un expediente con ensayos que no se hicieron.',
        'Negociar en privado con Producción que un defecto no se registre o no se rechace.',
        'Autorizar un cambio al diseño de mezcla sin validarlo con ensayos y sin dejarlo por escrito.',
    ],
)

K['Gerente de logística'] = dict(
    kpi=dict(
        nombre='Minutos de paro del tren por suministro',
        meta='15 minutos o menos por noche, promedio del mes, con intervalo entre descargas de 2.5 minutos o menos',
        mide='El control 3D de la pavimentadora registra cada paro y el residente anota la causa; el tablero lo suma y lo revisa el Director en la junta de las 06:00, cada día.',
        alerta='Más de 30 minutos de paro por suministro en 3 noches de un mismo mes, o silos bajo 2 días de autonomía',
    ),
    despido=[
        'Ordenar o consentir que se cuele concreto rechazado por el laboratorio, o que se desvíe a otra parte del frente, para no parar el tren.',
        'Contratar o mantener a un transportista que no firmó la cláusula de mando del despachador.',
        'Mover la planta y reanudar el colado sin la prueba continua de 4 horas.',
        'Falsear inventarios, tickets o reportes de disponibilidad de las máquinas críticas.',
        'Recibir pagos, regalos o comisiones de proveedores o transportistas del proyecto.',
    ],
)

K['Ingeniero de datos'] = dict(
    kpi=dict(
        nombre='Tablero completo publicado a las 06:00',
        meta='100 % de los días, con 90 % o más de los datos capturados automáticamente',
        mide='El sistema registra la hora de publicación y la fuente de cada dato; lo revisa el Director de Proyecto en la junta de las 06:00, cada día, y el porcentaje automático cada mes.',
        alerta='Tablero tarde o incompleto 3 días en un mes, o captura automática bajo 80 %',
    ),
    despido=[
        'Cambiar, borrar u ocultar un dato del tablero (un rechazo, un paro, un resultado) para que "se vea mejor", aunque se lo pida un jefe.',
        'Cargar datos inventados o estimados sin marcarlos como tales.',
        'Borrar o perder por descuido grave el as-built o la trazabilidad de un tramo, sin respaldo.',
        'Dar acceso o sacar información del proyecto a personas no autorizadas.',
    ],
)

K['Responsable de liberaciones'] = dict(
    kpi=dict(
        nombre='Kilómetros liberados por delante del colado',
        meta='20 km o más, medidos cada viernes',
        mide='El semáforo por kilómetro que actualiza cada viernes, verificado por topografía; lo revisa el Director en la junta de los lunes, cada semana.',
        alerta='Menos de 15 km en 2 semanas seguidas, o un día de frente detenido por liberación',
    ),
    despido=[
        'Ofrecer o entregar dinero, favores o promesas fuera de la ley a propietarios, ejidos o funcionarios.',
        'Firmar o prometer acuerdos por encima de lo autorizado por escrito por el Director.',
        'Reportar como liberado un predio, ducto, línea o permiso que no lo está.',
        'Ocultar al Director un conflicto con una comunidad o un propietario que puede detener el frente.',
    ],
)

# ─────────────────────────── Mando y staff ───────────────────────────

K['Superintendente de frente'] = dict(
    kpi=dict(
        nombre='Colchón mínimo de los frentes previos',
        meta='3 días o más en cada frente, todos los días, sosteniendo el programa trimestral de metros aceptados',
        mide='El tablero calcula el colchón de cada frente con los metros liberados por laboratorio y topografía; lo revisa el Director en la junta de las 06:00, cada día.',
        alerta='Un frente bajo 3 días de colchón en 3 días de un mismo mes',
    ),
    despido=[
        'Pedir o presionar a un laboratorista o al Gerente de calidad para que deje pasar un camión o libere una capa.',
        'Reanudar un colado detenido por Calidad o por Seguridad sin la orden escrita del Director.',
        'Ordenar que se cuele o se tape una capa que el laboratorio o topografía no liberó.',
        'Reportar metros, colchones o kilómetros liberados que no existen.',
        'Ordenar o tolerar que se añada agua al concreto.',
    ],
)

K['Residente de colado'] = dict(
    kpi=dict(
        nombre='Metros aceptados a la primera por noche',
        meta='1,000 m por noche, promedio del mes, con cero juntas frías no planeadas e IRI de 1.0 m/km o menos',
        mide='El control 3D registra los metros y los paros; Calidad marca los aceptados; lo revisa el Superintendente en la junta de las 06:00, cada día.',
        alerta='Menos de 900 m aceptados de promedio en una semana, o más de 30 minutos de paro sin causa en 3 noches de un mes',
    ),
    despido=[
        'Añadir agua al concreto, o permitir que se añada, aunque sea "sólo en la orilla".',
        'Colar un camión que el laboratorista rechazó, o mandarlo a otra parte del frente.',
        'Reanudar el tren después de una detención de Calidad o de Seguridad sin la orden del Director.',
        'Registrar un paro sin causa, con causa falsa, o borrar minutos de paro del reporte.',
        'Colar con la máquina de textura y curado fuera de servicio, o con evaporación sobre 0.5 kg/m²·h sin rompevientos.',
    ],
)

K['Jefe de planta'] = dict(
    kpi=dict(
        nombre='Camiones rechazados por causa de planta',
        meta='Cero por noche, con temperatura de salida de 30 °C o menos en el 100 % de las cargas',
        mide='La planta registra dosificación, humedad y temperatura por bachada y el laboratorio anota la causa de cada rechazo; lo revisa el Gerente de logística en la junta de las 06:00, cada día.',
        alerta='Más de 2 camiones rechazados por causa de planta en una semana',
    ),
    despido=[
        'Añadir agua a una carga por encima de la dosificación aprobada, o apagar el registro automático de la planta.',
        'Cambiar el diseño de mezcla o la corrección por humedad sin la orden del laboratorio.',
        'Seguir produciendo con una báscula descalibrada, un silo o el enfriamiento fallando, sin avisar.',
        'Despachar concreto a más de 30 °C sabiéndolo.',
        'Alterar tickets, volúmenes o registros de consumo de cemento, ceniza o aditivo.',
    ],
)

K['Jefe de laboratorio'] = dict(
    kpi=dict(
        nombre='Capas liberadas con ensayos completos punto por punto',
        meta='100 % de lo liberado, con cero camiones aceptados fuera de especificación en el mes',
        mide='La supervisión independiente audita al azar expedientes, vigas y registros contra el tablero; lo revisa el Gerente de calidad cada semana.',
        alerta='Una capa liberada con un ensayo faltante, o un camión aceptado fuera de especificación',
    ),
    despido=[
        'Registrar un ensayo que no se hizo, o cambiar un resultado ya anotado.',
        'Liberar una capa por promedio cuando un punto no cumple, o sin haber medido sulfatos antes de la cal.',
        'Aceptar una orden de Producción sobre un resultado, o dejar que un laboratorista la acepte sin reportarlo.',
        'Ocultar al Gerente de calidad un rechazo, una viga fallada o un equipo descalibrado.',
    ],
)

K['Laboratorista'] = dict(
    kpi=dict(
        nombre='Ensayos del plan hechos a tiempo y trazables',
        meta='100 % de los ensayos del turno, con hora, ubicación y camión capturados antes del cierre',
        mide='El sistema de captura registra cada ensayo contra el plan de control; lo revisa el Jefe de laboratorio al cierre de cada turno.',
        alerta='Más de 2 ensayos tarde o incompletos en un mes, o una viga perdida',
    ),
    despido=[
        'Registrar un ensayo que no hizo, o cambiar un resultado ya anotado.',
        'Anotar un resultado "de memoria" o redondeado a favor para que pase.',
        'Aceptar un camión o una capa que no cumple porque se lo pidió alguien de Producción.',
        'Tirar, cambiar o reetiquetar vigas o cilindros para ocultar un resultado.',
    ],
)

K['Topógrafo · control 3D'] = dict(
    kpi=dict(
        nombre='Capas dentro de tolerancia al primer intento',
        meta='98 % o más de los tramos entregados, con cero faltantes de espesor en núcleos',
        mide='Topografía verifica cada capa contra puntos físicos y el laboratorio reporta los núcleos; lo revisa el Superintendente cada semana.',
        alerta='Menos del 95 % a la primera en un mes, o un núcleo con faltante de espesor atribuible a rasante',
    ),
    despido=[
        'Cargar en una máquina un modelo 3D con el proyecto geométrico cambiado sin la firma del Director.',
        'Entregar como dentro de tolerancia una capa que midió fuera, o registrar niveles que no midió.',
        'Borrar, sobrescribir o alterar el as-built para esconder un error.',
        'Dejar trabajar una máquina con un modelo o una señal que sabe equivocados.',
    ],
)

K['Despachador de camiones'] = dict(
    kpi=dict(
        nombre='Intervalo promedio entre descargas',
        meta='2 minutos o menos, promedio de la noche',
        mide='El GPS y la hora de descarga de cada camión en el tablero; lo revisa el Gerente de logística en la junta de las 06:00, cada día.',
        alerta='Más de 2.5 minutos de promedio en 3 noches de un mismo mes',
    ),
    despido=[
        'Mandar a otra parte del frente, o de regreso a colocar, un camión que el laboratorio rechazó.',
        'Mantener en ruta a un chofer que maneja bajo efecto de alcohol, cansado o de forma temeraria, sabiéndolo.',
        'Alterar horas de carga o descarga en el tablero o en los tickets.',
        'Dejar pasar al frente un camión con más de 90 minutos de mezclado sin avisar al laboratorio.',
    ],
)

K['Seguridad e higiene'] = dict(
    kpi=dict(
        nombre='Accidentes con tiempo perdido e incidentes con terceros',
        meta='Cero en el mes, con señalización nocturna auditada sin faltantes antes del 100 % de los arranques',
        mide='El registro de incidentes y la lista de auditoría de cada arranque; lo revisa el Director de Proyecto cada semana y cada que ocurre un incidente.',
        alerta='Un accidente con tiempo perdido, o un arranque sin auditoría de señalización',
    ),
    despido=[
        'Ocultar, no reportar o reportar distinto un accidente o un casi-accidente.',
        'Firmar una auditoría de señalización que no hizo, o dejar arrancar el colado con la señalización incompleta.',
        'Castigar, exhibir o tomar represalias contra quien reportó un casi-accidente o detuvo el trabajo por seguridad.',
        'Dejar en el frente a una persona que sabe bajo efecto de alcohol o sustancias.',
        'Retirar o permitir que se retiren dispositivos de seguridad de máquinas o de la zona de tránsito.',
    ],
)

K['Almacén y refacciones'] = dict(
    kpi=dict(
        nombre='Refacciones críticas presentes en almacén',
        meta='100 % de la lista de las cuatro máquinas críticas, en cada conteo, con diferencias de inventario menores al 1 %',
        mide='Conteo cíclico semanal contra la lista de críticas y el sistema de inventario; lo revisa el Gerente de logística cada semana.',
        alerta='Una refacción crítica faltante en un conteo, o diferencias de 1 % o más en dos conteos seguidos',
    ),
    despido=[
        'Sacar material, refacciones, combustible o equipo del almacén sin vale, para uso propio o de terceros.',
        'Alterar conteos, vales o registros de inventario.',
        'Recibir y dar por buena una refacción o un material que no corresponde a lo pedido, a cambio de algo.',
        'Entregar equipo de protección dañado o vencido sabiéndolo.',
    ],
)

# ─────────────────────────── Frente 1 · Terracería ───────────────────────────

K['Cabo de frente'] = dict(
    kpi=dict(
        nombre='Metros de subrasante aceptados a la primera',
        meta='1,000 m por día con cero puntos bajo 95 % Proctor modificado, y colchón de 3 días o más sobre drenaje',
        mide='El laboratorio y topografía liberan cada tramo en el tablero; lo revisa el Superintendente de frente en la junta de las 06:00, cada día.',
        alerta='Menos de 900 m aceptados de promedio en una semana, o colchón bajo 3 días en 3 días de un mes',
    ),
    despido=[
        'Entregar al drenaje un tramo sin la firma del laboratorio o de topografía.',
        'Meter cal sin el resultado de sulfatos del laboratorio.',
        'Tapar una bolsa blanda con material nuevo en lugar de sacarla, u ordenar que se tape.',
        'Presionar al laboratorista para que libere un tramo, o reportar metros liberados que no lo están.',
    ],
)

K['Operador de maquinaria'] = dict(
    kpi=dict(
        nombre='Tramos rechazados atribuibles a su máquina',
        meta='Cero en el mes, con bitácora de revisión diaria completa el 100 % de los días',
        mide='El laboratorio y topografía registran la causa de cada rechazo; lo revisa el Cabo de frente al cierre de cada día.',
        alerta='Dos tramos rechazados por causa de su máquina en un mes',
    ),
    despido=[
        'Operar una máquina con frenos, dirección, alarma de reversa o cinturón fallando, sabiéndolo.',
        'Desconectar la alarma de reversa, la cámara o cualquier dispositivo de seguridad de la máquina.',
        'Compactar una capa más gruesa de lo indicado para avanzar, o cambiar el modelo 3D por su cuenta.',
        'Ocultar un golpe a una persona, a otra máquina o a un ducto.',
    ],
)

K['Ayudante general'] = dict(
    kpi=dict(
        nombre='Incidentes con máquinas en su zona',
        meta='Cero en el mes, con cero capas rechazadas por piedra o basura',
        mide='El cabo registra incidentes y rechazos del laboratorio con su causa; lo revisa el Cabo de frente al cierre de cada día.',
        alerta='Un casi-accidente con máquina atribuible a él, o dos capas rechazadas por basura en un mes',
    ),
    despido=[
        'Operar una máquina sin estar certificado para ella.',
        'Mover o volver a clavar una estaca de topografía por su cuenta.',
        'Ocultar al cabo un suelo que bombea u ondula, o un accidente que vio.',
        'Meterse a la zona de una máquina en operación después de que se le ordenó no hacerlo.',
    ],
)

K['Regador · control de humedad'] = dict(
    kpi=dict(
        nombre='Capas con humedad dentro de la óptima',
        meta='95 % o más de las capas dentro de ±2 % de la humedad óptima al compactar',
        mide='El laboratorio mide la humedad de cada capa antes de compactar y la registra en el tablero; lo revisa el Cabo de frente cada día.',
        alerta='Menos del 90 % en una semana, o 3 esperas del compactador por agua en un mes',
    ),
    despido=[
        'Manejar la pipa con frenos, dirección o luces fallando, sabiéndolo.',
        'Cargar la pipa con agua de una fuente no autorizada o contaminada.',
        'Registrar riegos o viajes que no hizo.',
        'Ocultar un golpe o un incidente de manejo con la pipa.',
    ],
)

# ─────────────────────────── Frente 2 · Drenaje ───────────────────────────

K['Cabo de drenaje'] = dict(
    kpi=dict(
        nombre='Metros de dren con pendiente verificada',
        meta='1,000 m por día, 100 % con pendiente verificada antes de tapar y salidas con cabezal y registro',
        mide='Topografía registra la pendiente de cada tramo antes del relleno y el as-built ubica cada salida; lo revisa el Superintendente de frente en la junta de las 06:00, cada día.',
        alerta='Un tramo tapado sin verificación, o menos de 900 m de promedio en una semana',
    ),
    despido=[
        'Tapar un tramo de dren sin la verificación de pendiente de topografía, u ordenar que se tape.',
        'Cambiar la separación de salidas o eliminar un cabezal sin autorización escrita.',
        'Seguir excavando después de encontrar un ducto, cable o línea no marcada.',
        'Mandar gente a una zanja sin ademe o con una máquina operando encima.',
        'Reportar como terminado un dren que no está terminado.',
    ],
)

K['Operador'] = dict(
    kpi=dict(
        nombre='Metros de zanja sin retrabajo por pendiente',
        meta='98 % o más de los metros del mes, con cero ductos, líneas o tubos dañados',
        mide='Topografía registra la pendiente de cada tramo y el cabo anota daños y retrabajos; lo revisa el Cabo de drenaje al cierre de cada día.',
        alerta='Más de 2 % de retrabajo en un mes, o un ducto o tubo dañado',
    ),
    despido=[
        'Seguir excavando después de ver una cinta de advertencia, un ducto o un cable.',
        'Operar la máquina con alguien dentro de la zanja bajo el bote.',
        'Excavar fuera del tramo liberado.',
        'Ocultar un ducto, una línea o un tubo que dañó.',
    ],
)

K['Cuadrilla de tubo, geotextil y cabezales'] = dict(
    kpi=dict(
        nombre='Tramos rechazados por el cabo',
        meta='Cero en el mes, con el 100 % de las salidas con cabezal y registro',
        mide='El cabo revisa cada tramo antes de tapar y registra la causa de cada rechazo; lo revisa el Cabo de drenaje al cierre de cada día.',
        alerta='Dos tramos rechazados en un mes',
    ),
    despido=[
        'Tapar o dejar tapar un tramo sin la revisión del cabo.',
        'Colocar tubo roto, geotextil rasgado o grava sucia sabiendo que lo están, sin avisar.',
        'Meterse a la zanja bajo la máquina en operación.',
    ],
)

# ─────────────────────────── Frente 3 · Base ───────────────────────────

K['Cabo de base'] = dict(
    kpi=dict(
        nombre='Metros de base con interfaz aceptados',
        meta='1,000 m por día dentro de espesor y densidad, con cero tramos de interfaz sucia al llegar el tren',
        mide='El laboratorio registra espesor y densidad de cada tramo y el residente reporta el estado de la interfaz; lo revisa el Superintendente de frente en la junta de las 06:00, cada día.',
        alerta='Menos de 900 m aceptados de promedio en una semana, o un tramo con interfaz dañada al llegar el tren',
    ),
    despido=[
        'Tender mezcla vieja, seca o segregada para no tirarla, u ordenar que se tienda.',
        'Omitir la interfaz bituminosa en un tramo sin reportarlo.',
        'Aceptar o entregar una base fuera de espesor o de compactación sin la firma del laboratorio.',
        'Abrir la base o la interfaz al tráfico de obra antes de que esté lista.',
    ],
)

K['Operador de extendedora y rodillos'] = dict(
    kpi=dict(
        nombre='Tramos rechazados atribuibles a su máquina',
        meta='Cero en el mes por espesor, densidad o regularidad',
        mide='El laboratorio y topografía registran la causa de cada rechazo; lo revisa el Cabo de base al cierre de cada día.',
        alerta='Dos tramos rechazados por causa de su máquina en un mes',
    ),
    despido=[
        'Cambiar el espesor, el patrón de pasadas o la vibración sin indicación del cabo o del laboratorio.',
        'Operar con frenos, vibración, sensores o alarma fallando, sabiéndolo.',
        'Desconectar la alarma de reversa o cualquier dispositivo de seguridad de la máquina.',
        'Ocultar un golpe a una persona o a otra máquina.',
    ],
)

K['Cuadrilla de apoyo y riego'] = dict(
    kpi=dict(
        nombre='Tramos rechazados por superficie o riego',
        meta='Cero en el mes, con cero tramos de base secos al sol',
        mide='El cabo y el laboratorio revisan superficie, curado y riego antes de liberar; lo revisa el Cabo de base al cierre de cada día.',
        alerta='Dos tramos rechazados, o un tramo de base seco sin curado, en un mes',
    ),
    despido=[
        'Cambiar la dosis de emulsión por su cuenta, o regarla sobre una superficie sucia sabiendo que se rechaza.',
        'Dejar de curar una base asignada y reportarla como curada.',
        'Abrir el tramo al tráfico o quitar la señal de cierre sobre el riego fresco.',
        'Manejar emulsión caliente sin el equipo de protección entregado.',
    ],
)
