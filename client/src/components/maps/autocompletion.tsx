import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { autocompletionRequestOptions as requestOptions } from './config';
import { MouseEvent } from 'react';
import { AutoCompleteProps } from './types';

export function Autocompletion({
  setCoordinates,
  setAddress,
  type,
}: AutoCompleteProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions:
      type === 'activity' ? requestOptions.activity : requestOptions.trip,
  });

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li
          key={place_id}
          onClick={(e: MouseEvent<HTMLLIElement>) =>
            handleSelect(e, suggestion.description)
          }
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  // when user selects a suggestion, set address to selected and set coordinates to lat-lng
  const handleSelect = async (e: MouseEvent<HTMLLIElement>, val: string) => {
    e.preventDefault();
    setValue(val, false);
    if (setAddress) setAddress(val);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    if (setCoordinates) setCoordinates({ lat, lng });
  };

  return (
    <div className='Places'>
      <input
        className='mt-1 block w-[95%] px-5 py-4 border border-gray-300 rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto'
        placeholder='enter a location'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
