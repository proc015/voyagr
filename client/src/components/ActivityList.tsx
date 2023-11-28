import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import ActivityComponent from './ActivityComponent';
import { AppDispatch } from '../app/store';
import { fetchUserActivity } from '../services/fetchActivity';
import { useEffect } from 'react';

const ActivityList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userActivity = useSelector(
    (state: RootState) => state.getActivity.activities
  );
  const status = useSelector((state: RootState) => state.getActivity.status);

  const trip_id = 17;

  useEffect(() => {
    dispatch(fetchUserActivity(trip_id));
  }, [dispatch, trip_id]);

  // Loading state
  if (status === 'loading') {
    return <div>Loading activities...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error loading activities.</div>;
  }

  console.log('ActivityList', userActivity);
  // Display activities or a message if there are none
  return (
    <div className='activity-list'>
      {userActivity.activities.length > 0 ? (
        userActivity.activities.map((act, index) => { 
            return (
          
          <ActivityComponent key={index} activity={act} 
          />
            )}
            )
      ) : (
        <p>No activities to show</p>
      )}
    </div>
  );
};

export default ActivityList;
