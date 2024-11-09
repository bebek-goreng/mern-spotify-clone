import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectionDB } from './db/db.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
    connectionDB();
});