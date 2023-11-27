import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      This is the LoginPage
      <Link to='/login' className='loginLP'>
        login
      </Link>
    </>
  );
}

export default LoginPage;
