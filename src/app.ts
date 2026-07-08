import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.get("/health", (_, res) => { 
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/auth", authRouter)


export default app;