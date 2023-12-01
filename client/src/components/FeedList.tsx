import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';
import { useEffect } from 'react';
import { fetchUserFeed } from '../services/fetchUserFeed';
import FeedComponent from './FeedComponent';

const FeedList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userFeed = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );
  const status = useSelector((state: RootState) => state.getAllTrips.status);
  const loggedInUserId = useSelector(
    (state: RootState) => state.user.currentUser
  );

  useEffect(() => {
    dispatch(fetchUserFeed());
  }, [dispatch]);

  const filteredUserTrip = loggedInUserId ? userFeed.filter(trip => trip.userId === loggedInUserId) : [];

  // Loading state
  if (status === 'loading') {
    return <div>Loading activities...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error loading activities.</div>;
  }

  // MOCK PICTURES
  const pictures = [
    'bok6px8p8axqzfzffir4',
    'pmwlwslbcuwqckupvzj5',
    'bgl6sjrlnctacufsiahd',
    'vove2dv8d9mqa37xbztt',
    'siejyrv7mcux3pivk2k0',
    'ntnewpztc8qjopvtqsj1',
  ];

  console.log('filteredUserFeed', filteredUserTrip);
  // Display activities or a message if there are none
  return (
    <div className='activity-list'>
      {filteredUserTrip.length > 0 ? (
        filteredUserTrip.map((feedTrip, i) => {
          return (
            <FeedComponent
              key={feedTrip.trip_id}
              feedTrip={feedTrip}
              picture={pictures[i]}
            />
          );
        })
      ) : (
        <p>No activities to show</p>
      )}
    </div>
  );
};

export default FeedList;
