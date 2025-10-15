import { RegisterSchema } from "../validators/auth.validator.js"
import { HTTPSTATUS } from "../config/http.config.js"
import type { Request, Response } from "express"
import { registerService } from "../services/auth.service.js"
import { asyncHandler } from "../middleware/async-handler.middleware.js"


export const RegisterController = asyncHandler(async (req: Request, res: Response) => {  

    const body = RegisterSchema.parse(req.body)

    const result = await registerService(body);

    return res.status(HTTPSTATUS.CREATED).json({message: "User registered", user: result});
})
