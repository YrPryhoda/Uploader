import { GetStaticProps } from "next";
import Image from "next/image";
import React, { Fragment } from "react";
import ImagesList from "../../components/ImagesList";
import { generateImagePath } from "../../lib/image/generateImagePath";

interface IProps {
  ratingList: IImage[];
}
const ImageRating = ({ ratingList }: IProps) => {
  return (
    <ImagesList images={ratingList} />
    // <Fragment>
    //   {ratingList.map((el) => {
    //     const imgPath = generateImagePath(el);

    //     return (
    //       <div key={el.id}>
    //         <h2>{el.title}</h2>
    //         <Image
    //           alt={el.title}
    //           loader={imgPath.loader}
    //           src={imgPath.src}
    //           width={300}
    //           height={300}
    //         />
    //         <p>{el.user.email}</p>
    //         <p>{el.like?.length}</p>
    //       </div>
    //     );
    //   })}
    // </Fragment>
  );
};

export default ImageRating;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const response = await fetch(`${process.env.ABS_URL}/api/reaction/rating`);
    const ratingList = await response.json();

    return {
      props: {
        ratingList
      },
      revalidate: 60
    };
  } catch (error) {
    console.log(error);
    return {
      props: {}
    };
  }
};

