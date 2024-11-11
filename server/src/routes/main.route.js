import express from 'express';
import { authRoute } from './auth.route.js';
import { userRoute } from './user.route.js';

export const route = express.Router();

route.use('/api/auth', authRoute);
route.use('/api', userRoute);