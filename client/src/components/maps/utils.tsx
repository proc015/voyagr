type LatLngLiteral = google.maps.LatLngLiteral;

export const centerMap = (
  coordinates: LatLngLiteral,
  destinationCoordinates: LatLngLiteral,
  map: any,
  defaultCenter: LatLngLiteral
) => {
  if (coordinates || destinationCoordinates) {
    map.current?.panTo(coordinates || destinationCoordinates);
  } else {
    return;
  }
};

export const fitBounds = (
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
