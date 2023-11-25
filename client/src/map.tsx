import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type PolyOptions = google.maps.PolylineOptions;

export function Map() {
  const [location, setLocation] = useState<LatLngLiteral>({
    lat: 63.45,
    lng: -80.49,
  });
  const [destination, setDestination] = useState<LatLngLiteral>({
    lat: 65.45,
    lng: -60.49,
  });
  const mapRef = useRef<GoogleMap>();

  //DEV styling to have during dev phase
  const devStyling = {
    mapDiv: {
      display: "flex",
      justifyContent: "center",
    },
    mapContainerStyle: {
      width: "600px",
      height: "600px",
    },
  };

  //   DEV testing flightpath
  // const flightPath = new google.maps.Polyline({
  //     path: [location, destination],
  //     geodesic: true,
  //     strokeColor: "#FF0000",
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2,
  //   });

  //   DEV testing poyline options, ref https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions.strokeWeight
  const polyOptions: PolyOptions = {
    geodesic: true,
    path: [location, destination],
  };

  // load the map
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew",
  });

  //   set default view
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 43.45, lng: -80.49 }),
    []
  );

  //   get styling options from map made in google api website
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "b7dd5188bff05f31",
      //   disableDefaultUI: true,
    }),
    []
  );

  //   set a reference to the current map state (so that we can go from pan the view from there without re-centering it)
  const onLoad = useCallback((map: GoogleMap) => (mapRef.current = map), []);

  return (
    <div className="Map" style={devStyling.mapDiv}>
      {isLoaded && (
        <GoogleMap
          zoom={3}
          center={location}
          options={options}
          mapContainerStyle={devStyling.mapContainerStyle}
          //  onLoad={onLoad}
        >
          <MarkerF position={location} />
          <MarkerF position={destination} />
          <Polyline
            path={[location, destination]}
            options={{
              strokeColor: "#FF0000",
              strokeWeight: 2,
              visible: true,
              geodesic: true,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
}
