import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Bio } from './Bio';
import { Stats } from './Stats';

const ProfileMe = () => {
  // const status = useSelector((state: RootState) => state.getProfile.status); // TODO: create getProfile

  if (status === 'loading') {
    return <div>Loading Profile...</div>;
  }

  return (
    <>
      <Bio />
      <Stats />

      <div className='text-center text-voyagrLightGrey mt-1 mb-2 font-didact mx-auto'>
        This is the List for all Trips
      </div>
    </>
  );
};

export default ProfileMe;
