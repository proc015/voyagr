import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      This is the LandingPage
      <Link to='/login'>
        <div>Login</div>
      </Link>
      <Link to='/signup'>
      <div>Register</div>
      </Link>
    </div>
  );
}

export default LandingPage;
