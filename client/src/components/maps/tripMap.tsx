import { memo } from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import * as config from './config';
import { Autocompletion } from './autocompletion';
import { fitBounds, centerMap, setPolyline } from './utils';

import { useState, useRef, useEffect } from 'react';

type LatLngLiteral = google.maps.LatLngLiteral;
// FIXME: amend below to work in useRef hook
// type MutableMap = GoogleMap | null;

type Props = {
  setLocationAddress: (address: string) => void;
  setDestinationAddress?: (address: string) => void;
  isActivity?: boolean;
};

function TripMapComp({
  setLocationAddress,
  setDestinationAddress,
  isActivity,
}: Props) {
  const [locationCoordinates, setLocationCoordinates] =
    useState<LatLngLiteral>();

  const [destinationCoordinates, setDestinationCoordinates] =
    useState<LatLngLiteral>();

  const mapRef = useRef<any>(null); // FIXME: using any because of problems on mapRef.current on the onLoad prop of GoogleMap

  useEffect(() => {
    centerMap(
      locationCoordinates!,
      destinationCoordinates!,
      mapRef,
      config.center
    );

    fitBounds(locationCoordinates!, destinationCoordinates!, mapRef);
  }, [destinationCoordinates, locationCoordinates]);

  // load the map
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew',
    libraries: config.libraries,
  });

  return (
    <div className='Map'>
      {isLoaded && (
        <>
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            zoom={
              isActivity && locationCoordinates
                ? config.zoom.activity
                : config.zoom.trip
            }
            center={config.center}
            options={
              isActivity ? config.mapOptions.activity : config.mapOptions.trip
            }
            mapContainerStyle={config.devStyling.mapContainerStyle}
          >
            <MarkerF position={locationCoordinates!} />
            <MarkerF position={destinationCoordinates!} />

            {locationCoordinates &&
              destinationCoordinates &&
              setPolyline(locationCoordinates!, destinationCoordinates!)}
          </GoogleMap>

          <Autocompletion
            isActivity={isActivity}
            setCoordinates={setLocationCoordinates}
            setAddress={setLocationAddress}
          ></Autocompletion>

          {setDestinationAddress && (
            <Autocompletion
              setCoordinates={setDestinationCoordinates}
              setAddress={setDestinationAddress}
            ></Autocompletion>
          )}
        </>
      )}
    </div>
  );
}

export const TripMap = memo(TripMapComp);
