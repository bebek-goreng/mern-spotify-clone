import { Album } from '../models/album.model.js';
import {AppError} from '../utils/app.error.js';

export const getAllAlbums = async (params) => {
    const albums = await Album.find();

    if(!albums) {
        throw new AppError('Internal server error - failed to get all albums', 500);
    }

    return albums;
} 

export const getAlbumById = async(params) => {
    if(!params) {
        throw new AppError('Invalid input - params id required', 400);
    }

    const album = await Album.findById(params).populate("songs");

    if(!album) {
        throw new AppError('Album not found', 404);
    }

    return album;
}
