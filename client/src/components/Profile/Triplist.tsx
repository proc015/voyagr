import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../services/fetchUserFeed';
import { StaticMap } from '../maps/staticMap';

type Props = {
  loggedInUserId: number;
};

export const Triplist = ({ loggedInUserId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const allTrips = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  useEffect(() => {
    dispatch(fetchUserFeed());
  }, [dispatch]);

  console.log(allTrips);
  //   const userTrips = allTrips.filter((trip) => trip.userId == loggedInUserId);
  const userTrips = allTrips.filter((trip) => trip.userId == 2);
  //   console.log(loggedInUserId, userTrips);

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
              <div className='count'></div>
              <div className='pic'></div>
            </div>
          </div>
        );
      })}
    </>
  );
};
