import { RegisterUser } from '../types/RegisterUser';

const url = 'http://localhost:3000';

export async function createUser(registerUser: RegisterUser) {
  console.log('registerUser', registerUser);

  try {
    const data = await fetch(`${url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUser),
    });
    const response = await data.json();
    console.log('register response from backend', response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
