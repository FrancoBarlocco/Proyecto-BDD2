import connection from '../db/connection';
import { Request, Response } from 'express';

class statisticController {
}
    export const getStatisticsByCareer = async (req: Request, res: Response) => {
        
        try {
            const query = `
              SELECT
                s.Career,
                p.TeamAGoals,
                p.TeamBGoals,
                m.LocalTeamResult,
                m.VisitantTeamResult
              FROM
                Predicts p
                JOIN Matches m ON p.MatchId = m.MatchId
                JOIN Student s ON p.UserId = s.Ci;
            `;
      
            const [rows] = await connection.query(query);
            const predictions = rows as Array<{
              Career: string;
              TeamAGoals: number;
              TeamBGoals: number;
              LocalTeamResult: number;
              VisitantTeamResult: number;
            }>;
      
            //en statistics almaceno la carrera y los acertados, errados y correctos
            const statistics: { [career: string]: { exact: number, correct: number, failed: number } } = {};
      
            for (const prediction of predictions) {
              const { Career, TeamAGoals, TeamBGoals, LocalTeamResult, VisitantTeamResult } = prediction;
      
              if (!statistics[Career]) {
                statistics[Career] = { exact: 0, correct: 0, failed: 0 };
              }
      
              if (TeamAGoals === LocalTeamResult && TeamBGoals === VisitantTeamResult) {
                statistics[Career].exact += 1;
              } else if (
                (TeamAGoals > TeamBGoals && LocalTeamResult > VisitantTeamResult) ||
                (TeamAGoals < TeamBGoals && LocalTeamResult < VisitantTeamResult) ||
                (TeamAGoals === TeamBGoals && LocalTeamResult === VisitantTeamResult)
              ) {
                statistics[Career].correct += 1;
              } else {
                statistics[Career].failed += 1;
              }
            }
            res.status(200).json(statistics);
            console.log(statistics)
          } catch (error) {
            console.error('Error fetching statistics:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch statistics. Please try again later.' });
          }
        }
      
export default statisticController;
    
