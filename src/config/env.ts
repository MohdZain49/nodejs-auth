import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

const env = {
  PORT: Number(requireEnv("PORT")),
  NODE_ENV: requireEnv("NODE_ENV"),
  MONGO_URI: requireEnv("MONGO_URI"),
  SMTP_HOST: requireEnv("SMTP_HOST"),
  SMTP_PORT: Number(requireEnv("SMTP_PORT")),
  SMTP_USER: requireEnv("SMTP_USER"),
  SMTP_PASS: requireEnv("SMTP_PASS"),
  EMAIL_FROM: requireEnv("EMAIL_FROM"),
  APP_URL: requireEnv("APP_URL"),
  JWT_ACCESS_SECRET: requireEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: requireEnv("JWT_REFRESH_SECRET"),
  JWT_EMAIL_SECRET: requireEnv("JWT_EMAIL_SECRET"),
};

const ENV = Object.freeze(env);

export default ENV;
