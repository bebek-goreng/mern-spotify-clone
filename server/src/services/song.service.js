import { Song } from '../models/song.model.js';
import { AppError } from '../utils/app.error.js';

export const getAllSongs = async (params) => {
    const songs = await Song.find().sort(params);

    if (songs) {
        throw new AppError('Internal server error - Failed to get all songs', 500);
    }

    return songs;
}

export const getFeaturedSongs = async (params) => {
    const song = await Song.aggregate([
        {
            $sample: { size: +params }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audioUrl: 1
            },
        },
    ]);

    return song;
}

export const getMadeForYou = async (params) => {

    const songs = await Song.aggregate([
        {
            $sample: { size: +params || 4 },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audioUrl: 1,
            },
        },
    ]);

    return songs;
}

export const getTrendingSongs = async (params) => {

    const songs = await Song.aggregate([
        {
            $sample: { size: +params || 4 },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audioUrl: 1,
            },
        },
    ]);

    return songs;
}