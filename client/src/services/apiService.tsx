import { Activity } from '../types/Activity';
import { Trip } from '../types/Trip';

const url = 'http://localhost:3000';

const mockUrl = 'https://d5c1edd4-13c7-496b-a7d7-fbcbfc009602.mock.pstmn.io';

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

export async function uploadPhoto(files: any) {
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('upload_preset', 'hs3oue2u');
  await fetch('https://api.cloudinary.com/v1_1/dwskyhib9/upload', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    console.log(response);
  });
}

export async function postActivity(newActivity: Activity) {
  console.log('newActivity sent to backend', newActivity);

  try {
    const data = await fetch(`${mockUrl}/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    });
    const response = await data.json();
    console.log('response from backend', response);
    return response;
  } catch (err) {
    console.log(err);
  }
}


export async function getUserTrips(): Promise<Trip[]> {
  try {
    const userTrips = await fetch (`${mockUrl}/trips`);
    console.log('userTrips', userTrips)
    const response = await userTrips.json(); 
    console.log('userTrips response', response)
    return response; 
  } catch (err) {
    console.log(err)
    return [];
  }
}

// export async function getUserTrips(user_id: number): Promise<Trip[]> {
//   try {
//     const userTrips = await fetch (`${url}/trips/${user_id}`);
//     console.log('userTrips', userTrips)
//     const response = await userTrips.json(); 
//     console.log('userTrips response', response)
//     return response; 
//   } catch (err) {
//     console.log(err)
//     throw err; 
//   }
// }