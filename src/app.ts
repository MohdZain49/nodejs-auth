import express from "express";
import cookieParser from "cookie-parser";

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

export default app;