import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is missing");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

if (!process.env.SMTP_HOST) {
  throw new Error("SMTP_HOST is missing");
}

if (!process.env.SMTP_PORT) {
  throw new Error("SMTP_PORT is missing");
}

if (!process.env.SMTP_USER) {
  throw new Error("SMTP_USER is missing");
}

if (!process.env.SMTP_PASS) {
  throw new Error("SMTP_PASS is missing");
}

if (!process.env.EMAIL_FROM) {
  throw new Error("EMAIL_FROM is missing");
}

if (!process.env.APP_URL) {
  throw new Error("APP_URL is missing");
}

if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is missing");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is missing");
}

if (!process.env.JWT_EMAIL_SECRET) {
  throw new Error("JWT_EMAIL_SECRET is missing");
}

const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT || "587"),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_FROM: process.env.SMTP_FROM,
  APP_URL: process.env.APP_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET,
};

const ENV = Object.freeze(env);

export default ENV;
