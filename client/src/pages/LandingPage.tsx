import { Link } from 'react-router-dom';
import landing1 from '../assets/images/landing1.jpg';
import logo from '../assets/logo/Voyagr-white-big.png';
import Login from '../components/Login/Login';

function LandingPage() {
  return (
    // tailwind arbitary bg-[] wasn't working so cop this basic bitch css
    <main
      style={{
        backgroundImage: `url(${landing1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className='flex flex-col items-center'>
        <div
          id='tagline'
          className='bg-gradient-to-b from-voyagrRed flex flex-col items-center'
        >
          <h1 className='font-noto text-voyagrWhite text-[25px] py-8 w-[90%]'>
            Turn your travels into sharable, interactive stories
          </h1>
          <img src={logo} alt='logo' className='object-contain w-[90%] py-6' />
        </div>
        <img src={logo} alt='logo' className='object-contain w-[90%] py-6' />
        <img src={logo} alt='logo' className='object-contain w-[90%] py-6' />

        <div className='landing-btn'>Login
          <div className='hidden'>
            <Login />
          </div>
        </div>

        <Link to='/signup'>
          <div className='landing-btn'>Sign up</div>
        </Link>
        <div
          id='bottom-gradient'
          className='h-[150px] w-full bg-gradient-to-t from-voyagrWhite z-10 flex justify-end'
        ></div>
      </div>
    </main>
  );
}

export default LandingPage;
