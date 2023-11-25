import Autocomplete from "react-google-autocomplete";

export function Places() {
  return (
    <Autocomplete
      apiKey={process.env.REACT_APP_MAPS_API_KEY}
      onPlaceSelected={(place) => console.log(place)}
    />
  );
}
