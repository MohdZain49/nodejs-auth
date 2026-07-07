import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is missing");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

const ENV = Object.freeze(env);

export default ENV;
