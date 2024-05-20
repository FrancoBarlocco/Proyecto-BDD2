import mysql from 'mysql2';
import Config from './config';

const connection = mysql.createConnection(Config.dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

export default connection;