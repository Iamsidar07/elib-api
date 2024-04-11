import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const _config = {
  port: process.env.PORT,
  dbUri: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecretKey: process.env.CLOUDINARY_SECRET_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  frontendDomain: process.env.FRONTEND_DOMAIN,
};

// make _config readonly
export const config = Object.freeze(_config);
