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
    const { size } = params;
    const song = await Song.aggregate([
        {
            $sample: { size: size }
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
    const { size } = params;

    const songs = await Song.aggregate([
        {
            $sample: { size: size || 4 },
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
    const { size } = params;

    const songs = await Song.aggregate([
        {
            $sample: { size: size || 4},
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