import express, { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";

const app = express();

// routing
app.get("/", (req, res, next) => {
  const error = createHttpError(400, "Something went wrong");

  throw error;
  res.json({ message: "hello" });
});

// global error handler at bottom
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message,
    errorStack: config.env === "development" ? error.stack : "",
  });
});

export default app;
