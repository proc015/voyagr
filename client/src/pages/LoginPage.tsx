import { Link } from 'react-router-dom';
import Login from '../components/Login/Login';

function LoginPage() {
  return (
    <>
      This is the LoginPage
      <Login />
      <Link to='/feed' className='loginLP'>
      </Link>
    </>
  );
}

export default LoginPage;
