import { useMapEvents } from "react-leaflet";
import { debounce } from "debounce";
import React from "react";

import styles from "./styles.module.scss";

interface IProps {
  onNewGeo: (arg: IGeo) => void;
  onSearch: () => void;
}

const MapHandler = ({ onNewGeo, onSearch }: IProps) => {
  const handlerSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSearch();
  };

  const map = useMapEvents({
    click: (event) => {
      // @ts-ignore-next-line
      if (event.originalEvent.target?.nodeName === "BUTTON") {
        return;
      }

      onNewGeo(event.latlng);
    },
    move: debounce(() => {
      const center = map.getCenter();
      onNewGeo(center);
    }, 700)
  });

  return (
    <button className={styles.btn_search} onClick={handlerSearch}>
      Search in this area
    </button>
  );
};

export default MapHandler;

