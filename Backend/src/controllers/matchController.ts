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

//Función para obtener los partidos junto con la información de los equipos
export const getMatchesAndTeams = async (req: Request, res: Response) => {
    try {
        const query = `
            SELECT 
                Matches.MatchId, Matches.Date, Matches.LocalTeamResult, Matches.VisitantTeamResult,
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

export const savePredictions = async (req: Request, res: Response): Promise<void> => {
  // Obtén los datos de la solicitud
  const { userId, matchId, localPrediction, visitantPrediction } = req.body;
  
  try {

    const query = `
      INSERT INTO Predicts (UserId, MatchId, TeamAGoals, TeamBGoals, Score)
      VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(query, [userId, matchId, localPrediction, visitantPrediction, 0]);

    const response = {
      success: true,
      message: 'Predictions saved successfully.'
    };
    res.json(response);
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error saving predictions:', error);
    const response = {
      success: false,
      error: 'Failed to save predictions. Please try again later.'
    };
    res.status(500).json(response);
  }
};

export const postMatch = async (req: Request, res: Response) => {
  const { localTeam, visitantTeam, date, stadiumId, category} = req.body;

  if (!localTeam || !visitantTeam || !date || !stadiumId) {
    return res.status(400).json({ msg: 'Faltan datos del partido' });
  }
  const query = `
    INSERT INTO Matches (localTeamId, visitantTeamId, date, stadiumId, category, localTeamResult, visitantTeamResult)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = await connection.query(query, [localTeam, visitantTeam, date, stadiumId, category, null, null]);
    console.log(result);
    res.status(201).json({ msg: 'Partido agregado exitosamente'});
  } catch (error) {
    console.error('Error al ejecutar la inserción:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

//endpoint para agregar resultados de un partido en la tabla matches 
export const updateMatchResult = async (req: Request, res: Response) => {
  const { matchId } = req.params;
  const { visitantTeamResult, localTeamResult } = req.body;
  console.log(matchId + visitantTeamResult + localTeamResult + '##############')

  if (visitantTeamResult === undefined || localTeamResult === undefined) {
    return res.status(400).json({ msg: 'Faltan datos del resultado del partido' });
  }

  const query = `
    UPDATE Matches
    SET visitantTeamResult = ?, localTeamResult = ?
    WHERE MatchId = ?
  `;

  try {
    const [result] = await connection.query(query, [visitantTeamResult, localTeamResult, matchId])as [any, any];
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Partido no encontrado' });
    }
    res.status(200).json({ msg: 'Resultados del partido actualizados exitosamente' });
  } catch (error) {
    console.error('Error al ejecutar la actualización:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
export default matchController;