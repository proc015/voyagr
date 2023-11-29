
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';
import { useEffect } from 'react';
import { fetchUserFeed } from '../services/fetchUserFeed'
import FeedComponent from './FeedComponent';

const FeedList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userFeed = useSelector(
      (state: RootState) => state.getAllTrips.tripFeed
    );
    const status = useSelector((state: RootState) => state.getAllTrips.status);
  
  
    useEffect(() => {
      dispatch(fetchUserFeed());
    }, [dispatch]);
  
   // Loading state
   if (status === 'loading') {
    return <div>Loading activities...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error loading activities.</div>;
  }
  
  console.log('userFeed', userFeed);
  // Display activities or a message if there are none
  return (
    <div className='activity-list'>
      {userFeed.length > 0 ? (
        userFeed.map((feedTrip) => {
          return <FeedComponent key={feedTrip.trip_id} feedTrip={feedTrip} />;
        })
      ) : (
        <p>No activities to show</p>
      )}
    </div>
  );
};

export default FeedList
