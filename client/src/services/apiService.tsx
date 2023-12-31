import { Activity } from '../types/Activity';
import { Trip } from '../types/Trip';
import { NewTripType } from '../components/Trip/AddTrip';

const url = 'http://localhost:3000';

const mockUrl = 'https://d5c1edd4-13c7-496b-a7d7-fbcbfc009602.mock.pstmn.io';

export async function postTrip(newTrip: NewTripType) {
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
    const data = await fetch(`${url}/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    });
    const response = await data.json();
    console.log('activityPost serv res', response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function publishTrip(trip_id: number) {
  try {
    const data = await fetch(`${url}/trip/${trip_id}/publish`, {
      method: 'PUT',
    });
    console.log('data service', data)
    const response = await data.json();
    console.log(response)
    return response;
  } catch (err) {
    console.log(err);
  }
}

// export async function searchUserByDisplayName(display_name: string) {
//   try {
//     const data = await fetch(`${url}/user/${display_name}`);
//     const response = await data.json();
//     console.log(response);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }