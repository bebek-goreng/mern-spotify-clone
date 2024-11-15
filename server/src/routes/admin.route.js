import express from 'express';
import { createAlbumController, createSongController, deleteSongController } from '../controllers/admin.controller.js';
import { protectedRoute, requireAdmin } from '../middlewares/auth.middleware.js';
import { checkAdmin } from '../services/admin.service.js';

export const adminRoute = express.Router();

adminRoute.use(protectedRoute, requireAdmin);
adminRoute.get('/check', checkAdmin);
adminRoute.post('/songs/create', createSongController);
adminRoute.post('/songs/delete/:id', deleteSongController);
adminRoute.post('/album/create', createAlbumController);
adminRoute.delete('/album/delete/:id', createAlbumController);