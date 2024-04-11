import express from "express";
import { createBook, deleteBook, listBook, updateBook } from "./bookController";
import multer from "multer";
import path from "path";
import authenticate from "../middlewares/authenticate";
const bookRouter = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../../public/uploads/"),
  limits: { fileSize: 4e7 },
});

bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook,
);

bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook,
);
bookRouter.delete("/:bookId", authenticate, deleteBook);

bookRouter.get("/", listBook);

export default bookRouter;
