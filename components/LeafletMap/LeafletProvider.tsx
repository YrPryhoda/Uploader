import { MapContainer, TileLayer } from "react-leaflet";
import React from "react";

import LeafletContent from "./LeafletContent";
import styles from "./styles.module.scss";

interface IProps {
  geo: IGeo;
  onChange: React.Dispatch<React.SetStateAction<IGeo>>;
  children?: React.ReactNode;
}

const LeafletMap = ({ geo, onChange, children }: IProps) => {
  return (
    <div className={styles.container}>
      <MapContainer
        center={geo}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <LeafletContent geo={geo} onChange={onChange} />
        {children}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;

