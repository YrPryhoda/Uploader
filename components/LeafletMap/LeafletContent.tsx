import { Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import styles from "./styles.module.scss";

interface IProps {
  geo: IGeo;
  onChange: React.Dispatch<React.SetStateAction<IGeo>>;
}

const LeafletContent = ({ geo, onChange }: IProps) => {
  const icon = L.icon({
    iconUrl: "map-icon.svg",
    popupAnchor: [-0, -0],
    iconSize: [30, 30]
  });
  const map = useMapEvents({
    click(e) {
      onChange(e.latlng);
    }
  });

  useEffect(() => {
    map.setView(geo);
  }, [geo, map]);

  return (
    <div className={styles.container}>
      <Marker icon={icon} position={geo}></Marker>
    </div>
  );
};

export default LeafletContent;

