import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import bookModel from "./bookModel";
import fs from "fs/promises";
import { AuthRequest } from "../middlewares/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, genre } = req.body;
    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImageFile = files.coverImage[0];
    const coverImage = await cloudinary.uploader.upload(coverImageFile.path, {
      filename_override: coverImageFile.filename,
      format: coverImageFile.mimetype.split("/")[-1],
      folder: "cover-images",
    });
    const file = files.file[0];
    const uploadedFile = await cloudinary.uploader.upload(file.path, {
      filename_override: file.filename,
      format: "pdf",
      folder: "book-files",
      resource_type: "raw",
    });
    const _req = req as AuthRequest;
    const newBook = await bookModel.create({
      title,
      description,
      author: _req.userId,
      genre,
      file: uploadedFile.secure_url,
      coverImage: coverImage.secure_url,
    });

    await fs.unlink(coverImageFile.path);
    await fs.unlink(file.path);

    res.send({ id: newBook._id });
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }
};
export { createBook };
