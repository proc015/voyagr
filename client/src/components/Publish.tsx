import { MouseEventHandler } from 'react';
import { publishTrip } from '../services/apiService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';

const Publish = () => {
  const trip_id = useSelector(
    (state: RootState) => state.lastTrip.lastTrip.trip_id
  );
  const navigate = useNavigate();

  const handlePublish: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log('the button was clicked');
    publishTrip(trip_id);
    navigate('/feed');
  };

  const content =
    trip_id === 0 || trip_id === null ? (
      <div className='flex text-black py-[3px] px-[40px] rounded-full bg-voyagr mx-auto text-xl '>
        <div className='flex text-voyagrLightGrey py-[3px] px-[40px] rounded-full bg-voyagr border-voyagrLightGrey border-[1px] font-noto mx-auto '>
          <div>not possible yet 🖕</div>
        </div>
      </div>
    ) : (
      <div className='flex text-black py-[3px] px-[40px] rounded-full bg-voyagr mx-auto text-xl '>
        <Link
          to='/feed'
          onClick={handlePublish}
          className='flex text-voyagrBlue py-[3px] px-[40px] rounded-full bg-voyagr border-voyagrBlue border-[1px] font-noto mx-auto '
        >
          <div>End & Publish!</div>
        </Link>
      </div>
    );

  return (
    <>
      {content}
    </>
  );
};

export default Publish;
