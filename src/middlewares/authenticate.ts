import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  userId: string;
}
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return next(createHttpError(401, "Access token is required."));
    }
    const parsedToken = token.split(" ")[1];

    const decodeToken = jwt.verify(parsedToken, config.jwtSecret as string);
    const _req = req as AuthRequest;
    _req.userId = decodeToken.sub as string;
    return next();
  } catch (error) {
    return next(createHttpError(401, "Token expired."));
  }
};

export default authenticate;
