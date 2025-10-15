import { config } from "dotenv";
config({ path: "../.env" });

import express from "express";
import type { NextFunction, Request, Response } from "express";
import { Env } from "./config/env.config.js";
import cors from "cors";
import { HTTPSTATUS } from "./config/http.config.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { BadRequestException } from "./utils/app-error.js";
import { asyncHandler } from "./middleware/async-handler.middleware.js";
import connectDatabase from "./config/database.config.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors(
        {
            origin: Env.FRONTEND_ORIGIN,
            credentials: true,
        }
    )
);

app.get("/", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        //throw new BadRequestException("Test error");
    res.status(HTTPSTATUS.OK).json({
        message: "Hello and welcome to the source code"
    })
    } catch (error) {
        next(error);
    }

}));

// Mount auth routes
app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);


app.listen(Env.PORT, async () => {
    connectDatabase();
    console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})