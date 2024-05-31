
import mysql from 'mysql2/promise';
import connection from '../db/connection';
import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs';;

class acessController {
}



export const registerUser = async (req: Request, res: Response) => {
    const { Ci, FirstName, LastName, Email, Password, Career, ChampionTeamId, SubChampionTeamId, Contact } = req.body;

    const ci = +Ci
    const championTeamId = +ChampionTeamId
    const subChampionTeamId = +SubChampionTeamId

    try {

        // Buscar si el usuario ya existe
        const [result]: any[] = await connection.execute(
            'SELECT * FROM Student WHERE Email = ?',
            [Email]
            
        );
        console.log([result])

        // Si no encuentra el usuario 
        if (result.length === 0 ) {
            const salt = bcryptjs.genSaltSync();
            const hashedPassword = bcryptjs.hashSync(Password, salt);

            // Insertar el nuevo usuario
            const userResult = await connection.execute(
                'INSERT INTO Student (Ci, FirstName, LastName, Email, Password, Career, ChampionTeamId, SubChampionTeamId, Contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [ci, FirstName, LastName, Email, hashedPassword, Career, championTeamId, subChampionTeamId, Contact]
            );
            res.json(userResult);
            console.log(userResult)
        } else {
            return res.status(401).json({
                msg: 'User already registered',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }


}
    export default acessController;
