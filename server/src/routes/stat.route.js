import express from "express";
import { protectedRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { statController } from "../controllers/stat.controller.js";

export const statRoute = express.Router();

statRoute.get('/stats', protectedRoute, requireAdmin, statController);