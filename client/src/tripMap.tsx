// TODO create map config file for options objects & initialisation
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";

import { Autocompletion } from "./autocompletion";

import { useState, useRef, useMemo, useEffect } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type PolyOptions = google.maps.PolylineOptions;
// FIXME: amend below to work in useRef hook
// type MutableMap = GoogleMap | null;

export function TripMap() {
  const [locationCoordinates, setLocationCoordinates] =
    useState<LatLngLiteral>();

  const [destinationCoordinates, setDestinationCoordinates] =
    useState<LatLngLiteral>();

  // THIS WILL BE IN THE PARENT COMPONENT
  const [locationAddress, setLocationAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  useEffect(() => {
    centerMap();
    fitBounds();
    setPolyline();
  }, [destinationCoordinates, locationCoordinates]);

  const mapRef = useRef<any>(null); // FIXME: using any because of problems on mapRef.current on the onLoad prop of GoogleMap

  //DEV styling to have during dev phase
  const devStyling = {
    mapDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
    },
    mapContainerStyle: {
      width: "200px",
      height: "200px",
      borderRadius: "20px",
    },
  };

  //   DEV testing poyline options, ref https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions.strokeWeight
  // const polyOptions: PolyOptions = {
  //   geodesic: true,
  //   path: [locationCoordinates!, destinationCoordinates!],
  // };

  // load the map
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew",
    libraries: ["places"],
  });

  //   get styling options from map made in google api website
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "b7dd5188bff05f31",
      disableDefaultUI: true,
    }),
    []
  );

  // changes the map view bounds to contain both markers
  const fitBounds = () => {
    if (locationCoordinates && destinationCoordinates) {
      if (mapRef.current) {
        const bounds = new window.google.maps.LatLngBounds();

        bounds.extend(locationCoordinates);
        bounds.extend(destinationCoordinates);
        mapRef.current.fitBounds(bounds);
      }
    }
  };

  // defaulte center = Europe
  const center = useMemo<LatLngLiteral>(() => ({ lat: 42, lng: 15 }), []);

  // center map to either location or default center
  const centerMap = () => {
    if (locationCoordinates) {
      mapRef.current?.panTo(locationCoordinates);
    } else {
      mapRef.current?.panTo(center);
    }
  };

  // FIXME: first polyline not disappearing when changing loc/dest
  const setPolyline = () => {
    const path = [locationCoordinates!, destinationCoordinates!];
    return (
      <Polyline
        path={path}
        options={{
          strokeColor: "#333333",
          strokeWeight: 1,
          visible: true,
          geodesic: true,
        }}
      />
    );
  };

  return (
    <div className="Map" style={devStyling.mapDiv}>
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
