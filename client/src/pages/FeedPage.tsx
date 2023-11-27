import { Link } from 'react-router-dom';

function FeedPage() {
  return (
    <>
      This is the FeedPage
      <Link to='/login' className='loginLP'>
        login
      </Link>
    </>
  );
}

export default FeedPage;
