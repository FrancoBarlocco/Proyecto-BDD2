import connection from '../db/connection';
import { Request, Response } from 'express';

class rankingController {
}

// Función para obtener todo el ranking
export const getRanking = async (req: Request, res: Response) => {

    //se traen todos los usuarios para agregarlos al ranking asi no hayan realizado prediccion.
    const queryUsers = ` 
    SELECT 
        s.Ci AS UserId,
        s.FirstName,
        s.LastName
    FROM Student s;
`;

    const query = `
        SELECT 
            p.UserId, 
            s.FirstName,
            s.LastName,
            p.MatchId, 
            p.LocalTeamGoals AS PredictedTeamAGoals, 
            p.VisitantTeamGoals AS PredictedTeamBGoals, 
            m.LocalTeamResult AS ActualTeamAGoals, 
            m.VisitantTeamResult AS ActualTeamBGoals,
            m.Category, 
            m.LocalTeamId, 
            m.VisitantTeamId,
            s.ChampionTeamId, 
            s.SubChampionTeamId 
        FROM Predicts p
        JOIN Matches m ON p.MatchId = m.MatchId
        JOIN Student s ON p.UserId = s.Ci
        JOIN Team t1 ON t1.TeamId = m.LocalTeamId
        JOIN Team t2 ON t2.TeamId = m.VisitantTeamId;
    `;

    try {
        const [users] = await connection.query<any[]>(queryUsers);
        const [results] = await connection.query<any[]>(query);

        const userPoints: { [key: number]: number } = {};

        users.forEach(user => {
            userPoints[user.UserId] = 0; //inicio para usuario con 0 puntos
        });

        results.forEach(result => {
            let points = 0;
            const predictedWin = result.PredictedTeamAGoals > result.PredictedTeamBGoals;
            const predictedDraw = result.PredictedTeamAGoals === result.PredictedTeamBGoals;
            const predictedLose = result.PredictedTeamAGoals < result.PredictedTeamBGoals;

            const localWin = result.ActualTeamAGoals > result.ActualTeamBGoals; // gana local 
            const draw = result.ActualTeamAGoals === result.ActualTeamBGoals; // empate
            const visitantWin = result.ActualTeamAGoals < result.ActualTeamBGoals; // gana visitante

            if (result.PredictedTeamAGoals === result.ActualTeamAGoals && result.PredictedTeamBGoals === result.ActualTeamBGoals) {
                points = 4;
            } else if ((predictedWin && localWin) || (predictedDraw && draw) || (predictedLose && visitantWin)) {
                points = 2;
            }

            // Comprueba si el partido es una final y si el usuario predijo correctamente el campeón y el subcampeón
            if (result.Category === 'Final') {
                if (result.ChampionTeamId === result.LocalTeamId && localWin) { //si el predecido es el equipo local y gana, entonces es campeon 
                    points += 10;
                } else if (result.ChampionTeamId === result.VisitantTeamId && visitantWin) { //si el predecido es el equipo visitante y gana, entonces es campeon
                    points += 10;
                }

                if (result.SubChampionTeamId === result.LocalTeamId && visitantWin) { //si el predecido como subcampeon es el equipo local y gana visitante, entonces local fue subcampeon
                    points += 5;
                } else if (result.SubChampionTeamId === result.VisitantTeamId && localWin) { //si el predecido como subcampeon es el visitante y gana local, entonces visitante es subcampeon 
                    points += 5;
                }
            }
            userPoints[result.UserId] += points;
        });

        const ranking = users.map(user => ({
            UserId: user.UserId,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Points: userPoints[user.UserId]
        }));

        ranking.sort((a, b) => b.Points - a.Points); //ordena de forma descendente 
        res.json(ranking);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
