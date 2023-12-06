const url = 'http://localhost:3000';

export async function followUser(
  userIdToFollow: number,
  loggedInUserId: number
) {
  try {
    const data = await fetch(`${url}/profile/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIdToFollow, loggedInUserId }),
    });
    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function unFollowUser(
  userIdToUnfollow: number,
  loggedInUserId: number
) {
  try {
    const data = await fetch(`${url}/profile/unfollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIdToUnfollow, loggedInUserId }),
    });
    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}
