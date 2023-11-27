import { Link } from 'react-router-dom';

function SignupPage() {
  return (
    <>
      This is the SignupPage
      <Link to='/login' className='loginLP'>
        login
      </Link>
    </>
  );
}

export default SignupPage;
