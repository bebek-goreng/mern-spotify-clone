import { statService } from "../services/stat.service.js";

export const statController = async (req, res, next) => {
    try {
        const data = await statService();

        res.status(200).json({
            data: data
        })
    } catch (error) {
        next(error);
    }
}