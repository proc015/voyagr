import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    // lol css
    <form style={{ display: 'flex', justifyContent: 'center' }}>
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

        <button
          type='submit'
          // onClick={handleClick}
          // send these states to backend
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Signup;
