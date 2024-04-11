import { UploadApiOptions } from "cloudinary";
import cloudinary from "../config/cloudinary";
import fs from "fs/promises";
interface UploadFileProps {
  files: { [fieldName: string]: Express.Multer.File[] };
  fieldName: string;
}

export const uploadFile = async ({ files, fieldName }: UploadFileProps) => {
  const file = files[fieldName][0] as Express.Multer.File;
  const mimetype = file.mimetype.split("/")[-1];
  const cloudinaryConfig: UploadApiOptions = {
    filename_override: file.filename,
    format: mimetype,
    folder: mimetype === "pdf" ? "book-files" : "cover-images",
  };
  if (mimetype === "pdf") {
    cloudinaryConfig["resource_type"] = "raw";
  }
  const uploadedFile = await cloudinary.uploader.upload(
    file.path,
    cloudinaryConfig,
  );
  await fs.unlink(file.path);
  return uploadedFile;
};
