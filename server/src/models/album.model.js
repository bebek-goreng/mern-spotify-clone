import mongoose from 'mongoose';

export const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imagUrl: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
}, {timestamps: true});

export const Album = mongoose.model('Album', albumSchema);