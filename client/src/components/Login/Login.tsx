import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const initalState = {
  email: '',
  password: '',
};

const Login = () => {
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
    <form
      onSubmit={handleLogin}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div
        id='parent-container'
        style={{ display: 'flex', flexDirection: 'column', width: '70%' }}
      >
        <input
          type='text'
          placeholder='insert email...'
          name='email'
          required={true}
          value={loginState.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='type password...'
          name='password'
          required={true}
          value={loginState.password}
          onChange={handleChange}
        />
        <input type='submit' value='Login' disabled={validateForm()} className='landing-btn'/>
        <input type='button' value='Sign up' disabled={validateForm()} className='landing-btn'/>
      </div>
    </form>
  );
};

export default Login;
