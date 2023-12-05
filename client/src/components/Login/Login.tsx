import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import traveller from '../../assets/icons/traveller.svg';
import backButton from '../../assets/icons/chevron-left.svg';

const initalState = {
  email: '',
  password: '',
};

interface LoginProps {
  setOpenLogin: Function
}

const Login = ({setOpenLogin}: LoginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(initalState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = loginState;
    const user = { email, password };
    // console.log('user', user);

    const response = await postLogin(user);

    if (response.error) {
      alert(`${response.message}`);
      setLoginState(initalState);
    } else {
      console.log("login response", response.user_id)
      dispatch(setUser(response.user_id))
      navigate('/feed');
    }
  };

  const validateForm = () => {
    return !loginState.email || !loginState.password;
  };

  return (
    <main className='bg-voyagrWhite h-[650px] relative z-10 rounded-2xl'>
      <div id='top-bar' className='flex h-14 border-b border-voyagrBlack'>
        <img src={`${backButton}`} className='h-4 my-auto pl-4' onClick={() => setOpenLogin(false)}/>
        <p className='font-noto my-auto w-full text-center mr-8'>login</p>
      </div>
      <img src={`${traveller}`} 
      className='h-24 w-auto m-auto my-8' 
      />
      <form
        onSubmit={handleLogin}
        className='flex justify-center'
      >
        <div id='parent-container' className='flex flex-col w-[90%] items-center'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            required={true}
            value={loginState.email}
            onChange={handleChange}
            className='login-box'
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            required={true}
            value={loginState.password}
            onChange={handleChange}
            className='login-box'
          />
          <input
            type='submit'
            value='Login'
            disabled={validateForm()}
            className='landing-btn'
          />
          <input
            type='button'
            value='Sign up'
            disabled={validateForm()}
            className='landing-btn'
          />
        </div>
      </form>
    </main>
  );
};

export default Login;
