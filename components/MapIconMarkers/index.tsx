import { Marker } from "react-leaflet";
import React from "react";

import { imagesSliceSelector } from "../../store/slices/images/images.slice";
import { useAppSelector } from "../../store/hooks";
import { renderIcon } from "../../lib/map-marker";
import { generateImagePath } from "../../lib/image/generateImagePath";

interface IProps {
  onClick: (arg: IImage) => void;
}

const MapIconMarkers = ({ onClick }: IProps) => {
  const { images } = useAppSelector(imagesSliceSelector);

  const markersJSX = images.length
    ? images.map((el) => {
        if (el.lat && el.lng) {
          const imgPath = generateImagePath(el);

          return (
            <Marker
              eventHandlers={{
                click: () => onClick(el)
              }}
              icon={renderIcon(
                imgPath.loader
                  ? imgPath.loader({ src: el.title, width: 200 })
                  : imgPath.src
              )}
              key={el.id}
              position={{ lat: el.lat, lng: el.lng }}
            />
          );
        }
      })
    : null;

  return <>{markersJSX}</>;
};

export default MapIconMarkers;

