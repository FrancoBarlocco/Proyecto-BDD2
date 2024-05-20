import connection from "../db/connection";

class TableLister {
  public static listTables() {
    const query = 'SHOW TABLES';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return;
      }
      console.log('Tablas en la base de datos:');
      (results as any[]).forEach((row) => {
        console.log(Object.values(row)[0]);
      });
    });
  }
}

export default TableLister;