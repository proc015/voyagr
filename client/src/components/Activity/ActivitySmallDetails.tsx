import { Activity } from '../../types/Activity';
import { useAppDispatch } from '../../app/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { root } from 'postcss';
import { AppDispatch } from '../../app/store';
import { fetchLastTrip } from '../../services/fetchLastTrip';
import { useEffect } from 'react';

type Props = {
  activityAdded: boolean;
  setActivityAdded: (a: boolean) => void;
};

const ActivitySmallDetails = ({ activityAdded, setActivityAdded }: Props) => {
  const lastTrip = useSelector((state: RootState) => state.lastTrip);
  const userId = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  //   const pictures = activities.map((activity) => activity.picture_src);

  useEffect(() => {
    if (activityAdded) {
      dispatch(fetchLastTrip(userId));
      setActivityAdded(false);
    }
  }, [activityAdded]);

  return (
    <>
      <div>
        {lastTrip &&
        lastTrip.lastTrip.activities &&
        lastTrip.lastTrip.activities.length > 1 ? (
          lastTrip.lastTrip.activities.map((activity, index) => (
            <div
              key={index}
              className='activity-details m-2 mb-3 w-[95%] h-[60px] rounded-[15px] border text-base border-voyagrBorders mx-auto flex content-beween-center'
            >
              <img
                src={`${IMG_BASE_URL}${activity.picture_src}`}
                alt={activity.date}
                className='w-[60px] h-[58px] object-cover rounded-[15px]'
              />
              <p className=' text-right w-[80%] mt-1'>
                {activity.activity_name}
              </p>
            </div>
          ))
        ) : (
          <p className='text-base ml-3 mb-2'>No activities yet!</p>
        )}
      </div>
    </>
  );
};

export default ActivitySmallDetails;
