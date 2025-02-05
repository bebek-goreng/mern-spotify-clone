import { createAlbum, createSong, deleteAlbum, deleteSong } from "../services/admin.service.js";

export const createSongController = async (req, res, next) => {
    try {
        const params = {
            requestFile: req.files,
            audioFile: req.files.audio,
            imageFile: req.files.imageFile,
            data: { ...req.body }
        }

        const song = await createSong(params);

        res.status(201).json({
            message: 'Success',
            data: song
        });
    } catch (error) {
        next(error);
    }
}

export const deleteSongController = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await deleteSong(id);

        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        next(error);
    }
}

export const createAlbumController = async (req, res, next) => {
    try {
        const params = {
            data: { ...req.body },
            imageFile: req.files.imageFile
        }

        const album = await createAlbum(params);

        res.status(201).json({
            message: 'Success',
            data: album
        });
    } catch (error) {
        next(error);
    }
}

export const deleteAlbumController = async (req, res, next) => {
    try {
        const id = req.params.id;

        await deleteAlbum(id);

        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        res.status(200).json({
            admin: true
        });
    } catch (error) {
        console.log(error);
        res.status(403).json({
            message: "Check admin error - You dont have authorized"
        })
    }
}