import express from 'express';
import { authCallbackController } from '../controllers/auth.controller.js';

export const authRoute = express.Router();

authRoute.post('/callback', authCallbackController);