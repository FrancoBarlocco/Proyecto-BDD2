import connection from '../db/connection';
import { Request, Response } from 'express';

class rankingController {
}

// Función para obtener todo el ranking
export const getRanking = async (req: Request, res: Response) => {

    const query = `
            SELECT 
            p.UserId, 
            s.FirstName,
            s.LastName,
            p.MatchId, 
            p.LocalTeamGoals AS PredictedTeamAGoals, 
            p.VisitantTeamGoals AS PredictedTeamBGoals, 
            m.LocalTeamResult AS ActualTeamAGoals, 
            m.VisitantTeamResult AS ActualTeamBGoals 
        FROM Predicts p
        JOIN Matches m ON p.MatchId = m.MatchId
        JOIN Student s ON p.UserId = s.Ci;
  `;
    try {
        const [results] = await connection.query<any[]>(query)
        console.log(results);

        const userPoints: { [key: number]: number } = {};

        results.forEach(result => {
            let points = 0;
            const predictedWin = result.PredictedTeamAGoals > result.PredictedTeamBGoals;
            const predictedDraw = result.PredictedTeamAGoals === result.PredictedTeamBGoals;
            const predictedLose = result.PredictedTeamAGoals < result.PredictedTeamBGoals;

            const actualWin = result.ActualTeamAGoals > result.ActualTeamBGoals;
            const actualDraw = result.ActualTeamAGoals === result.ActualTeamBGoals;
            const actualLose = result.ActualTeamAGoals < result.ActualTeamBGoals;

            if (result.PredictedTeamAGoals === result.ActualTeamAGoals && result.PredictedTeamBGoals === result.ActualTeamBGoals) {
                points = 4;
            } else if ((predictedWin && actualWin) || (predictedDraw && actualDraw) || (predictedLose && actualLose)) {
                points = 2;
            }

            if (userPoints[result.UserId]) {
                userPoints[result.UserId] += points;
            } else {
                userPoints[result.UserId] = points;
            }
        });

        const ranking = Object.keys(userPoints).map(userId => ({
            UserId: parseInt(userId, 10),
            FirstName: results.find(result => result.UserId === parseInt(userId, 10))?.FirstName || 'Nombre no encontrado',
            LastName: results.find(result => result.UserId === parseInt(userId, 10))?.LastName || 'Apellido no encontrado',
            Points: userPoints[parseInt(userId, 10)]
        }));

        res.json(ranking);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};