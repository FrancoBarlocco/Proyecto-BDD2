import connection from '../db/connection';
import { Request, Response } from 'express';

class rankingController {
}

// Función para obtener un ranking por la id de usuario
export const getMatchById = async (req: Request, res: Response) => {
    const { id } = req.params; // Asume que el id del partido viene como parámetro de ruta
    try {
        const results = await connection.query('SELECT * FROM Matches WHERE MatchId = ?', [id]);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Función para obtener todos los partidos
export const getMatches = async (req: Request, res: Response) => {
    try {
        const results = await connection.query('SELECT * FROM Matches');
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};