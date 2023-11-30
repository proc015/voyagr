import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/loginService';

const initalState = {
  email: '',
  password: '',
};

const Login = () => {
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

<<<<<<< HEAD
}
    
  
return (
    <section>
        <h3>Login</h3>
        <form className="login-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="insert email..."
                name="email"
                value={}
                onChange={handleChange}
            />
            <input 
<<<<<<< HEAD
                type="password"
                placeholder="type password..."
                name="password"
                value={}
                onChange={handleChange}
            />
            <button className="form-submit" type="submit"/>
        </form>
=======
                type="text"
                placeholder="insert email..."
                name="email"
                value={}
                onChange={handleChange}
            />
        </form>
      
>>>>>>> ba469a5 (feat: WIP login)
    </section>
  )
}
=======
    const response = await postLogin(user);
 
    if (response.error) {
      alert(`${response.message}`);
      setLoginState(initalState);
    } else {
      navigate('/profile');
    }
  };
>>>>>>> 3c1921a (feat: added frontend login and connected sign up to backend)

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
        <input type='submit' value='Login' disabled={validateForm()} />
      </div>
    </form>
  );
};

export default Login;
