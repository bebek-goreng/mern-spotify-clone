import express from 'express';
import { authRoute } from './auth.route.js';
import { userRoute } from './user.route.js';
import { adminRoute } from './admin.route.js';
import { songRoute } from './song.route.js';
import { statRoute } from './stat.route.js';
import { albumRoute } from './album.route.js';

export const route = express.Router();

route.use('/api/albums', albumRoute)
route.use('/api/auth', authRoute);
route.use('/api', userRoute);
route.use('/api/admin', adminRoute);
route.use('/api/songs', songRoute);
route.use('/api/stat', statRoute);