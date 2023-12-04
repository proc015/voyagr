import { useState, FormEvent, ChangeEvent } from 'react';
import { createUser } from '../services/signupService';
import { RegisterUser } from '../types/RegisterUser';
import { useNavigate } from 'react-router-dom';
import traveller from '../assets/icons/traveller.svg';
import backButton from '../assets/icons/chevron-left.svg';
import { useDispatch } from 'react-redux';
import SignupDetails from './SignupDetails';
import { Tab } from '@headlessui/react';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  displayName: '',
};

export interface SignupProps {
  setOpenSignup: Function;
}

function Signup({ setOpenSignup }: SignupProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(initialState);
  const [userDetails, setUserDetails] = useState(false);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, firstName, lastName, displayName } = signupState;
    const user = { email, password, firstName, lastName, displayName }

    const response = await createUser(user);

    if (response.error) {
      alert(`${response.message}`);
    } else {
      navigate('/profile');
    }
  };

  return (
    <main className='bg-voyagrWhite h-[600px] relative z-10 rounded-2xl'>
      <Tab.Group>
        <div id='top-bar' className='flex h-14 border-b border-voyagrBlack'>
          <img
            src={`${backButton}`}
            className='h-4 my-auto pl-4'
            onClick={() => setOpenSignup(false)}
          />
          <Tab.List className='font-noto my-auto w-full text-center mr-8 space-x-5'>
            <Tab className='ui-selected:border-b-2 ui-selected:border-voyagrBlack'>sign up</Tab>
            <Tab className='ui-selected:border-b-2 ui-selected:border-voyagrBlack'>continue</Tab>
          </Tab.List>
        </div>

      <Tab.Panels>
        <Tab.Panel>
      <img src={`${traveller}`} className='h-24 w-auto m-auto my-8' />
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
              required={true}
              placeholder='Last name'
              onChange={handleChange}
              className='login-box'
            />
          </div>
            <button className='landing-btn'>Continue</button>
        </div>
      </form>
        </Tab.Panel>

        <Tab.Panel>
          <SignupDetails />
        </Tab.Panel>

      </Tab.Panels>
      </Tab.Group>
    </main>
  );
}

//           

export default Signup;
