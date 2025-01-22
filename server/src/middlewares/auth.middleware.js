import { clerkClient } from "@clerk/express";
import { AppError } from '../utils/app.error.js';

export const protectedRoute = async (req, res, next) => {
    try {
        if (!req.auth.userId) {
            console.log("Protected route error - no user id");
        }

        next();
    } catch (error) {
        console.log(`Auth middleware error - ${error}`);
        next(error);
    }
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin" });
        }

        next();
    } catch (error) {
        console.log(`Auth middleware admin error-  ${error}`);
        next(error);
    }
} 