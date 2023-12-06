import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../app/store';
import { fetchAllUserInfo } from '../services/fetchAllUserInfo';
import { Trip } from '../types/Trip';
import travelIcon from '../assets/icons/button-active.svg';
import * as dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface Prop {
  feedTrip: Trip;
}

export const Profilebar = ({ feedTrip }: Prop) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const userInfo = useSelector(
    (state: RootState) => state.getAllUserInfo.userInformation
  );

  const handleProfileClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    navigate(`/profile/${feedTrip.userId}`);
  };

  //pass specific userID from the trip that is being mapped -> userIdentifier
  // console.log('TI', userIdentifier);
  // console.log('UI', userInfo);

  const filteredUserInfo =
    userInfo.length > 0
      ? userInfo.filter((user) => user.user_id === feedTrip.userId)
      : [];

  // console.log('filt', filteredUserInfo);

  //based on a userId (userIdentifier) I need to pull (1) profile pic (2) display name

  useEffect(() => {
    dispatch(fetchAllUserInfo());
  }, [dispatch]);

  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  return (
    <div className='flex gap-3 my-2 align-middle' onClick={handleProfileClick}>
      {filteredUserInfo.map((userProfileInfo) => (
        <div key={userProfileInfo.user_id} className='flex gap-3'>
          <div className='picture h-12 w-12 rounded-full overflow-hidden bg-voyagrLightGrey'>
            <img
              className='object-cover w-full h-full'
              src={
                userProfileInfo.display_pic_src
                  ? `${IMG_BASE_URL}/${userProfileInfo.display_pic_src}`
                  : travelIcon
              }
              alt='no image'
            />
          </div>
          <div className='info flex flex-col justify-center'>
            <h3 className='text-md font-semibold font-noto text-voyagrBlack'>
              {userProfileInfo.display_name}
            </h3>
            <p className='text-sm text-voyagrLightGrey'>
              {dayjs(feedTrip.end_date).format('MMMM DD, YYYY')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
