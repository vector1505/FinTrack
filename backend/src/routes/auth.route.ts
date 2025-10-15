import { Router } from "express";
import { RegisterController, loginController } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", RegisterController);
authRoutes.post("/login", loginController);

export default authRoutes;