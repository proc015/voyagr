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

// const formatToLatLng = useCallback(() => {
//   if (!locationCoordinates || !destinationCoordinates) return;
//   console.log(
//     'format to loclat',
//     locationCoordinates,
//     destinationCoordinates
//   );
//   return [
//     { lat: locationCoordinates[0], lng: locationCoordinates[1] },
//     { lat: destinationCoordinates[0], lng: destinationCoordinates[1] },
//   ];
// }, [locationCoordinates, destinationCoordinates]);

// const formatted = formatToLatLng(locationCoordinates, destinationCoordinates);

// if (formatted) {
//   console.log(formatted);

//   setLocationLatLng(formatted[0]);
//   setDestinationLatLng(formatted[1]);
// }

// const formatToArray = useCallback(() => {
//   if (!locationLatLng || !destinationLatLng) return;
//   console.log('format to array', locationLatLng.lat, destinationLatLng.lng);
//   return [
//     [locationLatLng.lat, locationLatLng.lng],
//     [destinationLatLng.lat, destinationLatLng.lng],
//   ];
// }, [locationLatLng, destinationLatLng]);

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
