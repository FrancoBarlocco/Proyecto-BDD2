const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql', // Se conecta al servicio de MySQL definido en Docker Compose
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Clavepontiac120962',
  database: process.env.MYSQL_DATABASE || 'proyectoBDD2',
  port: process.env.MYSQL_PORT || 3306,  // Puerto dentro del contenedor
});

// Establecer la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

connection.end();
