import express from "express";
import { getAlbumByIdController, getAllAlbumsController } from "../controllers/album.controller.js";

export const albumRoute = express.Router();

albumRoute.get('/', getAllAlbumsController);
albumRoute.get('/:id', getAlbumByIdController);