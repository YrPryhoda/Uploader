import React from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/Page.module.css";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const NoSSRMap = dynamic(
  () => import("../../components/LeafletMap/LeafletProvider"),
  {
    ssr: false
  }
);

const MapPage = () => {
  return (
    <div className={styles.map_container}>
      <NoSSRMap geo={{ lat: 50, lng: 38 }} onChange={() => {}} />
    </div>
  );
};

export default MapPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
	try {
		
	} catch (error) {
		
	}
  return { props: {} };
};

