import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string,
    iat: number,
    exp: number
}

export default function authMiddleware( req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers;
    console.log('authMiddleware called...');
    if(!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        // TODO - Change the 'secret' word to a key generated saved in .env file
        const data = jwt.verify(token, 'secret');
        // console.log(data);
        const {id} = data as TokenPayload;

        req.userId = id;
        return next();
    } catch {
        return res.sendStatus(401);
    }
}