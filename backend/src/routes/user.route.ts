import { Router } from "express";
import { RegisterController, loginController } from "../controllers/auth.controller.js";
import { getCurrentUserController } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/currentUser", getCurrentUserController);

export default userRoutes;