import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { useEffect } from 'react';
import altPic from '../../assets/icons/button-active.svg';

const ProfileMe = () => {
  // const status = useSelector((state: RootState) => state.getProfile.status); // TODO: create getProfile

  const ppUrlEnding = 'IMG_0873_2_pepnrb';
  const domainUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  const fullUrl = `${domainUrl}${ppUrlEnding}`;
  const name = 'Ryan Procacci';
  const tripCount = 12;
  const followerCount = 104;
  const followingCount = 78;

  if (status === 'loading') {
    return <div>Loading Profile...</div>;
  }

  return (
    <>
      <div className='Here the PP will live with its functionality'>
        <img
          src={fullUrl || altPic}
          alt='+'
          className='w-[150px] h-[150px] mt-7 object-cover rounded-full flex mx-auto '
        />
        <button className='flex text-black font-bold py-[3px] px-[40px] mt-[15px] rounded-full bg-voyagr border-[1px] mx-auto '>
          ✎
        </button>
      </div>
      <div className='font-noto text-2xl flex'>
        <p className='mx-auto mt-4'>{name} 🤙</p>
      </div>
      <div className='lineDiv border-b-[1px] border-voyagrBorders mt-4' />
      <div className='font-didact flex'>
        <p className='mx-auto text-center w-[33.3%] mt-4 text-voyagrLightGrey'>
          Trips
        </p>
        <p className='mx-auto text-center w-[33.3%] mt-4 text-voyagrLightGrey'>
          Followers
        </p>
        <p className='mx-auto text-center w-[33.3%] mt-4 text-voyagrLightGrey'>
          Following
        </p>
      </div>
      <div className='font-noto flex'>
        <p className='mx-auto text-xl font-semibold text-center w-[33.3%] text-voyagrBlack'>
          {tripCount}
        </p>
        <p className='mx-auto text-xl font-semibold text-center w-[33.3%] text-voyagrBlack'>
          {followerCount}
        </p>
        <p className='mx-auto text-xl font-semibold text-center w-[33.3%] text-voyagrBlack'>
          {followingCount}
        </p>
      </div>
      <div className='lineDiv border-b-[1px] border-voyagrBorders mt-4' />
      <div>Here the Posting and and Updating the PP fill live</div>
      <div>Here ther will be a List of Trips, Followers and Following</div>
      <div>This is the List for all Trips</div>
      This is the ProfileMe
    </>
  );
};

export default ProfileMe;
