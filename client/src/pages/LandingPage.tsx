import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      This is the LandingPage
      <Link to='/login' className='something'>
        login
      </Link>
      <div className='registerLP'>register</div>
    </div>
  );
}

export default LandingPage;
