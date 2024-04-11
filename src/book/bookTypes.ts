import { Document } from "mongoose";
import { User } from "../user/userTypes";

export interface Book extends Document {
  _id: string;
  title: string;
  description: string;
  author: User;
  coverImage: string;
  file: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}
