import { searchUsers } from '../services/searchService';

function SearchBar() {
  const handleSearch = async (searchTerm: string) => {
    const response = await searchUsers(searchTerm);
    console.log(response);
  };

  return (
    <main>
      <input
        type='search'
        placeholder='Search for users'
        onChange={(e) => handleSearch(e.target.value)}
      />
    </main>
  );
}

export default SearchBar;
