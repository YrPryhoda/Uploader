import L from "leaflet";

export const renderIcon = (path = "/map-icon.svg") =>
  L.icon({
    iconUrl: path,
    popupAnchor: [-0, -0],
    iconSize: [30, 30],
  });

