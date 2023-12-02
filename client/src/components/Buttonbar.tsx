import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { HeartIcon } from './heartIcon';
import { CommentIcon } from './commentIcon';
import { ShareIcon } from './shareIcon';
import { Share } from '@mui/icons-material';

export const Buttonbar = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className='Buttonbar mt-2'>
      <div className='Buttonbar h-5 flex justify-around'>
        <button onClick={() => setLiked(!liked)}>
          <HeartIcon
            className={`w-6  ${
              liked ? ' fill-[#ff0000] stroke-none' : 'stroke-1 fill-none'
            } `}
          />
        </button>
        <div className='line bg-voyagrBorders w-[1px] h-full'></div>
        <button>
          <CommentIcon className='w-6' />
        </button>
        <div className='line bg-voyagrBorders w-[1px] h-full'></div>

        <button>
          <ShareIcon />
        </button>
      </div>
      <div className='mt-2 line bg-voyagrBorders h-[1px] w-full'></div>
    </div>
  );
};
