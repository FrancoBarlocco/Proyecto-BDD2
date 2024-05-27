import connection from '../db/connection';
import { Request, Response } from 'express';

class studentController {
}
    export const getStudentByCi = async (req: Request, res: Response) => {
        const { ci } = req.params; // Asume que la cédula viene como parámetro de ruta
        try {
          const results = await connection.query('SELECT * FROM Student WHERE Ci = ?', [ci]);
           console.log(results);
            res.json(results);
          }
        catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      }

      export const getStudents = async (req: Request, res: Response) => {
        const { ci } = req.params; // Asume que la cédula viene como parámetro de ruta
        try {
          const results = await connection.query('SELECT * FROM Student');
            console.log(results)
            res.json(results);
          }
        catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      }

export default studentController;

