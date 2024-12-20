import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { connectionDB } from './db/db.js';
import { route } from './routes/main.route.js';
import { errorHandler } from './middlewares/error.handler.js';

dotenv.config();
const __dirname = path.resolve();

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}));
app.use(route);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
    connectionDB();
});