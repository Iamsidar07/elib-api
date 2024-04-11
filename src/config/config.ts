import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const _config = {
  port: process.env.PORT,
  dbUri: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
};

// make _config readonly
export const config = Object.freeze(_config);
