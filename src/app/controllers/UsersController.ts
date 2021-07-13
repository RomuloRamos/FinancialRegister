import { Request, Response} from 'express';
import {getRepository} from 'typeorm';

import Users from '../models/Users';

class UsersController{

//This function find a User Information to an authenticated User
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} {userId, name}  - A Json with userId and name from user authenticated
 */ 
    async getUser(req:Request, res:Response){
        console.log('Protected Route to getUser called');
        const repository = getRepository(Users);
        const userExists = await repository.findOne({where:{id:req.userId}});
        if(!userExists){
            return res.sendStatus(404);
        }
        return res.send({
            userId: req.userId,
            name:userExists.name
        });
    }

//This function create a new User at User Table 
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} {userId, name}  - A Json with userId and name from user created
 */ 
    async store(req: Request, res: Response){
        const repository = getRepository(Users);
        const {birthDate, name, login, email, password} = req.body;
        
        const userExists = await repository.findOne({where:{email}});
        if(userExists){
            return res.sendStatus(401);
        }
        
        const user = repository.create({birthDate, name, login, email, password});
        await repository.save(user);
        return res.json(user);
    }
}

export default new UsersController();