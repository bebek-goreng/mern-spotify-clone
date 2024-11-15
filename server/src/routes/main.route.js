import express from 'express';
import { authRoute } from './auth.route.js';
import { userRoute } from './user.route.js';
import { adminRoute } from './admin.route.js';

export const route = express.Router();

route.use('/api/auth', authRoute);
route.use('/api', userRoute);
route.use('/api/admin', adminRoute);