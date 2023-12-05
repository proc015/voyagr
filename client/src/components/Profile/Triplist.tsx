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
  //   console.log(userId, userTrips);

  return (
    <>
      {userTrips.map((trip) => {
        return (
          <div className=' border border-voyagrBorders'>
            <div className='name'>{trip.trip_name}</div>
            <div className='pics'>
              <div className='map'>
                <StaticMap
                  setAddress={() => 'REMOVE THIS LATER'}
                  location={trip.destination}
                />
              </div>
              <div className='count'>{trip.activities.length}</div>
              <div className='pic'></div>
            </div>
          </div>
        );
      })}
    </>
  );
};
