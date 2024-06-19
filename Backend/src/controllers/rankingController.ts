import connection from '../db/connection';
import { Request, Response } from 'express';

class rankingController {
}

// Función para obtener todo el ranking
export const getRanking = async (req: Request, res: Response) => {
    // Traer todos los usuarios para agregarlos al ranking aunque no hayan realizado predicciones
    const queryUsers = `
      SELECT 
        s.Ci AS UserId,
        s.FirstName,
        s.LastName,
        s.ChampionTeamId,
        s.SubChampionTeamId
      FROM Student s;
    `;
  
    // Obtener la suma total de puntos de cada usuario
    const queryUserScores = `
      SELECT 
        p.UserId, 
        SUM(p.Score) AS TotalPoints
      FROM Predicts p
      GROUP BY p.UserId;
    `;
  
    try {
      const [users] = await connection.query<any[]>(queryUsers);
      const [userScores] = await connection.query<any[]>(queryUserScores);
  
      const userPoints: { [key: number]: number } = {};
  
      users.forEach(user => {
        userPoints[user.UserId] = 0; // Iniciar los puntos de cada usuario en 0
      });
  
      userScores.forEach(score => {
        userPoints[score.UserId] = parseInt(score.TotalPoints, 10); //por defecto Totalpoints viene como cadena de texto, se parsea a int
      });
  
      //Para obtener los partidos de tipo final
      const queryFinalMatches = `
        SELECT
          m.MatchId,
          m.LocalTeamResult,
          m.VisitantTeamResult,
          m.LocalTeamId,
          m.VisitantTeamId,
          m.Category
        FROM Matches m
        WHERE m.Category = 'Final';
      `;
  
      const [finalMatches] = await connection.query<any[]>(queryFinalMatches);
  
      finalMatches.forEach(finalMatch => {
        users.forEach(user => {

          if (user.ChampionTeamId === finalMatch.LocalTeamId && finalMatch.LocalTeamResult > finalMatch.VisitantTeamResult) {//si el predecido es el equipo local y gana, entonces es campeon 
            userPoints[user.UserId] += 10; // Asigna 10 puntos extras por predicción correcta de campeón
          }
          if(user.ChampionTeamId === finalMatch.VisitantTeamId && finalMatch.VisitantTeamResult > finalMatch.LocalTeamResult){ //si el predecido es el equipo visitante y gana, entonces es campeon
            userPoints[user.UserId] += 10; 
          }
          if (user.SubChampionTeamId === finalMatch.LocalTeamId && finalMatch.LocalTeamResult < finalMatch.VisitantTeamResult) { //si el predecido como subcampeon es el equipo local y gana visitante, entonces local fue subcampeon
            userPoints[user.UserId] += 5; // Asigna 5 puntos extras por predicción correcta de subcampeón
          }
          if (user.SubChampionTeamId === finalMatch.VisitantTeamId && finalMatch.LocalTeamResult > finalMatch.VisitantTeamResult) { //si el predecido como subcampeon es el visitante y gana local, entonces visitante es subcampeon            
            userPoints[user.UserId] += 5; 
          }
        });
      });
  
      const ranking = users.map(user => ({
        UserId: user.UserId,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Points: userPoints[user.UserId]
      }));
  
      ranking.sort((a, b) => b.Points - a.Points); // Ordena de forma descendente
      res.json(ranking);
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
  };
export default rankingController