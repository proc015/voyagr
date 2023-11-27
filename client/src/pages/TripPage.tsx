import { Link } from 'react-router-dom';

function TripPage() {
  return (
    <>
      This is the TripPage
      <Link to='/login' className='loginLP'>
        login
      </Link>
    </>
  );
}

export default TripPage;
