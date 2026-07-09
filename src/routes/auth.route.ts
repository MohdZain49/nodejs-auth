import express from "express"
import { loginHandler, registerHandler, verifyEmailHandler } from "../controllers/auth/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerHandler);
authRouter.get("/verify-email", verifyEmailHandler);
authRouter.post("/login", loginHandler)

export default authRouter;