import { MouseEventHandler } from 'react';
import { publishTrip } from '../services/apiService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Publish = () => {
  const trip_id: number = useSelector(
    (state: RootState) => state.tripid.currentTrip
  );

  const handlePublish: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log('the button was clicked');
    publishTrip(trip_id);
  };

  return (
    <div>
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
};

export default Publish;
