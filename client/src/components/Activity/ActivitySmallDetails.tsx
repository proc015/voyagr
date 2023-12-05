import { Activity } from '../../types/Activity';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { root } from 'postcss';
import { AppDispatch } from '../../app/store';

const ActivitySmallDetails = () => {
  const lastTrip = useSelector((state: RootState) => state.lastTrip);
  const addedActivity = useSelector((state: RootState) => state.addActivity);

  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  //   const pictures = activities.map((activity) => activity.picture_src);

  return (
    <>
      <div>
        {lastTrip &&
        lastTrip.lastTrip.activities &&
        lastTrip.lastTrip.activities.length > 0 ? (
          lastTrip.lastTrip.activities.map((activity, index) => (
            <div key={index} className='activity-details flex-row'>
              <div className='m-2 mb-3 w-[95%] h-[60px] rounded-[15px] border text-base border-voyagrBorders mx-auto'>
                <p className=''>{activity.activity_name}</p>
                <img
                  src={`${IMG_BASE_URL}${activity.picture_src}`}
                  alt={activity.date}
                  className='w-[60px] h-[60px] object-cover rounded-full flex'
                />
              </div>
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
