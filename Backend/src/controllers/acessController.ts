
import mysql from 'mysql2/promise';
import connection from '../db/connection';
import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs';;
const { validationResult } = require('express-validator');
class acessController {
}

export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), msg: 'Error de validación' });
    }
    const { Ci, FirstName, LastName, Email, Password, Career, ChampionTeamId, SubChampionTeamId, Contact } = req.body;

    const ci = +Ci
    const championTeamId = ChampionTeamId
    const subChampionTeamId = SubChampionTeamId
    try {

        // Buscar si el usuario ya existe
        const [result]: any[] = await connection.execute(
            'SELECT * FROM Student WHERE Email = ? OR Ci = ?',
            [Email, ci]
        );

        console.log([result])

        // Si no encuentra el usuario 
        if (result.length === 0) {
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
        // Buscar usuario en la tabla Student
        const [studentResult]: any[] = await connection.execute(
            'SELECT * FROM Student WHERE Email = ?',
            [Email]
        );

        let user: any = null;
        let userType = '';

        if (studentResult.length > 0) {
            user = studentResult[0];
            userType = 'student';
        } else {
            // Si no encuentra el usuario en Student, buscar en Admin
            const [adminResult]: any[] = await connection.execute(
                'SELECT * FROM Admin WHERE Email = ?',
                [Email]
            );

            if (adminResult.length > 0) {
                user = adminResult[0];
                userType = 'admin';
            }
        }

        // Si no encuentra el usuario en ninguna de las dos tablas
        if (!user) {
            return res.status(401).json({
                msg: 'Email is not registered'
            });
        }

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
                userType: userType, // student o admin
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'INTERNAL_SERVER_ERROR' });
    }
};

export default acessController;