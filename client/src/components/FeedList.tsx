import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';
import { useEffect, useState } from 'react';
import { fetchUserFeed } from '../services/fetchUserFeed';
import FeedComponent from './FeedComponent';
import { Trip } from '../types/Trip';
import DetailedTrip from './DetailedTrip/DetailedTrip';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../services/fetchUserInfo';
import sortFeedPosts from '../utils/sortByDate';

const FeedList = () => {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  
  const userInfo = useSelector(
    (state: RootState) => state.getUserInfo.userInfo
  );

  const followingList = userInfo.following
  console.log('following', userInfo)

  const userFeed = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );
  const status = useSelector((state: RootState) => state.getAllTrips.status);
  const loggedInUserId = useSelector(
    (state: RootState) => state.user.currentUser
  );

  useEffect(() => {
    dispatch(fetchUserInfo(loggedInUserId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserFeed());
  }, [dispatch]);

  const filteredTripsFeed = followingList.length > 0 
  ? userFeed.filter(trip => followingList.includes(trip.userId)) : [];
  
  
  const tripsDisplayFeed = sortFeedPosts(filteredTripsFeed);

  console.log('SORT', tripsDisplayFeed)

  // Loading state
  if (status === 'loading') {
    return <div>Loading activities...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error loading activities.</div>;
  }

  return (
    <div className='activity-list'>
      {tripsDisplayFeed.length > 0 ? (
        tripsDisplayFeed.map((feedTrip) => {
          return (
            <FeedComponent
              key={feedTrip.trip_id}
              feedTrip={feedTrip}
              onSelect={() => {
                console.log('Selecting trip:', feedTrip);
                navigate(`/trip/${feedTrip.trip_id}`);
              }}
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
