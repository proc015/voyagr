import { MouseEventHandler } from 'react';
import { publishTrip } from '../services/apiService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';

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
    <div className='flex text-black py-[3px] px-[40px] rounded-full bg-voyagr mx-auto text-xl '>
      <button
        onClick={handlePublish}
        className='flex text-voyagrBlue py-[3px] px-[40px] rounded-full bg-voyagr border-voyagrBlue border-[1px] font-noto mx-auto '
      >
        <Link to='/feed'>End & Publish!</Link>
      </button>
    </div>
  );
};

export default Publish;
