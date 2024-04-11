import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import { AuthRequest } from "../middlewares/authenticate";
import { uploadFile } from "../utils/uploadFile";
import userModal from "../user/userModal";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, genre } = req.body;
    const files = req.files as { [filename: string]: Express.Multer.File[] };
    const coverImage = await uploadFile({ fieldName: "coverImage", files });
    const uploadedFile = await uploadFile({ fieldName: "file", files });
    const _req = req as AuthRequest;
    const newBook = await bookModel.create({
      title,
      description,
      author: _req.userId,
      genre,
      file: uploadedFile.secure_url,
      coverImage: coverImage.secure_url,
    });

    res.send({ id: newBook._id });
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  if (!bookId) {
    return next(createHttpError(400, "Book id is required."));
  }
  const { title, description, genre } = req.body;
  const files = req.files as { [filename: string]: Express.Multer.File[] };
  try {
    const book = await bookModel.findById(bookId).populate("author");
    if (!book) {
      return next(createHttpError(404, "Book not found."));
    }
    const _req = req as AuthRequest;

    if (_req.userId !== book.author._id) {
      return next(createHttpError(403, "Permission denied."));
    }
    let newCoverImageUrl = "";
    if (files.coverImage) {
      const updatedCoverImage = await uploadFile({
        fieldName: "coverImage",
        files,
      });
      newCoverImageUrl = updatedCoverImage.secure_url;
    }
    let newFileUrl = "";
    if (files.file) {
      const updatedFile = await uploadFile({ fieldName: "file", files });
      newFileUrl = updatedFile.secure_url;
    }
    const updatedBook = await bookModel.findByIdAndUpdate(
      bookId,
      {
        title,
        description,
        genre,
        coverImage: newCoverImageUrl,
        file: newFileUrl,
      },
      { new: true },
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    return next(err);
  }
};

export { createBook, updateBook };
