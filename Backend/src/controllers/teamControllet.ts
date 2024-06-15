import connection from '../db/connection';
import { Request, Response } from 'express';

class teamController {
}
    export const getTeamById = async (req: Request, res: Response) => {
        const { id } = req.params; // Asume que el id viene como parámetro de ruta
        try {
          const results = await connection.query('SELECT * FROM Team WHERE TeamId = ?', [id]);
           console.log(results);
            res.json(results[0]);
          }
        catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      }

      export const getTeams = async (req: Request, res: Response) => {
        try {
          const [results] : any[] = await connection.query('SELECT * FROM Team');    
            console.log(results)
            res.json(results);    //al hacer esto devuelvo solo los datos de la consulta, sin metadatos(por defecto)
          }
        catch (error) {
          console.error('Error al ejecutar la consulta:', error);
          res.status(500).json({ msg: 'Error interno del servidor' });
        }
      }

export default teamController;
