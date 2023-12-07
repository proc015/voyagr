import { useLocation } from 'react-router';
import altPic from '../../assets/icons/button-active.svg';
import { followUser, unFollowUser } from '../../services/followService';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { editDisplayName } from '../../services/editUser';

type Props = {
  name: string;
  picture: string;
  myProfile: boolean;
  userId: number;
  loggedInUserId: number;
  following: boolean;
  setFollowing: (following: boolean) => void;
  followerCount: number;
  setFollowerCount: (count: number) => void;
};
export const Bio = ({
  name,
  picture,
  myProfile,
  userId,
  loggedInUserId,
  following,
  setFollowing,
  followerCount,
  setFollowerCount,
}: Props) => {
  const domainUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  const inputName = useRef<HTMLInputElement | null>(null);
  const [displayName, setDisplayName] = useState(name);

  useEffect(() => {
    setDisplayName(name);
  }, [name]);

  const handleEditProfile = () => {
    if (inputName.current) inputName.current.focus();
  };

  const saveDisplayName = async () => {
    await editDisplayName(userId, displayName);
  };

  const handleFollow = async () => {
    setFollowing(!following);
    if (following) {
      setFollowerCount(followerCount - 1);
      await unFollowUser(userId, loggedInUserId);
    } else {
      setFollowerCount(followerCount + 1);
      await followUser(userId, loggedInUserId);
    }
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
      <div className='font-noto text-2xl flex justify-center'>
        <input
          onBlur={saveDisplayName}
          onChange={(e) => setDisplayName(e.target.value)}
          ref={inputName}
          value={displayName}
          type='text'
          className='text-center mt-3 outline-none bg-voyagrWhite'
        />
      </div>
    </>
  );
};
