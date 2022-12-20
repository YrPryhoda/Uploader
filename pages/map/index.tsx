import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { useEffect } from "react";

const MapRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/map/1");
  }, []);

  return null;
};

export default MapRedirect;

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      destination: "/map/1",
      permanent: true
    }
  };
};

