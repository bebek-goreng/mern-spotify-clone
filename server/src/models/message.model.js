import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
}, {timestamps: true});

export const Message = mongoose.model('Message', messageSchema);