import { useState, FormEvent } from 'react';
import { createUser } from '../services/signupService';
import { RegisterUser } from '../types/RegisterUser';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const userInfo: RegisterUser = {
    email,
    password,
    firstName,
    lastName,
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await createUser(userInfo);

    if (response.error) {
      alert(`${response.message}`);
    } else {
      navigate('/profile');
    }
  };

  return (
    // lol css
    <form
      onSubmit={handleCreateUser}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div
        id='parent-container'
        style={{ display: 'flex', flexDirection: 'column', width: '70%' }}
      >
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target!.value)}
        />

        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target!.value)}
        />

        <input
          type='text'
          placeholder='First name'
          onChange={(e) => setFirstName(e.target!.value)}
        />

        <input
          type='text'
          placeholder='Last name'
          onChange={(e) => setLastName(e.target!.value)}
        />

        <input type='submit' value='Register' />
      </div>
    </form>
  );
}

export default Signup;
