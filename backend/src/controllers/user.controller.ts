import { asyncHandler } from "../middleware/async-handler.middleware.js";
import type { Request, Response, NextFunction } from "express";
import { findByIdUserService } from "../services/user.service.js";
import { HTTPSTATUS } from "../config/http.config.js";

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction)=> {
    const userId = req.user?._id;

    const user = await findByIdUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
        message: "Current user fetched successfully",
    })
});