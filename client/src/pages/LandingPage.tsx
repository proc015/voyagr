import { Link } from 'react-router-dom';
import landing1 from '../assets/images/landing1.jpg';
import logo from '../assets/logo/Voyagr-white-big.png';
import Login from '../components/Login/Login';
import { useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function LandingPage() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    // tailwind arbitary bg-[] wasn't working so cop this basic bitch css
    <main
      style={{
        backgroundImage: `url(${landing1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
      className='absolute z-0'
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
        {/* ON CLICK, REVEAL LOGIN COMPONENT ELEMENT */}
        <div className='landing-btn' onClick={() => setOpenLogin(true)}>
          Login
        </div>
          <Transition show={openLogin}>
            <Dialog className='relative z-10' onClose={() => setOpenLogin(false)}>
              <Transition.Child
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-y-full'
                enterTo='translate-y-80'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-y-80'
                leaveTo='translate-y-full'
              >
                <Login setOpenLogin={setOpenLogin}/>
              </Transition.Child>
            </Dialog>
          </Transition>
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

//         {loginOpen && <div className='w-full -translate-y-[30rem]'><Login /></div>}

export default LandingPage;
