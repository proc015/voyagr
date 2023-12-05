import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../services/fetchUserFeed';
import { StaticMap } from '../maps/staticMap';

type Props = {
  userId: number;
};

export const Triplist = ({ userId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const allTrips = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  useEffect(() => {
    dispatch(fetchUserFeed());
  }, [dispatch]);

  console.log(allTrips);
  //   const userTrips = allTrips.filter((trip) => trip.userId == userId);
  const userTrips = allTrips.filter((trip) => trip.userId == 2);
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  //   console.log(userId, userTrips);

  return (
    <>
      {userTrips.map((trip) => {
        console.log(trip.picture_src);
        return (
          <div className=' border-2 border-voyagrBorders py-2 mx-2 px-2 rounded-[10px] my-5'>
            <div className='name font-medium mb-2'>
              <h2 className='font-didact text-lg'>{trip.trip_name}</h2>
            </div>
            <div className='pics flex justify-between'>
              <div className='map rounded-[10px] overflow-hidden'>
                <StaticMap className='w-32 h-16' location={trip.dest_lat_lon} />
              </div>
              <div className='count mt-4 '>
                <p className=' text-center font-noto text-lg leading-4'>
                  <span className=' text-voyagrRed text-3xl font-noto'>
                    11
                    <br />
                  </span>
                  activities
                </p>
              </div>
              <div className='pic h-16 w-32 overflow-hidden  rounded-[10px]'>
                <img
                  className='object-cover rounded-[10px] '
                  src={`${IMG_BASE_URL}/${trip.picture_src}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
