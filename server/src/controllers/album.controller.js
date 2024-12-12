import { getAllAlbums, getAlbumById } from "../services/album.service.js";

export const getAllAlbumsController = async(req, res, next) => {
    try {
        const albums = await getAllAlbums();

        res.status(200).json({
            data: albums
        });
    } catch (error) {
        next(error);
    }
}


export const getAlbumByIdController = async(req, res, next) => {
    try {
        const id = req.params.id;

        const album = await getAlbumById(id);

        res.status(200).json({
            data: album
        })
    } catch (error) {
        next(error);
    }
}