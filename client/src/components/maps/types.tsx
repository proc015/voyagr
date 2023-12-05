import { Activity } from '../../types/Activity';
type LatLngLiteral = google.maps.LatLngLiteral;

type AutoCompleteProps = {
  setCoordinates?: (coordinates: LatLngLiteral) => void;
  setAddress?: (address: string) => void;
  type: 'activity' | 'trip' | 'feed';
};

type DynamicMapProps = {
  locationCoordinates?: number[];
  destinationCoordinates?: number[];
  setLocationCoordinates?: (coordinates: number[]) => void;
  setDestinationCoordinates?: (coordinates: number[]) => void;
  setLocationAddress?: (address: string) => void;
  setDestinationAddress?: (address: string) => void;
  type: 'activity' | 'trip' | 'feed';
  action: 'create' | 'view';
  activities?: Activity[];
  style: any; //FIXME: update to proper ts later
};

type StaticMapProps = {
  setAddress?: (address: string) => void;
  location: number[];
  className?: string;
};

export type {
  LatLngLiteral,
  AutoCompleteProps,
  DynamicMapProps,
  StaticMapProps,
};
