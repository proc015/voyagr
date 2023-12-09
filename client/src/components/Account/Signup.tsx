import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { createUser } from '../../services/signupService';
import { useNavigate } from 'react-router-dom';
import traveller from '../../assets/icons/traveller.svg';
import backButton from '../../assets/icons/chevron-left.svg';
import { useDispatch } from 'react-redux';
import { Tab } from '@headlessui/react';
import { setUser } from '../../redux/userSlice';
import { uploadPhoto } from '../../services/apiService';

export const initialSignupState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  displayName: '',
  displayPicSrc: '',
};

function Signup({ setOpenSignup }: { setOpenSignup: Function }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(initialSignupState);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cloudinaryUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const filename = event.target.files![0].name;

    setSignupState((prevState) => ({
      ...prevState,
      [event.target.name]: filename,
    }));
    uploadPhoto(event.target.files);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUser = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { email, password, firstName, lastName, displayName, displayPicSrc } =
      signupState;
    const user = {
      email,
      password,
      firstName,
      lastName,
      displayName,
      displayPicSrc,
    };

    const response = await createUser(user);

    if (response.error) {
      alert(`${response.message}`);
      setSignupState(initialSignupState);
    } else {
      dispatch(setUser(response.user_id));
      navigate('/profile');
    }
  };

  return (
    <main className='bg-voyagrWhite h-[650px] relative z-10 rounded-2xl'>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div id='top-bar' className='flex h-14 border-b border-voyagrBlack'>
          <img
            src={`${backButton}`}
            className='h-4 my-auto pl-4'
            onClick={() => setOpenSignup(false)}
          />
          <Tab.List className='font-noto my-auto w-full text-center mr-8 space-x-5'>
            <Tab
              className='ui-selected:border-b-2 ui-selected:border-voyagrRed'
              onClick={() => setSelectedIndex(0)}
            >
              sign up
            </Tab>
            <Tab
              className='ui-selected:border-b-2 ui-selected:border-voyagrRed'
              onClick={() => setSelectedIndex(1)}
            >
              continue
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            {/* SHOW SELECTED PHOTO AFTTER UPLOAD */}
            {signupState.displayPicSrc ? (
              <img
                src={`${cloudinaryUrl}${signupState.displayPicSrc}`}
                className='h-24 w-24 m-auto my-8 rounded-full'
              />
            ) : (
              <img src={`${traveller}`} className='h-24 w-auto m-auto my-8' />
            )}
            {/*  */}
            <form className='flex justify-center'>
              <div
                id='parent-container'
                className='flex flex-col w-[90%] items-center'
              >
                <input
                  type='email'
                  name='email'
                  value={signupState.email}
                  required={true}
                  placeholder='Email'
                  onChange={handleChange}
                  className='login-box'
                />

                <input
                  type='password'
                  name='password'
                  value={signupState.password}
                  required={true}
                  placeholder='Password'
                  onChange={handleChange}
                  className='login-box'
                />
                <div id='nameContainer' className='flex space-x-7'>
                  <input
                    type='text'
                    name='firstName'
                    value={signupState.firstName}
                    required={true}
                    placeholder='First name'
                    onChange={handleChange}
                    className='login-box'
                  />

                  <input
                    type='text'
                    name='lastName'
                    value={signupState.lastName}
                    required={true}
                    placeholder='Last name'
                    onChange={handleChange}
                    className='login-box'
                  />
                </div>
                <div
                  className='landing-btn'
                  onClick={() => setSelectedIndex(1)}
                >
                  Continue
                </div>
              </div>
            </form>
          </Tab.Panel>

          <Tab.Panel>
            <main className='bg-voyagrWhite h-[600px] relative z-10 rounded-2xl'>
              {/* SHOW SELECTED PHOTO AFTTER UPLOAD */}
              {signupState.displayPicSrc ? (
                <img
                  src={`${cloudinaryUrl}${signupState.displayPicSrc}`}
                  className='h-24 w-24 m-auto mt-8 mb-6 rounded-full'
                />
              ) : (
                <img
                  src={`${traveller}`}
                  className='h-24 w-auto m-auto mt-8 mb-6'
                />
              )}
              {/*  */}
              <form className='flex justify-center'>
                <div
                  id='parent-container'
                  className='flex flex-col w-[90%] items-center'
                >
                  <p
                    id='upload-help'
                    className='text-base text-voyagrBlack font-didact mr-auto'
                  >
                    Upload a profile photo!
                  </p>
                  <input
                    type='file'
                    accept='image/png, image/jpeg'
                    name='displayPicSrc'
                    required={true}
                    onChange={(e) => handlePhotoUpload(e)}
                    className='image-upload'
                    aria-describedby='upload-help'
                  />

                  <input
                    type='text'
                    name='displayName'
                    value={signupState.displayName}
                    required={true}
                    placeholder='Display name'
                    onChange={handleChange}
                    className='w-full h-12 my-4 rounded-xl border border-voyagrLightGrey pl-4 font-didact text-voyagrBlack text-lg focus:outline-none focus:border-voyagrRed'
                  />
                  <button
                    className='landing-btn'
                    onClick={(e) => handleCreateUser(e)}
                  >
                    Finish
                  </button>
                </div>
              </form>
            </main>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}

export default Signup;
