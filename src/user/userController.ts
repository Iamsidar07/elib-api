import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModal from "./userModal";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(404, "All fields are required.");
    return next(error);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await userModal.findOne({
      email,
    });
    if (user) {
      return next(createHttpError(400, "User allready exist with this email."));
    }
  } catch (error) {
    return next(createHttpError(500, "Failed to get user."));
  }
  let newUser: User;
  try {
    newUser = await userModal.create({
      email,
      name,
      password: hashPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Failed to create user."));
  }

  const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
    expiresIn: "7d",
  });
  res.status(201).json({ accessToken: token });
};

export { createUser };
