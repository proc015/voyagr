import { Link } from 'react-router-dom';
import ProfileMe from '../components/Profile/ProfileMe';
import TripProfile from '../components/Trip/TripProfile';

function ProfilePage() {
  return (
    <>
      <ProfileMe />
      <TripProfile />
      This is the ProfilePage
    </>
  );
}

export default ProfilePage;
