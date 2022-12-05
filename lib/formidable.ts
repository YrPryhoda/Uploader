import path from "path";
import { access, mkdir } from "fs/promises";
import formidable, { Part } from "formidable";

export const getFormidable = async () => {
  const imagesFolderPath = path.resolve(process.cwd(), "public", "imagesDB");
  try {
    await access(imagesFolderPath);
  } catch (error) {
    await mkdir(imagesFolderPath);
  }

  const config = {
    multiples: true,
    uploadDir: imagesFolderPath,
    maxFileSize: 10 * 1024 * 1024,
    keepExtensions: true,
    filter: ({ mimetype }: Part) => !!(mimetype && mimetype.includes("image")),
    filename: (name: string, ext: string) => `${name}-${Date.now()}${ext}`
  };

  return formidable(config);
};

