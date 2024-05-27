import connection from '../db/connection';
import { Request, Response } from 'express';

class matchController {
}
    export const getMatchById = async (req: Request, res: Response) => {
        const { id } = req.params; // Asume que la cédula viene como parámetro de ruta
        try {
          const results = await connection.query('SELECT * FROM Matches WHERE MatchId = ?', [id]);
           console.log(results);
            res.json(results);
          }
        catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      }

      export const getMatches = async (req: Request, res: Response) => {
        const { ci } = req.params; // Asume que la cédula viene como parámetro de ruta
        try {
          const results = await connection.query('SELECT * FROM Matches');
            console.log(results)
            res.json(results);
          }
        catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      }

export default matchController;

