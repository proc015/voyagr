import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <div
        className='Rectangle1'
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(271deg, #030D2A 30%, rgba(2, 14, 45, 0.42) 100%)',
        }}
      />
      <img className='BG' src={''} />
      <img className='cms' src={''} />
      <Link to='/login' className='loginLP'>
        login
      </Link>
      <div className='registerLP'>register</div>
      <img className='logo' src={''} />
    </div>
  );
}

export default LandingPage;
