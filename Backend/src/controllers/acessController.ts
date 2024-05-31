
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
    
    export const login = async (req: Request, res: Response) => {
        const { Email, Password } = req.body;
    
        try {
            // Buscar usuario por Email
            const [result]: any[] = await connection.execute(
                'SELECT * FROM Student WHERE Email = ?',
                [Email]
            );
    
            // Si no encuentra el usuario
            if (result.length === 0) {
                return res.status(401).json({
                    msg: 'Email is not registered'
                });
            }
    
            const user = result[0];
    
            // Verificar la contraseña
            const validPassword = bcryptjs.compareSync(Password, user.Password);
            if (!validPassword) {
                return res.status(401).json({
                    msg: 'Password is not correct'
                });
            } else {
                return res.status(200).json({
                    msg: 'Logged in successfully!',
                    userId: user.Ci,
                    user: {
                        Ci: user.Ci,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Email: user.Email,
                        Career: user.Career,
                        ChampionTeamId: user.ChampionTeamId,
                        SubChampionTeamId: user.SubChampionTeamId,
                        Contact: user.Contact
                    }
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
        }
    }

    export default acessController;
