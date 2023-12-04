import { useLocation } from 'react-router';
import altPic from '../../assets/icons/button-active.svg';
import { followUser, unFollowUser } from '../../services/followService';
import { useState } from 'react';

type Props = {
  name: string;
  picture: string;
  myProfile: boolean;
  userId: number;
  loggedInUserId: number;
  following: boolean;
  setFollowing: (following: boolean) => void;
};
export const Bio = ({
  name,
  picture,
  myProfile,
  userId,
  loggedInUserId,
  following,
  setFollowing,
}: Props) => {
  const ppUrlEnding = 'IMG_0873_2_pepnrb';
  const domainUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  const handleEditProfile = () => {};
  const handleFollow = async () => {
    following
      ? await unFollowUser(userId, 5).then((res) =>
          console.log('RESPONSE FROM UNFOLLOW: ', res)
        )
      : await followUser(userId, 5).then((res) =>
          console.log('RESPONSE FROM FOLLOW: ', res)
        );
    setFollowing(!following);
  };

  return (
    <>
      <div className='Here the PP will live with its functionality'>
        <img
          src={picture == null ? altPic : `${domainUrl + picture}`}
          alt='+'
          className='w-[150px] h-[150px] mt-7 object-cover rounded-full flex mx-auto '
        />
        <button
          onClick={myProfile ? handleEditProfile : handleFollow}
          className='flex text-black font-bold py-[3px] px-[40px] mt-[15px] rounded-full bg-voyagr border-[1px] mx-auto '
        >
          {myProfile ? '✎' : following ? 'Unfollow' : 'Follow'}
        </button>
      </div>
      <div className='font-noto text-2xl flex'>
        <p className='mx-auto mt-4'>{name} 🤙</p>
      </div>
    </>
  );
};
