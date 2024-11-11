import express from 'express';
import { authRoute } from './auth.route.js';

export const route = express.Router();

route.use('/api/auth', authRoute);