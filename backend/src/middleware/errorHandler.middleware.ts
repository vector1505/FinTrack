import type { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config.js";
import { AppError } from "../utils/app-error.js";
import {z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import type { NextFunction, Request, Response } from "express";

const formatZodError = (err: ZodError, res: Response) => {
    const formattedErrors = err?.issues?.map((e) => ({
        message: e.message,
        path: e.path
    }));
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Validation Error",
        errors: formattedErrors,
        errorCode: ErrorCodeEnum.VALIDATION_FAILED
    });
};

export const errorHandler: ErrorRequestHandler = (err:any, req:any, res:any, next:any) => {
    console.log("Error occured on Path:", req.path, " Error: ",err);

    if (err instanceof ZodError) {
        return formatZodError(err, res);
    }

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