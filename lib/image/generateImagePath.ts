import { ImageLoader } from "next/image";

export const generateImagePath = (image: IImage) => {
  const isLocal = image.title.startsWith("https://loremflickr");
  const imageUrl: ImageLoader = () => image.title;

  return {
    loader: isLocal ? imageUrl : undefined,
    src: `/imagesDB/${image.title}`
  };
};

