import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Bio } from './Bio';
import { Stats } from './Stats';
import { useLocation } from 'react-router';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserInfo } from '../../services/fetchUserInfo';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch, AnyAction } from 'redux';
import { User } from '../../types/User';

const ProfileMe = () => {
  const status = useSelector((state: RootState) => state.getUserInfo.status); // TODO: create getProfile
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(
    (state: RootState) => state.getUserInfo.userInfo
  );

  const [myProfile, setMyProfile] = useState<boolean>(false);

  const loggedInUserId = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
    dispatch(fetchUserInfo(state));

    if (loggedInUserId == userInfo.user_id) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }

    console.log('LOGGED IN: ', loggedInUserId);
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading Profile...</div>;
  }

  console.log(userInfo);

  return (
    <>
      <Bio
        name={userInfo.display_name}
        picture={userInfo.display_pic_src}
        myProfile={myProfile}
      />
      <Stats />

      <div className='text-center text-voyagrLightGrey mt-1 mb-2 font-didact mx-auto'>
        This is the List for all Trips
      </div>
    </>
  );
};

export default ProfileMe;
