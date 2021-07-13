import { Request, Response} from 'express';
import {getRepository} from 'typeorm';

import Transactions from '../models/Transactions';

class TransactionsController{

    //Get all transactions related to a specific userId
    /**
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @return {Json} result - A Json with transactions from user
     */
    async getUserTransactions(req:Request, res:Response){
        console.log('Protected Route to getUserTransactions called');
        const repository = getRepository(Transactions);
        const userTransactions = await repository.find({where:{userId:req.userId}});
        if(!userTransactions){
            return res.sendStatus(404);
        }
        const elementSum = userTransactions.reduce(({prevIncome, prevOutflow},element)=>{
            return {
                prevIncome: (prevIncome + element.income),
                prevOutflow:(prevOutflow + element.outflow)
            };

        },{
            prevIncome: 0,
            prevOutflow:0
        });
        console.log("incomeSum: ",elementSum);
        const result = {
            records: userTransactions,
            recordsTotal: userTransactions.length,
            pageNumber:0,
            pageSize:0,
            balance:(elementSum.prevIncome-elementSum.prevOutflow)
        }
        return res.send(result);
    }

    //Save a new transaction from user and Date
    /**
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @return {Json} transaction - A Json with transaction created
     */
    async store(req: Request, res: Response){
        console.log("Transactions Store called")
        const repository = getRepository(Transactions);
        const {date, income, outflow, description} = req.body;
        
        const transaction = repository.create({
            dateTransaction:date, 
            income, 
            outflow, 
            description,
            userId:req.userId
        });
        await repository.save(transaction);
        return res.status(200).json(transaction);
    }

    //Update a transaction from user related to a especific Date
    /**
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @return {Json} transaction - A Json with transaction updated
     */
    async update(req: Request, res: Response){
        console.log("Transactions Update called")
        const repository = getRepository(Transactions);
        const {date, income, outflow, description} = req.body;
        console.log("Transaction date: ",date);
        const elementDate = new Date(date);
        const UpdateResult = await repository.update({dateTransaction:elementDate},{income,description,outflow});
        console.log("Transaction Update Result: ",UpdateResult);
        if(!UpdateResult.affected){
            return res.sendStatus(404);            
        }
        const transaction = await repository.findOne({dateTransaction:elementDate});

        return res.status(200).json(transaction);
    }

    //Delete a transaction from user related to a especific Date
    /**
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @return {Json} deleted - A Json with transaction deleted
     */    
    async delete(req: Request, res: Response){
        console.log("Transactions Delete called")
        const repository = getRepository(Transactions);
        const {date, income, outflow, description} = req.body;
        console.log("Transaction date: ",date);
        const elementDate = new Date(date);
        const findToDelete = await repository.findOne({dateTransaction:elementDate});
        const deleteResult = await repository.delete({id:findToDelete?.id});
        console.log("Transaction Delete Result: ",deleteResult);

        return res.status(200).json({deleted: findToDelete});
    }

    //Delete a transaction with a especific TransactionId
    /**
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @return {Json} deleted - A Json with transaction deleted
     */    
    async deleteById(req: Request, res: Response){
        console.log("Transactions deleteById called")
        const repository = getRepository(Transactions);
        const findToDelete = await repository.findOne({id:req.params.transactionId});
        const deleteResult = await repository.delete({id:req.params.transactionId});
        console.log("Transaction Delete Result: ",deleteResult);

        return res.status(200).json({deleted:findToDelete});
    }
}

export default new TransactionsController();