import connection from "../db/connection";
import { Request, Response } from 'express';


//traer alumno por ci
//traer todos los alumnos 

class studentController {
    
    public static getStudents()
    {
        const query = 'SELECT * FROM Student';
        connection.query(query, (err, results) => {
          if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return;
          }
          console.log('Alumnos en la tabla Student:');
          (results as any[]).forEach((row) => {
            console.log(row);
          });
        });
    }
}
   
    export const getStudentByCi = async (req: Request, res: Response) => {
        const { ci } = req.params; // Asume que la cédula viene como parámetro de ruta
        try {
          const results = await connection.query('SELECT * FROM Student WHERE Ci = ?', [ci]);
          if (results) {
            console.log('Alumno encontrado:');
            console.log(results);
            res.json(results);
          } else {
            console.log('No se encontró ningún alumno con la cédula proporcionada.');
            res.status(404).json({ msg: 'No se encontró ningún alumno con la cédula proporcionada.' });
          }
        } catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      };
export default studentController;

