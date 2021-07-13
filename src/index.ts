import 'reflect-metadata';
import express from "express";
import './database/connect';
import routes from "./routes";
import { errors } from 'celebrate';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express(); 
app.use(express.json());
app.use(routes);
app.use(errors());
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
})