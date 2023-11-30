import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <button type='submit' 
        // onClick={handleClick}
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Signup;
