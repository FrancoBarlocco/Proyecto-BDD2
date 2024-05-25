import mysql from 'mysql2';
import Config from './config';
import express, { Application } from 'express';

class Connection {

  private app: Application;
  private port: string | number;

  private Path = {
      general: '/api/general'
  }

  constructor() {
      this.app = express();
      this.port = process.env.SERVER_PORT || 3307
      this.middlewares();
      this.dbConnection();
      this.routes();
  }

  async dbConnection() {
      try {
          await db.authenticate();
          console.log('Database online');
      } catch (error) {
          console.log(error);
      }
  }

  middlewares() {
      const bodyParser = require('body-parser');
      const cors = require('cors');

      this.app.use(cors());
      this.app.use(express.json());

      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));

  }

  routes() {
      this.app.use(this.Path.general, routes);
  }


  listen() {
      this.app.listen(this.port, () => {
          console.log(`Server running on port ${this.port}`);
      });
  }


}







const connection = mysql.createConnection(Config.dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});
export default connection;