const url = 'http://localhost:3000';

export async function followUser(
  userIdToFollow: number,
  loggedInUserId: number
) {
  console.log({ userIdToFollow, loggedInUserId });

  try {
    const data = await fetch(`${url}/profile/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIdToFollow, loggedInUserId }),
    });
    const response = await data.json();
    console.log('follow response from backend', response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
