import { PolylineF } from '@react-google-maps/api';
import { lineOptions, center } from './config';
import { LatLngLiteral } from './types';
import { Activity } from '../../types/Activity';

const centerMap = (
  map: any,
  coordinates?: LatLngLiteral,
  destCoordinates?: LatLngLiteral
) => {
  if (coordinates) {
    map.current?.panTo(coordinates);
  } else if (destCoordinates) map.current?.panTo(destCoordinates);
  else {
    map.current?.panTo(center);
  }
};

const fitBounds = (locations: any, map: any) => {
  if (!map.current) return;

  const bounds = new window.google.maps.LatLngBounds();

  if (locations[0]['lat'] && locations[1]) {
    //FIXME: this is not very readable
    locations.forEach((location: any) => {
      if (location != undefined) bounds.extend(location);
    });
  } else {
    locations.forEach((location: any) => {
      bounds.extend(location.loc);
    });
  }

  map.current.fitBounds(bounds);
};

const zoomIn = (count: number, map: any) => {
  if (count > 12) {
    return;
  } else {
    return setTimeout(() => {
      map.current?.setZoom(count);
      zoomIn(count + 1, map);
    }, 80);
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
    if (!loc) return;
    return { lat: Number(loc[0]), lng: Number(loc[1]) };
  },

  toArray: (loc: LatLngLiteral): number[] => {
    return [loc.lat, loc.lng];
  },
};

// FIXME: change name of this to smth more explanatory
const getActivityLocations = (activities: Activity[]) => {
  let res: any = []; //FIXME: add type def

  activities.forEach((activity) => {
    res.push({
      activity_id: activity.activity_id,
      loc: convert.toLatLngObj(activity.loc_lat_lon),
    });
  });

  return res;
};

export {
  centerMap,
  fitBounds,
  setPolyline,
  convert,
  getActivityLocations,
  zoomIn,
};
