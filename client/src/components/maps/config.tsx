import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

// used libraries
const libraries: Libraries = ['places'];

// zoom config
const zoom = {
  activity: 15,
  trip: 3,
};

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
    width: '300px',
    height: '300px',
    borderRadius: '20px',
  },
};

// default center = Europe
const center = { lat: 57, lng: 18 };

// choose map layout - one ID for activity, another for trip
type MapOptions = google.maps.MapOptions;
const mapOptions = {
  activity: {
    mapId: '3a4cf4c2057289d0',
    disableDefaultUI: true,
    keyboardShortcuts: false,
  },
  trip: {
    mapId: 'b7dd5188bff05f31',
    disableDefaultUI: true,
    keyboardShortcuts: false,
  },
};

// polyline layout
const lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  strokeColor: '#EA4335',
  scale: 2,
};

const lineOptions = {
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
};

const autocompletionRequestOptions = {
  activity: { locationBias: 'IP_BIAS' },
  trip: { types: ['(regions)'] },
};

export {
  libraries,
  mapOptions,
  lineOptions,
  center,
  devStyling,
  zoom,
  autocompletionRequestOptions,
};