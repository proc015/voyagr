import { Link } from 'react-router-dom';
import ProfileMe from '../components/Profile/ProfileMe';
import TripProfile from '../components/Trip/TripProfile';

function ProfilePage() {
  return (
    <div className='pb-[80px]'>
      <ProfileMe />
      <TripProfile />
    </div>
  );
}

export default ProfilePage;
