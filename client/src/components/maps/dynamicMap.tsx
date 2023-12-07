import { memo, useCallback } from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import * as config from './config';
import { Autocompletion } from './autocompletion';
import pin from '../../assets/icons/pin4.png';
import {
  fitBounds,
  centerMap,
  setPolyline,
  convert,
  getActivityLocations,
  zoomIn,
} from './utils';

import { useState, useRef, useEffect } from 'react';
import { LatLngLiteral, DynamicMapProps } from './types';
import { useNavigate } from 'react-router';

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
  trip_id,
}: DynamicMapProps) => {
  const navigate = useNavigate();
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
    // FEED VIEW
    // center map on trip
    // console.log('LOCATION', locationCoordinates);
    if (locationCoordinates && action == 'view') {
      const latlng = convert.toLatLngObj(locationCoordinates);

      if (!isNaN(latlng?.lat as unknown as number)) {
        setTimeout(() => {
          centerMap(mapRef, latlng);
        }, 500); //uglyfix to have centerMap not run until map is loaded
      }
    }
  }, [locationCoordinates, isLoaded]);

  const locations =
    action == 'view' && activities ? getActivityLocations(activities) : null;

  useEffect(() => {
    // TRIP VIEW
    // make map fit the activity location markers
    setTimeout(() => {
      if (locations) {
        if (locations.length > 1) {
          fitBounds(locations, mapRef);
        } else {
          centerMap(mapRef, locations[0].loc);
        }
      }
    }, 500); //uglyfix to have fitbounds not run until map is loaded
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

      // center & zoom the map to location, destination or default center
      centerMap(mapRef, locLatLng, destLatLng!);
      type == 'activity' && zoomIn(config.zoom.activity.create, mapRef);

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
            zoom={config.zoom[type][action]}
            center={config.center}
            options={config.mapOptions[type]}
            mapContainerStyle={style}
          >
            {locations &&
              locations.map((activity: any) => {
                return (
                  <MarkerF
                    onClick={() =>
                      navigate(
                        `/trip/${trip_id}/activity/${activity.activity_id}`
                      )
                    }
                    position={activity.loc}
                    key={activity.activity_id}
                    icon={pin}
                  ></MarkerF>
                );
              })}
            <MarkerF position={locLatLng!} icon={pin} />
            <MarkerF position={destLatLng!} icon={pin} />

            {locLatLng && destLatLng && setPolyline(locLatLng, destLatLng)}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export const DynamicMap = memo(DynamicMapComponent);
