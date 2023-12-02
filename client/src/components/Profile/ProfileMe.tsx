import { useSelector, useDispatch } from 'react-redux';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Bio } from './Bio';
import { Stats } from './Stats';
import { useLocation } from 'react-router';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserInfo } from '../../services/fetchUserInfo';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch, AnyAction } from 'redux';
import { User } from '../../types/User';
=======
import { useEffect } from 'react';
import { Bio } from './Bio';
import { Stats } from './Stats';
>>>>>>> 14772f7 (chore: refactor to smaller components)

const ProfileMe = () => {
  const status = useSelector((state: RootState) => state.getUserInfo.status); // TODO: create getProfile
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(
    (state: RootState) => state.getUserInfo.userInfo
  );

<<<<<<< HEAD
  const [myProfile, setMyProfile] = useState<boolean>(false);

  const loggedInUserId = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const { state } = useLocation();

  useEffect(() => {
    if (state == null) {
      dispatch(fetchUserInfo(loggedInUserId));
      setMyProfile(true);
    } else {
      dispatch(fetchUserInfo(state));
      console.log(userInfo);
      setMyProfile(false);
    }
  }, [dispatch, state]);

=======
>>>>>>> 14772f7 (chore: refactor to smaller components)
  if (status === 'loading') {
    return <div>Loading Profile...</div>;
  }
  console.log('LOGGED IN', loggedInUserId);

  return (
    <>
<<<<<<< HEAD
      <Bio
        name={userInfo.display_name}
        picture={userInfo.display_pic_src}
        myProfile={myProfile}
        userId={userInfo.user_id}
        loggedInUserId={loggedInUserId}
      />
      <Stats
        tripCount={userInfo.trips.length}
        followerCount={userInfo.followers.length}
        followingCount={userInfo.following.length}
      />
=======
      <Bio />
      <Stats />
>>>>>>> 14772f7 (chore: refactor to smaller components)

      <div className='text-center text-voyagrLightGrey mt-1 mb-2 font-didact mx-auto'>
        This is the List for all Trips
      </div>
    </>
  );
};

export default ProfileMe;
