import { memo, useCallback } from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import * as config from './config';
import { Autocompletion } from './autocompletion';
import { fitBounds, centerMap, setPolyline, convert } from './utils';

import { useState, useRef, useEffect } from 'react';
import { LatLngLiteral, DynamicMapProps } from './types';

function DynamicMapComponent({
  locationCoordinates,
  destinationCoordinates,
  setLocationCoordinates,
  setDestinationCoordinates,
  setLocationAddress,
  setDestinationAddress,
  type,
  action,
}: DynamicMapProps) {
  const [locLatLng, setLocLatLng] = useState<LatLngLiteral>();

  const [destLatLng, setDestLatLng] = useState<LatLngLiteral>();

  const mapRef = useRef<google.maps.Map | null>();

  // load the map
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew',
    libraries: config.libraries,
  });

  useEffect(() => {
    // THIS ONE IS FOR TRIP VIEW, TO BE CONFIGURED
    // locationCoordinates is in format [23, 45], so they need to be
    // converted to a LatLngLiteral, {lat: 23, lng: 45}, in order for the map to make sense of them
    if (action === 'view') {
      const latLng = convert.toLatLngObj(locationCoordinates);
      setLocLatLng(latLng);
    }

    centerMap(locLatLng!, destLatLng!, mapRef, config.center);
    fitBounds(locLatLng!, destLatLng!, mapRef);
  }, [locationCoordinates, destinationCoordinates]);

  useEffect(() => {
    // if the coordinates are given from the user, i.e. the autocompletion component, they
    // will be in LatLngLiteral form, so they will need to be converted to an array to be
    // passed to the parent component & backend
    if (locLatLng && action == 'create') {
      const locArr = convert.toArray(locLatLng!);

      setLocationCoordinates(locArr);

      if (destLatLng && setDestinationCoordinates) {
        const destArr = convert.toArray(destLatLng!);
        setDestinationCoordinates(destArr);
      }
    }

    centerMap(locLatLng!, destLatLng!, mapRef, config.center);
    fitBounds(locLatLng!, destLatLng!, mapRef);
  }, [locLatLng, destLatLng]);

  return (
    <div className='Map'>
      {isLoaded && (
        <>
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            zoom={
              type == 'activity' && locLatLng
                ? config.zoom.activity
                : config.zoom.trip
            }
            center={config.center}
            options={
              type == 'activity'
                ? config.mapOptions.activity
                : config.mapOptions.trip
            }
            mapContainerStyle={config.devStyling.mapContainerStyle}
          >
            <MarkerF position={locLatLng!} />
            <MarkerF position={destLatLng!} />

            {locLatLng && destLatLng && setPolyline(locLatLng, destLatLng)}
          </GoogleMap>

          <Autocompletion
            type={type}
            setCoordinates={setLocLatLng}
            setAddress={setLocationAddress}
          ></Autocompletion>

          {setDestinationAddress && (
            <Autocompletion
              type={type}
              setCoordinates={setDestLatLng}
              setAddress={setDestinationAddress}
            ></Autocompletion>
          )}
        </>
      )}
    </div>
  );
}

export const DynamicMap = memo(DynamicMapComponent);
