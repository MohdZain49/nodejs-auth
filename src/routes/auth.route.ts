import express from "express"
import { registerHandler, verifyEmailHandler } from "../controllers/auth/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerHandler);
authRouter.get("/verify-email", verifyEmailHandler)

export default authRouter;