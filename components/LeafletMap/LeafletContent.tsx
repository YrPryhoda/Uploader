import { Marker, useMapEvents } from "react-leaflet";
import React, { useEffect } from "react";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

import { renderIcon } from "../../lib/map-marker";

interface IProps {
  geo: IGeo;
  onChange: React.Dispatch<React.SetStateAction<IGeo>>;
}

const LeafletContent = ({ geo, onChange }: IProps) => {
  const map = useMapEvents({
    click(e) {
      onChange(e.latlng);
    }
  });

  useEffect(() => {
    map.setView(geo);
  }, [geo, map]);

  return <Marker icon={renderIcon()} position={geo}></Marker>;
};

export default LeafletContent;

