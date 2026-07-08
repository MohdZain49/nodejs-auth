import express from "express"
import { registerHandler } from "../controllers/auth/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerHandler);

export default authRouter;