import { memo, useCallback } from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import * as config from './config';
import { Autocompletion } from './autocompletion';
import {
  fitBounds,
  centerMap,
  setPolyline,
  convert,
  getActivityLocations,
} from './utils';

import { useState, useRef, useEffect } from 'react';
import { LatLngLiteral, DynamicMapProps } from './types';

const DynamicMapComponent = ({
  locationCoordinates,
  destinationCoordinates,
  setLocationCoordinates,
  setDestinationCoordinates,
  setLocationAddress,
  setDestinationAddress,
  type,
  action,
  activities,
  style,
}: DynamicMapProps) => {
  const [locLatLng, setLocLatLng] = useState<LatLngLiteral>();

  const [destLatLng, setDestLatLng] = useState<LatLngLiteral>();

  const mapRef = useRef<google.maps.Map | null>();

  // load the map
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew',
    libraries: config.libraries,
  });

  const locations =
    action == 'view' && activities ? getActivityLocations(activities) : null;

  useEffect(() => {
    // FEED VIEW
    // center map on trip
    console.log('LOCATION', locationCoordinates);
    if (locationCoordinates && action == 'view') {
      centerMap(mapRef, convert.toLatLngObj(locationCoordinates));
    }
  }, [locationCoordinates, isLoaded]);

  useEffect(() => {
    // TRIP VIEW
    // make map fit the activity location markers
    if (locations) {
      fitBounds(locations, mapRef);
    }
  }, [activities]);

  useEffect(() => {
    if (locLatLng && action == 'create') {
      // if the coordinates are given from the user, i.e. the autocompletion component, they
      // will be in LatLngLiteral form, so they will need to be converted to an array to be
      // passed to the parent component & backend
      const locArr = convert.toArray(locLatLng);

      setLocationCoordinates && setLocationCoordinates(locArr);

      if (destLatLng && setDestinationCoordinates) {
        const destArr = convert.toArray(destLatLng!);
        setDestinationCoordinates(destArr);
      }

      // center the map to location, destination or default center
      centerMap(mapRef, locLatLng, destLatLng!);

      // make map fit the location & destination markers
      if (destLatLng) fitBounds([locLatLng, destLatLng], mapRef);
    }
  }, [locLatLng, destLatLng]);

  return (
    <div className='Map'>
      {isLoaded && (
        <>
          {setLocationAddress && (
            <Autocompletion
              type={type}
              setCoordinates={setLocLatLng}
              setAddress={setLocationAddress}
            ></Autocompletion>
          )}

          {setDestinationAddress && (
            <Autocompletion
              type={type}
              setCoordinates={setDestLatLng}
              setAddress={setDestinationAddress}
            ></Autocompletion>
          )}

          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            zoom={config.zoom[type]}
            center={config.center}
            options={config.mapOptions[type]}
            mapContainerStyle={style}
          >
            {locations &&
              locations.map((activity: any) => {
                return (
                  <MarkerF
                    position={activity.loc}
                    key={activity.activity_id}
                  ></MarkerF>
                );
              })}
            <MarkerF position={locLatLng!} />
            <MarkerF position={destLatLng!} />

            {locLatLng && destLatLng && setPolyline(locLatLng, destLatLng)}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export const DynamicMap = memo(DynamicMapComponent);
