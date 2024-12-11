import express from 'express';
import { getAllSongsController, getFeaturedSongsController, getMadeForYouController } from '../controllers/song.controller.js';
import { protectedRoute, requireAdmin } from '../middlewares/auth.middleware.js';

export const songRoute = express.Router();

songRoute.get('/all-songs', protectedRoute, requireAdmin, getAllSongsController);
songRoute.get('/featured', getFeaturedSongsController);
songRoute.get('/made-for-you', getMadeForYouController);
songRoute.get('/trending', getFeaturedSongsController);