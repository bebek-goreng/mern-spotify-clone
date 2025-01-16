import { User } from '../models/user.model.js';
import { AppError } from '../utils/app.error.js';
import { Message } from '../models/message.model.js';


export const getAllUser = async (params) => {
    const users = await User.find({
        clerkId: { $ne: params }
    });

    if (!users) {
        throw new AppError('Internal server error - Failed to get all user', 500)
    }

    return users;
}

export const getMessage = async (params) => {
    const { myId, userId } = params;

    const messages = await Message.find({
        $or: [
            { senderId: userId, receiverId: myId },
            { senderId: myId, receiverId: userId }
        ]
    });

    if (!messages) {
        throw new AppError('Dont have any message yet', 404);
    }

    return messages;
}