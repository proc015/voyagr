import { useParams } from 'react-router';
import { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserActivity } from '../../../services/fetchActivity';
import { AppDispatch } from '../../../app/store';
import parse from 'html-react-parser';
import travelIcon from '../../../assets/icons/traveller.svg';
import { Activity } from '../../../types/Activity';
import * as dayjs from 'dayjs';
import { HeartIcon } from '../../../assets/icons/heartIcon';
import { CommentIcon } from '../../../assets/icons/commentIcon';

export const DetailedActivity = () => {
  const [liked, setLiked] = useState(false);
  const { trip_id, activity_id } = useParams();

  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  const dispatch = useDispatch<AppDispatch>();

  const tripFeed = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  const trip = tripFeed.find((trip) => trip.trip_id == Number(trip_id));

  const activities = trip?.activities;

  const a: Activity = activities?.find(
    (a) => a.activity_id == Number(activity_id)
  );

  const allUserInfo = useSelector(
    (state: RootState) => state.getAllUserInfo.userInformation
  );

  const userInfo = allUserInfo.find((user) => user.user_id === trip?.userId);

  const coloredActivityName = () => {
    const arr = a.activity_name.split(' ');
    const colored = `<span className="text-voyagrRed font-semibold">${arr[2]}</span>`;
    const res = arr.splice(2, 1, colored);

    return parse(arr.join(' '));
  };

  return (
    <div className='fixed top-24 h-[82vh] bg-voyagrBlack z-50 w-[100vw]'>
      <div className='absolute flex justify-center h-full'>
        <img
          className=' object-cover bg-voyagrBlack bg-blend-overlay z-0'
          src={`${IMG_BASE_URL}/${a.picture_src}`}
        />
      </div>
      <div className='h-full w-full flex flex-col justify-end z-10 bg-[#000000]/20 backdrop-brightness-50 '>
        <h1 className=' z-20 text-voyagrWhite leading-snug self-end mb-5 mx-5 font-light  bottom-0 text-5xl font-noto '>
          {coloredActivityName()}
        </h1>
        <div className='z-40 flex  bottom-0 mx-5  '>
          <div className='picture h-14 w-14 rounded-full overflow-hidden bg-voyagrLightGrey'>
            <img
              className='object-cover w-full h-full'
              src={
                userInfo?.display_pic_src
                  ? `${IMG_BASE_URL}/${userInfo.display_pic_src}`
                  : travelIcon
              }
              alt='no image'
            />
          </div>
          <div className='flex flex-col gap-1 ml-3'>
            <h3 className='text-voyagrWhite  text-xl font-noto tracking-wider font-light'>
              {userInfo?.display_name}
            </h3>
            <p className=' text-voyagrLightGrey font-light'>
              {dayjs(a.date).format('MMMM DD, YYYY')}
            </p>
          </div>
        </div>
        <div className='mt-2 mx-6 mb-4'>
          <p className='text-voyagrBlue font-didact text-lg'>{a.location}</p>
        </div>
      </div>
      <div className='absolute bottom-6 right-6 flex gap-4 flex-col'>
        <button onClick={() => setLiked(!liked)}>
          <HeartIcon
            className={`${
              liked ? 'fill-voyagrRed' : 'fill-none stroke-voyagrWhite stroke-2'
            } h-8 `}
          />
        </button>
        <CommentIcon className='fill-none h-8 stroke-voyagrWhite stroke-2' />
      </div>
    </div>
  );
};
