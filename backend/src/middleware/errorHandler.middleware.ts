import type { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config.js";
import { AppError } from "../utils/app-error.js";


export const errorHandler: ErrorRequestHandler = (err:any, req:any, res:any, next:any) => {
    console.log("Error occured on Path:", req.path);

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message,
            error: err.errorCode
        })
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: err?.message || "An unexpected error occurred"
    });
}