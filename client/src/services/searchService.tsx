const url = 'http://localhost:3000';

export const searchUsers = async (searchTerm: string) => {
  console.log('searchService', searchTerm);
  try {
    const data = await fetch(`${url}/search/${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(searchTerm),
    });
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
