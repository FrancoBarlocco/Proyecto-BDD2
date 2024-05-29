import connection from '../db/connection';
import { Request, Response } from 'express';

class matchController {
}

// Función para obtener un partido por su ID
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

// Nueva función para obtener los partidos junto con la información de los equipos
export const getMatchesAndTeams = async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT 
                Matches.MatchId, Matches.Location, Matches.Date, Matches.LocalTeamResult, Matches.VisitantTeamResult,
                localTeam.TeamId AS LocalTeamId, localTeam.Name AS LocalTeamName, localTeam.Flag AS LocalTeamFlag,
                visitantTeam.TeamId AS VisitantTeamId, visitantTeam.Name AS VisitantTeamName, visitantTeam.Flag AS VisitantTeamFlag
            FROM Matches
            JOIN Team AS localTeam ON Matches.localTeamId = localTeam.TeamId
            JOIN Team AS visitantTeam ON Matches.visitantTeamId = visitantTeam.TeamId`;

        const [results] = await connection.query(query);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export default matchController;
