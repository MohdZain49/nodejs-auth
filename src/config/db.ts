import mongoose from "mongoose";
import ENV from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Database connected successfully!!", mongoose.connection.name);
  } catch (err) {
    console.error("Error: Failed to connect database!!");
    console.error(err);
    process.exit(1);
  }
};