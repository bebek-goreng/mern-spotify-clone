import { clerkClient } from "@clerk/express";
import { AppError } from '../utils/app.error.js';

export const protectedRoute = async (req, res, next) => {
    try {
        if (!req.auth.userId) {
            throw new AppError('Unauthorized - you must login first', 401);
        }

        next();
    } catch (error) {
        console.log(`Auth middleware error: ${error}`);
        next(error);
    }
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            throw new AppError('Unautorized - role admin required', 403);
        }

        next();
    } catch (error) {
        console.log(`Auth middleware admin error: ${error}`);
        next(error);
    }
} 