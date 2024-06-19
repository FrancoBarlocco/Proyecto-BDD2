import connection from '../db/connection';
import { Request, Response } from 'express';

class matchController {
}

//Función para obtener los partidos junto con la información de los equipos
export const getMatchesAndTeams = async (req: Request, res: Response) => {
  try {
    const query = `
            SELECT 
                Matches.MatchId, Matches.Date,Matches.StadiumId, Matches.LocalTeamResult, Matches.VisitantTeamResult, Matches.Category,
                localTeam.TeamId AS LocalTeamId, localTeam.Name AS LocalTeamName, localTeam.Flag AS LocalTeamFlag,
                visitantTeam.TeamId AS VisitantTeamId, visitantTeam.Name AS VisitantTeamName, visitantTeam.Flag AS VisitantTeamFlag,
                Stadium.Name AS StadiumName
            FROM Matches
            JOIN Team AS localTeam ON Matches.localTeamId = localTeam.TeamId
            JOIN Team AS visitantTeam ON Matches.visitantTeamId = visitantTeam.TeamId
            JOIN Stadium ON Matches.StadiumId = Stadium.stadiumId`;


    const [results] = await connection.query(query);

    console.log(results);
    res.json(results);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const postMatch = async (req: Request, res: Response) => {
  const { localTeam, visitantTeam, date, stadiumId, category } = req.body;

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
    res.status(201).json({ msg: 'Partido agregado exitosamente' });
  } catch (error) {
    console.error('Error al ejecutar la inserción:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

//endpoint para agregar resultados de un partido en la tabla matches 
export const updateMatchResult = async (req: Request, res: Response) => {
  const { matchId } = req.params;
  const { visitantTeamResult, localTeamResult } = req.body;

  if (visitantTeamResult === undefined || localTeamResult === undefined) {
    return res.status(400).json({ msg: 'Faltan datos del resultado del partido' });
  }

  const queryUpdateMatch = `
    UPDATE Matches
    SET visitantTeamResult = ?, localTeamResult = ?
    WHERE MatchId = ?
  `;

  const queryGetPredictions = `
    SELECT 
      p.UserId, 
      p.LocalTeamGoals AS PredictedTeamAGoals, 
      p.VisitantTeamGoals AS PredictedTeamBGoals, 
      m.LocalTeamResult AS ActualTeamAGoals, 
      m.VisitantTeamResult AS ActualTeamBGoals,
      m.LocalTeamId, 
      m.VisitantTeamId
    FROM Predicts p
    JOIN Matches m ON p.MatchId = m.MatchId
    JOIN Student s ON p.UserId = s.Ci
    WHERE p.MatchId = ?;
  `;

  const queryUpdatePredict = `
    UPDATE Predicts
    SET Score = ?
    WHERE MatchId = ? AND UserId = ?
  `;

  try {
    const [result] = await connection.query(queryUpdateMatch, [visitantTeamResult, localTeamResult, matchId]) as [any, any];
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Partido no encontrado' });
    }

    const [predictions] = await connection.query<any[]>(queryGetPredictions, [matchId]); //traigo solo las predicciones para el partido que se ingresa

    for (const prediction of predictions) {
      let points = 0;
      const predictedWin = prediction.PredictedTeamAGoals > prediction.PredictedTeamBGoals;
      const predictedDraw = prediction.PredictedTeamAGoals === prediction.PredictedTeamBGoals;
      const predictedLose = prediction.PredictedTeamAGoals < prediction.PredictedTeamBGoals;

      const localWin = prediction.ActualTeamAGoals > prediction.ActualTeamBGoals; // gana local 
      const draw = prediction.ActualTeamAGoals === prediction.ActualTeamBGoals; // empate
      const visitantWin = prediction.ActualTeamAGoals < prediction.ActualTeamBGoals; // gana visitante

      if (prediction.PredictedTeamAGoals === prediction.ActualTeamAGoals && prediction.PredictedTeamBGoals === prediction.ActualTeamBGoals) {
        points = 4;
      } else if ((predictedWin && localWin) || (predictedDraw && draw) || (predictedLose && visitantWin)) {
        points = 2;
      }

      // Actualizar los puntos de la predicción
      await connection.query(queryUpdatePredict, [points, matchId, prediction.UserId]);
    }

    res.status(200).json({ msg: 'Resultados del partido y puntajes actualizados exitosamente' });
  } catch (error) {
    console.error('Error al ejecutar la actualización:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
export default matchController;