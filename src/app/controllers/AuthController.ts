import { config } from "dotenv";
config();
import { Request, Response} from 'express';
import {getRepository} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

class AuthController{

    // Authentication function
    /**
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @return {Json} {LoginUser, Token} - User information and token result
     */
    async authenticate(req: Request, res: Response){
        const repository = getRepository(Users);
        const {login, password} = req.body;
                
        const user = await repository.findOne({where:{login}});
        if(user){
            const isValidPassword = await bcrypt.compare(password, user.password );
            if(isValidPassword){
                // const token = jwt.sign({id:user.id},process.env.SECRET,{expiresIn:'1d'} );
                const secret = process.env.SECRET || '';
                const token = await jwt.sign({id:user.id},secret,{expiresIn:'1d'} );
                const LoginUser = {
                    name: user.name,
                    login: user.login,
                    email: user.email,
                    birthDate: user.birthDate
                }
                return res.json({
                    LoginUser,
                    token
                });
            }
        }
        

        return res.sendStatus(401);
    }
}

export default new AuthController();