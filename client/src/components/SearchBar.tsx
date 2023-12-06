import { useState } from 'react';
import { searchUsers } from '../services/searchService';
import noprofilepic from '../assets/images/noprofilepic.jpg';
import searchIcon from '../assets/icons/search-icon.svg';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [searchResult, setSearchResult] = useState<any>([]);

  const cloudinaryUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm) {
      setTimeout(async () => {
        const response = await searchUsers(searchTerm);
        setSearchResult(response);
      }, 300);
    } else {
      setSearchResult('');
    }
  };

  return (
    <main>
      <div className='m-auto h-10 mt-5 w-[90%] rounded-xl bg-voyagrLightGrey bg-opacity-20 flex'>
        <img src={`${searchIcon}`} className='h-5 m-auto px-4 opacity-40' />
        <input
          type='search'
          placeholder='Search'
          className='w-full h-10 font-didact rounded-xl text-voyagrBlack bg-voyagrLightGrey bg-opacity-0 text-lg focus:outline-none'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div id='search results'>
        {/* ONLY RENDER SEARCH RESULTS IF STATE IS DEFINED */}
        {searchResult.length > 0 &&
          searchResult.map((result: any) => {
            return (
                <Link
                  to={`../profile/${result.user_id}`}
                  state={result.user_id}
                  key={result.user_id}
                >
                  <div className='h-20 my-7 flex'>
                  {/* RENDER DEFAULT PIC IF NONE SET */}
                  {result.display_pic_src ? (
                    <img
                      src={`${cloudinaryUrl}${result.display_pic_src}`}
                      className='rounded-full w-20 h-auto'
                    />
                  ) : (
                    <img
                      src={`${noprofilepic}`}
                      className='rounded-full w-20 h-auto'
                    />
                  )}
                  <div className='w-full flex'>
                    <p className='pl-5 flex items-center font-didact text-lg'>
                      {result.display_name}
                    </p>
                  </div>
                  </div>
                </Link>
            );
          })}
      </div>
    </main>
  );
}

export default SearchBar;
