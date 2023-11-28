type LatLngLiteral = google.maps.LatLngLiteral;

type AutoCompleteProps = {
  setCoordinates?: (coordinates: LatLngLiteral) => void;
  setAddress: (address: string) => void;
  isActivity?: boolean;
};

type DynamicMapProps = {
  setLocationAddress: (address: string) => void;
  setDestinationAddress?: (address: string) => void;
  isActivity?: boolean;
};

type StaticMapProps = {
  setAddress: (address: string) => void;
  location: string;
};

export type {
  LatLngLiteral,
  AutoCompleteProps,
  DynamicMapProps,
  StaticMapProps,
};
