Bases de Datos II Página 1 de 5
Universidad Católica del Uruguay Facultad de Ingeniería y Tecnologías
Trabajo obligatorio
Primer Semestre 2024
Cada día falta menos para poder volver a disfrutar de nuestros jugadores y volver a
vestir la Celeste del Alma. Ya se puede comenzar a palpitar la Copa América 2024.
Mientras Bielsa arma el listado de jugadores que va a reservar para representarnos de
la mejor manera, la UCU está pensando como incentivar a los alumnos a participar de
la PencaUCU, penca para los alumnos que pertenecen a la universidad.
Luego de varias reuniones de coordinación, se decidió que se otorgará un premio al
primer puesto que gane la Penca (Camiseta autografiada por los jugadores de la
selección) y un premio al segundo puesto (Pelota similar a la que se utilizará en la
Copa). El puesto final de todos los participantes se obtendrá mediante un listado de
puntos conseguidos durante toda la Copa.
Para ser más justo se pensó en una manera de premiar a los que acierten con los
resultados más exactos. ¿Cómo se otorgarán los puntos? Se otorgarán 4 puntos por
resultado exacto de un partido, y 2 puntos por resultado correcto. También se
otorgarán 10 puntos por campeón y 5 por subcampeón, ambos datos se deberán
cargar al momento de crear el usuario y no podrán modificarlo luego, por lo cual
tendrán que estar muy seguros de lo que ingresan. Se contará con un registro de
usuarios, así como con un usuario administrador para cargar los resultados de los
partidos jugados. Vale recordar que el usuario administrador no podrá ser un alumno,
ya que el mismo no podría participar de la penca.
Cada día, antes del primer partido de la etapa, se le enviará una notificación a los
usuarios participantes que deben ingresar sus jugadas, si no lo han hecho aún. Podrán
ingresar sus predicciones una hora antes de que comience el partido. Como hay
alumnos que son muy aplicados y ya tiene todos los posibles resultados en su mente,
pueden ingresar los resultados en cualquier momento y modificarlo también, siempre
que se cumpla que no falte una hora para el partido.
Se podrá visualizar la lista de participantes con sus puntajes para cotejo de todos, así
como el fixture del campeonato, el cual se actualizará en cada etapa. ¿Cómo
funcionaría? Empecemos por registrarnos e ingresar predicciones para los partidos
(obviamente no podré ingresar más de una predicción por partido). Deberé otorgar a
cada usuario la posibilidad de ver sus predicciones ingresadas y los puntos obtenidos
en cada una (si ya se ha jugado el partido). Esta aplicación debería poder ser usada
inicialmente por todos los alumnos de la UCU que se hayan registrado en la misma.
Bases de Datos II Página 2 de 5
Universidad Católica del Uruguay Facultad de Ingeniería y Tecnologías
El Sistema debe tener en cuenta que a futuro puede interesar sacar estadísticas de
como son los porcentajes de acierto de los alumnos teniendo en cuenta la Carrera que
cursan.
Las funcionalidades de esta app estarán limitadas solo por su imaginación, y en ello
residirá el valor que tenga. Mínimamente deberá contemplar factores como los
descriptos previamente, multiusuario, obviamente que, en una base de datos,
programado con SQL.
Se le pide que investigue con las personas de su grupo cómo se podría resolver este
problema. Luego de ello, modélelo, todo lo que el problema representa, sus desafíos y
la lógica necesaria que tiene para funcionar, arme la base de datos que se necesitaría.
Una vez lograda la base de datos, trabaje en elaborar la aplicación, considere que será
un prototipo por lo que debería ser posible que sea extensible para mayores
funcionalidades. ¿Su modelo es capaz de hacerlo con facilidad?
La funcionalidad mínima es la de poder registrarse, ingresar predicciones, ingresar
resultados de los partidos , listar las predicciones efectuadas por cada usuario, así
como visualizar los resultados obtenidos hasta ahora por todos los usuarios (o el
ranking de los mejores puestos).
Se les pide que investiguen qué base de datos y qué lógica debería dar sustento a los
programas de las características solicitadas.
Bases de Datos II Página 3 de 5
Universidad Católica del Uruguay Facultad de Ingeniería y Tecnologías
Entregas
El trabajo deberá estar implementado en una base de datos que soporte SQL,
quedando el estudiante en libertad de elegir la base de datos, previa justificación. La
base de datos puede estar hosteada en una VM en Linux (preferentemente Ubuntu) o
en un contenedor de Docker.
La aplicación debe implementarse con una arquitectura Cliente – Servidor, teniendo
un Backend y Frontend desarrollados en las tecnologías que su equipo elija, siendo
necesario documentar la elección de las plataformas utilizadas. Se recomienda el uso
de plataformas .NET o Java para el backend, por el uso de otras tecnologías consulte
previamente con la cátedra. En cuanto al frontend se puede realizar tanto una
aplicación web como una aplicación de escritorio.
Se recomienda recurrir a la bibliografía y artículos aportados en el curso; asimismo se
recomienda la evaluación de productos disponibles en el mercado de forma tal de
aprovechar posibles ideas y elementos implementados en dichas herramientas.
Consideraciones importantes
• No se puede utilizar nigún ORM (Entity Framework, TypeORM, etc); todas las
sentencias SQL deben estar reflejadas en el código fuente.
• La entrega debe incluir Scripts de SQL con la creación de la base de datos;
usuarios, tablas, y todo lo que sea necesario para el funcionamiento del sistema
desarrollado.
• La inclusión de Scripts con datos de prueba es importante para la demo del
sistema funcionando en instancia de defensa.
• Uso de reposiotrio de Git público obligatorio. El link al repositorio deber se
incluido en la entrega.
Bases de Datos II Página 4 de 5
Universidad Católica del Uruguay Facultad de Ingeniería y Tecnologías
Entregables
El informe del trabajo deberá contar con:
• Un resumen de la información teórica utilizada (con un máximo de 30 hojas);
• Referencia a aplicaciones similares existentes en el mercado tomadas en cuenta
como referencias
• Ideas que se hayan tomado en cuenta para la implementación, documentando:
o el modelo de datos (MER, Modelo Lógico, scripts de creación de la base
de datos)
o la funcionalidad del mismo (diagrama de componentes, clases,
colaboración, algoritmos, etc.)
• Breve capítulo de conclusiones, en el cual se pueda resumir los aspectos más
importantes del trabajo, cuáles son los próximos pasos, o aquellos aspectos
relevantes que se deseen concluir.
El tamaño total del informe no puede exceder las 100 páginas, no se aceptarán
trabajos que no cumplan con este requisito.
La documentación teórica debe contener las referencias a las fuentes de donde tomó la
información (con referencias en los párrafos correspondientes) y en caso de incluir
texto literal de alguna fuente DEBEN hacerlo correctamente, utilice las normas APA
(https://normasapa.com).
El ejecutable deberá ser acompañado de la documentación necesaria para comprender
su forma de trabajo y la manera de ejecutarlo. En el caso que hayan ocurrido
variaciones entre la implementación presentada en el informe del trabajo y la
confección del ejecutable se deberá agregar un anexo que indique los cambios
efectuados. Los únicos cambios aceptables son aquellos que involucren cambios en la
implementación de la solución presentada y no en la solución propiamente dicha.
Los entregables deberán ser subidos a Webasignatura.
Bases de Datos II Página 5 de 5
Universidad Católica del Uruguay Facultad de Ingeniería y Tecnologías
Reglas de colaboración: El obligatorio es en grupo de 3 personas, los integrantes son
los responsables de la división del trabajo en forma equitativa. El trabajo debe ser
original, producido enteramente por ustedes.
Entregas tardías: No es posible entregar el obligatorio después de fecha.
Entregas por email: No se aceptarán entregas por email excepto que Web Asignatura
no esté disponible seis horas antes a la fecha final de entrega. La entrega por email
debe enviarse a todos los profesores y pedirles confirmación de entrega. Es su
responsabilidad asegurarse que el trabajo haya sido recibido.
Valuación: La entrega será evaluada y se asignará una nota a cada uno de los
estudiantes, pudiéndose tomar defensas orales y/o escritas en el caso que los
profesores lo consideren necesario. La no presentación a las defensas provocará que el
alumno no pueda ser evaluado y, por ende, será calificado con D (deficiente).
Entrega de la Letra: 10/4/2024
Entrega del Informe: 17/6/2024
Entrega del Ejecutable: 26/6/2024
Defensas: 1 y 3/7/2024
