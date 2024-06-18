import connection from '../db/connection';
import { Request, Response } from 'express';
import MailService from '../services/mailService';


class predictController {
}

export const getPredictions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    // Consulta para obtener las predicciones del usuario
    const query = `
    SELECT MatchId, LocalTeamGoals, VisitantTeamGoals, Score
    FROM Predicts
    WHERE UserId = ?
    `;

    const [rows] = await connection.query(query, [userId]);
    res.json(rows);
    
  } catch (error) {
    console.error('Error fetching predictions:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch predictions. Please try again later.' });
  }
};

export const savePredictions = async (req: Request, res: Response): Promise<void> => {
  const { userId, matchId, localPrediction, visitantPrediction } = req.body;
  
  try {

    const query = `
      INSERT INTO Predicts (UserId, MatchId, LocalTeamGoals, VisitantTeamGoals, Score)
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

export const updatePredictions = async (req: Request, res: Response): Promise<void> => {
  const { userId, matchId, localPrediction, visitantPrediction } = req.body;
  
  try {
    const query = `
      UPDATE Predicts
      SET LocalTeamGoals = ?, VisitantTeamGoals = ?
      WHERE UserId = ? AND MatchId = ?
    `;

    await connection.query(query, [localPrediction, visitantPrediction, userId, matchId]);

    const response = {
      success: true,
      message: 'Prediction updated successfully.'
    };
    res.json(response);
  } catch (error) {
    // Si hay algún error, envía una respuesta de error
    console.error('Error updating predictions:', error);
    const response = {
      success: false,
      error: 'Failed to update predictions.'
    };
    res.status(500).json(response);
  }
}

export const sendEmails = async (): Promise<{ success: boolean, message?: string, error?: string }> => {
  const mailService = new MailService();

  try {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = `
      SELECT s.Email, s.FirstName, m.MatchId, t1.Name as LocalTeam, t2.Name as VisitantTeam, m.Date as MatchDate
      FROM Student s
      CROSS JOIN Matches m
      LEFT JOIN Predicts p ON s.Ci = p.UserId AND m.MatchId = p.MatchId
      JOIN Team t1 ON m.localTeamId = t1.TeamId
      JOIN Team t2 ON m.visitantTeamId = t2.TeamId
      WHERE p.MatchId IS NULL
      AND m.Date > '${currentDate}';
    `;
    const [rows] = await connection.query(query);
    const dataPredicts = rows as { Email: string, FirstName: string, MatchId: number, LocalTeam: string, VisitantTeam: string, MatchDate: string }[];

    const studentEmails: { [email: string]: { FirstName: string, matches: string[] } } = {};

    for (const data of dataPredicts) {
      const { Email, FirstName, LocalTeam, VisitantTeam, MatchDate } = data;
      const dateObject = new Date(MatchDate);
      const formattedDate = dateObject.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Montevideo'
      });
      const matchInfo = `${LocalTeam} vs ${VisitantTeam} el ${formattedDate}`;

      if (!studentEmails[Email]) {
        studentEmails[Email] = { FirstName, matches: [] };
      }
      studentEmails[Email].matches.push(matchInfo);
    }

    for (const email in studentEmails) {
      const { FirstName, matches } = studentEmails[email];
      const matchList = matches.join('\n');
      const emailText = `Hola ${FirstName},\n\nNo olvides realizar tus predicciones para los siguientes partidos:\n\n${matchList}\n\n¡No te lo pierdas!`;

      await mailService.sendMail(email, '¡No olvides realizar tu predicción!', emailText);
    }

    return { success: true, message: 'Emails sent successfully.' };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { success: false, error: 'Failed to send emails. Please try again later.' };
  }
};

export default predictController;