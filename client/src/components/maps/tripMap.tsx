// TODO create map config file for options objects & initialisation
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Polyline,
} from '@react-google-maps/api';

import { Autocompletion } from './autocompletion';
import { fitBounds, centerMap } from './utils';

import { useState, useRef, useMemo, useEffect } from 'react';

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
// FIXME: amend below to work in useRef hook
// type MutableMap = GoogleMap | null;

type Props = {
  setLocationAddress: (address: string) => void;
  setDestinationAddress: (address: string) => void;
};

export function TripMap({ setLocationAddress, setDestinationAddress }: Props) {
  const [locationCoordinates, setLocationCoordinates] =
    useState<LatLngLiteral>();

  const [destinationCoordinates, setDestinationCoordinates] =
    useState<LatLngLiteral>();

  const mapRef = useRef<any>(null); // FIXME: using any because of problems on mapRef.current on the onLoad prop of GoogleMap

  useEffect(() => {
    centerMap(locationCoordinates!, destinationCoordinates!, mapRef, center);
    fitBounds(locationCoordinates!, destinationCoordinates!, mapRef);
    setPolyline();
  }, [destinationCoordinates, locationCoordinates]);

  // load the map
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew',
    libraries: ['places'],
  });

  // default center = Europe
  const center = { lat: 57, lng: 18 };

  //DEV styling to have during dev phase
  const devStyling = {
    mapDiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
    },
    mapContainerStyle: {
      width: '200px',
      height: '200px',
      borderRadius: '20px',
    },
  };

  //   get styling options from map made in google api website
  const options = useMemo<MapOptions>(
    () => ({
      mapId: 'b7dd5188bff05f31',
      disableDefaultUI: true,
    }),
    []
  );

  // FIXME: first polyline not disappearing when changing loc/dest
  const setPolyline = () => {
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      strokeColor: '#EA4335',
      scale: 2,
    };

    const path = [locationCoordinates!, destinationCoordinates!];

    return (
      <Polyline
        path={path}
        options={{
          // strokeColor: '#333333',
          // strokeWeight: 1,
          strokeOpacity: 0,
          visible: true,
          geodesic: true,
          icons: [
            {
              icon: lineSymbol,
              offset: '0',
              repeat: '10px',
            },
          ],
        }}
      />
    );
  };

  return (
    <div className='Map' style={devStyling.mapDiv}>
      {isLoaded && (
        <>
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            zoom={2}
            center={center}
            options={options}
            mapContainerStyle={devStyling.mapContainerStyle}
          >
            <MarkerF position={locationCoordinates!} />
            <MarkerF position={destinationCoordinates!} />

            {locationCoordinates && destinationCoordinates && setPolyline()}
          </GoogleMap>
          <Autocompletion
            setCoordinates={setLocationCoordinates}
            setAddress={setLocationAddress}
          ></Autocompletion>

          <Autocompletion
            setCoordinates={setDestinationCoordinates}
            setAddress={setDestinationAddress}
          ></Autocompletion>
        </>
      )}
    </div>
  );
}
