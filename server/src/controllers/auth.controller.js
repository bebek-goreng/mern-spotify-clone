import { authCallback } from '../services/auth.service.js';

export const authCallbackController = async (req, res, next) => {
    try {
        const params = req.body;

        await authCallback(params);

        res.status(200).json({
            success: true
        });
    } catch (error) {
        console.log(`Error in auth callback: ${error}`);
        next(error);
    }
}