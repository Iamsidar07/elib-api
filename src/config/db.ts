import mongoose from "mongoose";
import { config } from "./config";

export const dbConnect = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to db.");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Failed to connect to db", error.message);
    });
    await mongoose.connect(config.dbUri as string);
  } catch (error) {
    console.log("Failed to make connection to the db.");
    process.exit(1);
  }
};
