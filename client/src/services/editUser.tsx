const url = 'http://localhost:3000';

export async function editDisplayName(id: number, name: string) {
  try {
    const data = await fetch(`${url}/user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });
    const response = await data.json();
    console.log('edit user response from backend', response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
