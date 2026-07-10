import express from "express"
import { loginHandler, refreshTokenHandler, registerHandler, verifyEmailHandler } from "../controllers/auth/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerHandler);
authRouter.get("/verify-email", verifyEmailHandler);
authRouter.post("/login", loginHandler)
authRouter.post("/refresh", refreshTokenHandler)

export default authRouter;