import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { imagesSliceSelector } from "../../store/slices/images/images.slice";
import { getByCoordinates } from "../../store/slices/images/images.actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ImageOverview from "../../components/ImageOverview";
import ImagesList from "../../components/ImagesList";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import styles from "../../styles/Page.module.css";
import { debounce } from "debounce";

const NoSSRMap = dynamic(
  () => import("../../components/LeafletMap/LeafletProvider"),
  {
    ssr: false
  }
);
const NoSSRMarkers = dynamic(() => import("../../components/MapIconMarkers"), {
  ssr: false
});
const NoSSRMapHandler = dynamic(() => import("../../components/MapHandler"), {
  ssr: false
});

const MapPage = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const [center, setCenter] = useState({ lat: 50.51, lng: 30.52 });
  const [selectedMarker, setSelectedMarker] = useState<
    IImage | IImage[] | null
  >(null);
  const { loading, images, galleryTotal } = useAppSelector(imagesSliceSelector);
  const dispatch = useAppDispatch();

  const onNewSearch = useCallback(() => {
    dispatch(getByCoordinates({ ...center, page }));
  }, [center, dispatch, page]);

  const onSearchBtnClick = () => {
    if (!images.length) {
      router.replace("/map/1", undefined, { shallow: true });
    }

    onNewSearch();
  };

  useEffect(() => {
    console.log("RENDER!");

    navigator.permissions
      .query({ name: "geolocation" })
      .then(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      })
      .then(() => {
        onNewSearch();
      });
  }, [onNewSearch]);

  const onClick = (img: IImage) => {
    const selectedImg = images.filter(
      (el) => el.lat === img.lat && el.lng === img.lng
    );
    if (!selectedImg) {
      return;
    }
    setSelectedMarker(selectedImg);
  };

  const onClose = () => setSelectedMarker(null);

  return (
    <div className={styles.map_container}>
      <NoSSRMap geo={center} onChange={() => {}}>
        <NoSSRMarkers onClick={onClick} />
        <NoSSRMapHandler onNewGeo={setCenter} onSearch={onSearchBtnClick} />
      </NoSSRMap>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.map_section}>
          <ImagesList images={images} />
          {images.length ? (
            <Pagination total={galleryTotal} href={"/map/"} />
          ) : null}
        </div>
      )}
      {!!selectedMarker && (
        <ImageOverview image={selectedMarker} onClose={onClose} />
      )}
    </div>
  );
};

export default MapPage;

