
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { AppDispatch } from '../../app/store';
import { fetchLastTrip } from '../../services/fetchLastTrip';
import { useEffect } from 'react';

const ActivitySmallDetails = ({ activityAdded, setActivityAdded }) => {
  const lastTrip = useSelector((state: RootState) => state.lastTrip);
  const userId = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  useEffect(() => {
    if (activityAdded) {
      dispatch(fetchLastTrip(userId));
      setActivityAdded(false);
    }
  }, [activityAdded]);

  return (
    <div>
      {lastTrip.lastTrip.activities.length > 1 ? (
        lastTrip.lastTrip.activities.map((activity, index) => (
          <div
            key={index}
            className='activity-details m-2 mb-3 w-[95%] h-[60px] rounded-[15px] border text-base border-voyagrBorders mx-auto flex content-beween-center'
          >
            <img
              src={`${IMG_BASE_URL}${activity.picture_src}`}
              alt={activity.date}
              className='w-16 h-auto object-cover rounded-2xl'
            />
            <p className='w-4/5 text-end m-auto mr-5 text-voyagrBlack font-didact text-xl'>
              {activity.activity_name}
            </p>
          </div>
        ))
      ) : (
        <p className='text-base ml-3 mb-2'>No activities yet!</p>
      )}
    </div>
  );
};

export default ActivitySmallDetails;
