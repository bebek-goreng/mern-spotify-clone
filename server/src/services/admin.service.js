import { AppError } from "../utils/app.error.js";
import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';
import { uploadToCloudinary } from "../utils/cloudinary.upload.js";


export const createSong = async (params) => {
    const { requestFile, audioFile, imageFile, data } = params;
    const { title, artist, albumId, duration } = data;

    if (!requestFile || !audioFile || !imageFile) {
        throw new AppError('Plese upload file', 400);
    }

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumId: albumId || null
    });

    await song.save();

    if (albumId) {
        await Album.findByIdAndUpdate(albumId, {
            $push: { songs: song._id }
        });
    }

    return song;

}

export const deleteSong = async (params) => {
    const song = await Song.findById(params);

    if (song.albumId) {
        await Album.findByIdAndUpdate(song.albumId, {
            $pull: { songs: song._id }
        });
    }

    await Song.findByIdAndDelete(params);

    return;
}

export const createAlbum = async (params) => {
    const { data, imageFile } = params;
    const { title, artist, releaseYear } = data;

    const existingAlbum = await Album.findOne({
        title,
        artist
    });

    if (existingAlbum) {
        throw new AppError('Album already exist', 400);
    }

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
        title,
        artist,
        imageUrl,
        releaseYear
    });

    await album.save();

    return album;
}

export const deleteAlbum = async (params) => {
    if (!params) {
        throw new AppError('ID album required', 400);
    }

    await Song.deleteMany({ albumId: params });
    await Album.findByIdAndDelete(params);

    return;
}

