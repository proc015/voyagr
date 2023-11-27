import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

type latLng = { lat: number; lng: number };
type Props = {
  setCoordinates: (coordinates: latLng) => void;
  setAddress: (address: string) => void;
};

export function Autocompletion({ setCoordinates, setAddress }: Props) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(regions)'],
    },
  });

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={() => handleSelect(suggestion.description)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  // when user selects a suggestion, set address to selected and set coordinates to lat-lng
  const handleSelect = async (val: string) => {
    setValue(val, false);
    setAddress(val);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setCoordinates({ lat, lng });
  };

  return (
    <div className='Places'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
