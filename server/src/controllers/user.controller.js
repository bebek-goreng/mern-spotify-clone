import { getAllUser, getMessage } from "../services/user.service.js";


export const getAllUserController = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await getAllUser(currentUserId);

        res.status(200).json({
            message: 'Success',
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const messagesController = async (req, res, next) => {
    try {
        const params = {
            myId: req.auth.userId,
            userId: req.params
        };

        const messages = await getMessage(params);

        res.status(200).json({
            message: 'Success',
            data: messages
        });
    } catch (error) {
        next(error);
    }
}