import express from 'express';
import { getAllUserController, messagesController } from '../controllers/user.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

export const userRoute = express.Router();

userRoute.use(protectedRoute);
userRoute.get('/users', getAllUserController);
userRoute.get('/user/messages/:userId', messagesController);