import { Polyline } from '@react-google-maps/api';
import { lineOptions } from './config';
import { LatLngLiteral } from './types';

const centerMap = (
  coordinates: LatLngLiteral,
  destinationCoordinates: LatLngLiteral,
  map: any,
  defaultCenter: LatLngLiteral
) => {
  if (coordinates || destinationCoordinates) {
    map.current?.panTo(coordinates || destinationCoordinates);
  } else {
    return;
  }
};

const fitBounds = (
  locationCoordinates: LatLngLiteral,
  destinationCoordinates: LatLngLiteral,
  map: any
) => {
  if (locationCoordinates && destinationCoordinates) {
    if (map.current) {
      const bounds = new window.google.maps.LatLngBounds();

      bounds.extend(locationCoordinates);
      bounds.extend(destinationCoordinates);
      map.current.fitBounds(bounds);
    }
  }
};

const setPolyline = (
  locationCoordinates: LatLngLiteral,
  destinationCoordinates: LatLngLiteral
) => {
  const path = [locationCoordinates!, destinationCoordinates!];

  return <Polyline path={path} options={lineOptions} />;
};

export { centerMap, fitBounds, setPolyline };
