import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';
import { useEffect, useState } from 'react';
import { fetchUserFeed } from '../services/fetchUserFeed';
import FeedComponent from './FeedComponent';
import { Trip } from '../types/Trip';
import DetailedTrip from './DetailedTrip';

const FeedList = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const closeDetailedTrip = () => setSelectedTrip(null);
  
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

  // const filteredUserTrip = loggedInUserId ? userFeed.filter(trip => trip.userId === loggedInUserId) : [];
  const filteredUserTrip = userFeed;
  // Loading state
  if (status === 'loading') {
    return <div>Loading activities...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error loading activities.</div>;
  }

  console.log('filteredUserFeed', filteredUserTrip);
  // Display activities or a message if there are none
  return (
    <div className='activity-list'>
      {filteredUserTrip.length > 0 ? (
        filteredUserTrip.map((feedTrip) => {
          return <FeedComponent key={feedTrip.trip_id} feedTrip={feedTrip} onSelect={()=> setSelectedTrip(feedTrip)} />;
        })
      ) : (
        <p>No activities to show</p>
      )}
      {selectedTrip && <DetailedTrip trip={selectedTrip} onClose={closeDetailedTrip}/>}
    </div>
  );
};

export default FeedList;
