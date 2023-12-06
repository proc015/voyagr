import { useParams } from 'react-router';
import { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserActivity } from '../../../services/fetchActivity';
import { AppDispatch } from '../../../app/store';
import parse from 'html-react-parser';

export const DetailedActivity = () => {
  const { trip_id, activity_id } = useParams();

  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  const dispatch = useDispatch<AppDispatch>();

  const tripFeed = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  const activities = tripFeed.find(
    (trip) => trip.trip_id == Number(trip_id)
  )?.activities;

  const a: any = activities?.find((a) => a.activity_id == Number(activity_id));

  const coloredActivityName = () => {
    const arr = a.activity_name.split(' ');
    const colored = `<span className="text-voyagrRed font-semibold">${arr[2]}</span>`;
    const res = arr.splice(2, 1, colored);

    return parse(arr.join(' '));
  };

  return (
    <div className='fixed top-24 h-[82vh] bg-voyagrBlack z-50 w-[100vw]'>
      <div className='absolute flex justify-center h-full'>
        <img
          className=' object-cover bg-voyagrBlack bg-blend-overlay z-0'
          src={`${IMG_BASE_URL}/${a.picture_src}`}
        />
      </div>
      <div className='h-full w-full flex z-10 bg-[#000000]/20 backdrop-brightness-50 '>
        <h1 className=' z-20 text-voyagrWhite leading-snug self-end mb-10 mx-5 font-light  bottom-0 text-5xl font-noto '>
          {coloredActivityName()}
        </h1>
      </div>
    </div>
  );
};
