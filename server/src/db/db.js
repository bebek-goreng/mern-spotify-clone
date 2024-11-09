import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connented to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Failed to connect in MongoDB`, error);
        process.exit(1);
    }
}