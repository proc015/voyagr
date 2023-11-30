import { useState, FormEvent } from 'react';
import { createUser } from '../services/signupService';
import { RegisterUser } from '../types/RegisterUser';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userInfo: RegisterUser = {
    email,
    password, 
    firstName, 
    lastName, 
  }

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(userInfo);
    createUser(userInfo); 

  }
  
  
  return (
    // lol css
    <form 
    onSubmit={handleCreateUser}
    style={{ display: 'flex', justifyContent: 'center' }}>
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

        <input
          type='submit'
          value='Register'
        />
          
      </div>
    </form>
  );
}

export default Signup;
