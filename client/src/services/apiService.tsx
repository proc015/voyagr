import { Trip } from '../types/Trip';

const url = "http://localhost:3000";

// const mockUrl = 'https://d5c1edd4-13c7-496b-a7d7-fbcbfc009602.mock.pstmn.io';

export async function postTrip(newTrip: Trip) {
  console.log('newTrip sent to backend', newTrip);

  try {
    const data = await fetch(`${url}/trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrip),
    });
    const response = await data.json();
    console.log('response from backend', response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
