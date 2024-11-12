import cloudinary from '../lib/coudinary.js';
import { AppError } from './app.error.js';

export const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        });

        return result.secure_url;
    } catch (error) {
        console.log(`error to upload file in cloudinary: ${error}`);
        throw new AppError('Internal server error - error to upload file in cloudinary', 500);
    }
}