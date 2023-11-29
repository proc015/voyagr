import { MouseEventHandler } from 'react';
import { publishTrip } from '../services/apiService';

const Publish = () => {
  const trip_id: number = 17;

  const handlePublish: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log('the button was clicked')
    publishTrip(trip_id);
  };

  return (
    <div>
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
};

export default Publish;
