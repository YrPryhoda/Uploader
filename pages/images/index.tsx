import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ImagesPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/images/1");
  }, []);

  return null;
};

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      destination: "/images/1",
      permanent: true
    }
  };
};

export default ImagesPage;

