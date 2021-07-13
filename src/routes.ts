import {Router} from 'express';
import { celebrate, Joi } from 'celebrate';
import authMiddleware from './app/middlewares/authMiddleware';
import AuthController from './app/controllers/AuthController';
import UsersController from './app/controllers/UsersController';
import Transactions from './app/controllers/Transactions';

const router = Router();
const cutOffDate = Date.now() - (1000 * 60 * 60 * 24 * 365 * 18);

//Route to create a new User 
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} {userId, name}  - A Json with userId and name from user created
 */    
router.post(
    '/api/v1/user', 
    celebrate(
    {
        body: Joi.object().keys(
        {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            login: Joi.string().required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
            birthDate:Joi.date().max(cutOffDate).required()
        })
    }),
    UsersController.store
);

//Route to authenticate with a user 
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} {LoginUser, Token} - User information and token result
 */    
router.post(
    '/api/v1/auth',
    AuthController.authenticate
);

//Route to check an User authentication
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} {userId, name}  - A Json with userId and name from user authenticated
 */ 
router.get(
    '/api/v1/auth', 
    authMiddleware, 
    UsersController.getUser
);

//Route to save a new transaction
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} transaction - A Json with transaction created
 */ 
router.post(
    '/api/v1/transaction',
    authMiddleware,
    celebrate(
    {
        body: Joi.object().keys(
        {
            date: Joi.string().required(),
            income: Joi.number().required().min(0),
            outflow: Joi.number().required().min(0),
            description: Joi.string().required()
        })
    }),
    Transactions.store
);

//Route to update a transaction 
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
* @return {Json} transaction - A Json with transaction updated
 */ 
router.put(
    '/api/v1/transaction', 
    authMiddleware,
    celebrate(
    {
        body: Joi.object().keys(
        {
            date: Joi.string().required(),
            income: Joi.number().required().min(0),
            outflow: Joi.number().required().min(0),
            description: Joi.string().required()
        })
    }),
    Transactions.update
);

//Route to get all transactions to an User
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} result - A Json with transactions from user
 */ 
router.get(
    '/api/v1/transaction', 
    authMiddleware, 
    Transactions.getUserTransactions
);

//Route to delete a transaction to an User by transaction Date 
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} deleted - A Json with transaction deleted
 */ 
router.delete(
    '/api/v1/transaction', 
    authMiddleware, 
    Transactions.delete
);

//Route to delete a User transation looking for transaction Id 
/**
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @return {Json} deleted - A Json with transaction deleted
 */ 
router.get(
    '/api/v1/transaction/:transactionId', 
    authMiddleware, 
    Transactions.deleteById
);

export default router;