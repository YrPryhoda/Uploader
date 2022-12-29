import path from "path";
import { access, mkdir } from "fs/promises";
import formidable, { Part } from "formidable";

const imagesFolderPath = path.resolve(process.cwd(), "public", "imagesDB");

export const getFormidable = async (uploadDir: string = imagesFolderPath) => {
  try {
    await access(uploadDir);
  } catch (error) {
    await mkdir(uploadDir);
  }

  const config = {
    multiples: true,
    uploadDir: uploadDir,
    maxFileSize: 10 * 1024 * 1024,
    keepExtensions: true,
    filter: ({ mimetype }: Part) => !!(mimetype && mimetype.includes("image")),
    filename: (name: string, ext: string) => `${name}-${Date.now()}${ext}`
  };

  return formidable(config);
};

