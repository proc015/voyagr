import { Login } from "../types/Login";

const url = 'http://localhost:3000';


export async function postLogin(login: Login) {
    console.log('login sent to backend', login);
  
    try {
      const data = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });
      const response = await data.json();
    //   console.log('response from backend', response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  