
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
 port:process.env.PORT  || 3306,
  host: 'localhost', // Cambia esto por la dirección de tu servidor MySQL
  user: 'root', // Cambia esto por tu nombre de usuario de MySQL
  password: 'qwezxc123', // Cambia esto por tu contraseña de MySQL
  database: 'proyectoBDD2' // Cambia esto por el nombre de tu base de datos
});

// Establecer la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

// Ahora puedes ejecutar consultas SQL utilizando la conexión

// Por ejemplo, ejecutar una consulta de selección
connection.query('SELECT * FROM tu_tabla', (err, results) => {
  if (err) {
    console.error('Error al ejecutar la consulta:', err);
    return;
  }
  console.log('Resultados de la consulta:', results);
});

// No olvides cerrar la conexión cuando hayas terminado
connection.end();