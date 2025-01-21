import { getAllSongs, getFeaturedSongs, getMadeForYou } from "../services/song.service.js";

export const getAllSongsController = async (req, res, next) => {
    try {
        const params = {
            createdAt: -1
        };

        const songs = await getAllSongs(params);

        res.status(200).json({
            message: 'Success',
            data: songs
        });
    } catch (error) {
        next(error);
    }
}

export const getFeaturedSongsController = async (req, res, next) => {
    try {
        const size = parseInt(req.query.size, 10) || 6;

        const songs = await getFeaturedSongs(size);

        res.status(200).json({
            message: 'Success',
            data: songs
        })
    } catch (error) {
        next(error);
    }
}

export const getMadeForYouController = async (req, res, next) => {
    try {
        const size = parseInt(req.query.size, 5) || 4;

        const songs = await getMadeForYou(size);

        res.status(200).json({
            message: 'Success',
            data: songs
        });
    } catch (error) {
        next(error);
    }
}

export const getTrendingSongs = async(req, res, next) => {
    try {
        const songs = await getTrendingSongs();

        res.status(200).json({
            data: songs
        })
    } catch (error) {
        next(error)
    }
}