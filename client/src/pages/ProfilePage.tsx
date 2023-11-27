import { Link } from 'react-router-dom';

function ProfilePage() {
  return (
    <>
      This is the ProfilePage 
      <Link to='/login' className='loginLP'>
        login
      </Link>
    </>
  );
}

export default ProfilePage;
