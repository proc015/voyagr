import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Bio } from './Bio';
import { Stats } from './Stats';
import { useLocation, useParams } from 'react-router';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserInfo } from '../../services/fetchUserInfo';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch, AnyAction } from 'redux';
import { User } from '../../types/User';
import { Triplist } from './Triplist';

const ProfileMe = () => {
  const status = useSelector((state: RootState) => state.getUserInfo.status);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(
    (state: RootState) => state.getUserInfo.userInfo
  );
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const [myProfile, setMyProfile] = useState<boolean>(false);

  const loggedInUserId = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const { id } = useParams();

  // Get user info
  useEffect(() => {
    // if endpoint is /profile, go to logged in user's profile
    if (id == null) {
      dispatch(fetchUserInfo(loggedInUserId));
      setMyProfile(true);
    } else {
      dispatch(fetchUserInfo(Number(id)));
      setMyProfile(false);

      if (userInfo.followers.includes(loggedInUserId)) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    }
    const followers = userInfo.followers.filter((id) => id != 0);
    setFollowerCount(followers.length);
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading Profile...</div>;
  }

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
        followerCount={followerCount}
        setFollowerCount={setFollowerCount}
      />
      <Stats
        tripCount={userInfo.trips.length}
        followerCount={followerCount}
        followingCount={userInfo.following.length}
      />
      <Triplist userId={myProfile ? loggedInUserId : id} />
    </>
  );
};

export default ProfileMe;
