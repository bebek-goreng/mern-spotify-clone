import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { connectionDB } from './db/db.js';
import { route } from './routes/main.route.js';
import { errorHandler } from './middlewares/error.handler.js';
import { createServer } from 'http';
import { initializeSocket } from './lib/socket.js';
import cron from 'node-cron';
import fs from 'fs';

dotenv.config();
const __dirname = path.resolve();

const app = express();

const port = process.env.PORT || 8080;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

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

const tempDir = path.join(process.cwd(), "tmp");

cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.log("error", err);
                return;
            }

            for (const file of files) {
                fs.unlink(path.join(tempDir, file), (err) => { });
            }
        });
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
    });
}

app.use(route);

if (process.env.NODE_ENV === "developmet") {
    app.use(errorHandler);
} else {
    app.use((err, req, res) => {
        res.status(500).json({
            message: "Internal Server Error"
        });
    })
}
app.use(errorHandler);

httpServer.listen(port, () => {
    console.log(`server running on port: ${port}`);
    connectionDB();
});