import { Router } from "express";
import { RegisterController } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", RegisterController);

export default authRoutes;