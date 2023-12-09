import { Link } from 'react-router-dom';
import Profile from '../components/Profile/Profile';
import TripProfile from '../components/Trip/TripProfile';

function ProfilePage() {
  return (
    <div className='pb-[80px]'>
      <Profile />
      <TripProfile />
    </div>
  );
}

export default ProfilePage;
