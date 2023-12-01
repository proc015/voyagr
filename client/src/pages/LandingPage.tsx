import { Link } from 'react-router-dom';
import landing1 from '../assets/images/landing1.jpg'
import logo from '../assets/logo/Voyagr-white-big.png'

function LandingPage() {
  return (
    // tailwind arbitary bg-[] wasn't working so cop this basic bitch css
    <main style={{backgroundImage: `url(${landing1})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}}>
      <div className='flex flex-col items-center'>
        <div id='tagline' className='bg-gradient-to-b from-voyagrRed flex flex-col items-center'>
          <h1 className='font-noto text-voyagrWhite text-[25px] py-8 w-[90%]'>Turn your travels into sharable, interactive stories</h1>
          <img src={logo} alt='logo' className='object-contain w-[90%] py-6'/>
        </div>
        <img src={logo} alt='logo' className='object-contain w-[90%] py-6'/>
        <img src={logo} alt='logo' className='object-contain w-[90%] py-6'/>
        <Link to='/login'>
          <div className='landing-btn'>Login</div>
        </Link>
        <Link to='/signup'>
          <div className='landing-btn'>Register</div>
        </Link>
      </div>  
    </main>
  );
}

export default LandingPage;