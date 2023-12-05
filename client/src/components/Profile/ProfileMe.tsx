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
import { Triplist } from './Triplist';

const ProfileMe = () => {
  const status = useSelector((state: RootState) => state.getUserInfo.status); // TODO: create getProfile
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(
    (state: RootState) => state.getUserInfo.userInfo
  );
  const [following, setFollowing] = useState(false);

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
      if (userInfo.followers.includes(loggedInUserId)) {
        console.log('incldues', loggedInUserId);
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
  }, [dispatch, state]);

  if (status === 'loading') {
    return <div>Loading Profile...</div>;
  }
  console.log('LOGGED IN', loggedInUserId);

  return (
    <>
      <Bio
        name={userInfo.display_name}
        picture={userInfo.display_pic_src}
        myProfile={myProfile}
        userId={userInfo.user_id}
        loggedInUserId={loggedInUserId}
        following={following}
        setFollowing={setFollowing}
      />
      <Stats
        tripCount={userInfo.trips.length}
        followerCount={userInfo.followers.length}
        followingCount={userInfo.following.length}
      />
      <Triplist userId={myProfile ? loggedInUserId : state} />
    </>
  );
};

export default ProfileMe;
