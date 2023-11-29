import { PolylineF } from '@react-google-maps/api';
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
    map.current?.panTo(defaultCenter);
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

  return <PolylineF path={path} options={lineOptions} />;
};

const convert = {
  toLatLngObj: (loc: number[]) => {
    console.log('format to loclat', loc);
    return { lat: loc[0], lng: loc[1] };
  },

  toArray: (loc: LatLngLiteral): number[] => {
    console.log('format to array', loc);

    return [loc.lat, loc.lng];
  },
};

export { centerMap, fitBounds, setPolyline, convert };
