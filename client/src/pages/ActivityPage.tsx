import { Link } from 'react-router-dom';

function ActivityPage() {
  return (
    <>
      This is the ActivityPage
      <Link to='/login' className='loginLP'>
        login
      </Link>
    </>
  );
}

export default ActivityPage;
