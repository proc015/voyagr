import { useState } from 'react';
import { searchUsers } from '../services/searchService';
import noprofilepic from '../assets/images/noprofilepic.jpg'

function SearchBar() {
  const [searchResult, setSearchResult] = useState<any>([])

  const cloudinaryUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/'

  const handleSearch = async (searchTerm: string) => {
    const response = await searchUsers(searchTerm);
    setSearchResult(response);
    console.log(searchResult);
  };

  return (
    <main>
      <input
        type='search'
        placeholder='Search for users'
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div id='search results'>
        {searchResult.map((result: any) => {
          return (<div className='h-28 border-2 border-b-voyagrBlack my-1 flex'>
                    {(result.display_pic_src) ?
                    <img src={`${cloudinaryUrl}${result.display_pic_src}`}
                    className='object-contain'
                    />
                    :
                    <img src={`${noprofilepic}`}
                    className='object-contain'
                    />
                    }
                    <div>{result.display_name}</div>
                  </div>
          )
        })}        
      </div>
    </main>
  );
}

export default SearchBar;
