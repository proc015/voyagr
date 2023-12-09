import { useState } from 'react';
import { HeartIcon } from '../../assets/icons/heartIcon';
import { CommentIcon } from '../../assets/icons/commentIcon';
import { ShareIcon } from '../../assets/icons/shareIcon';

export const Buttonbar = () => {
  const [liked, setLiked] = useState(false);

  const stopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <div className='Buttonbar mb-8' onClick={stopPropagation}>
      <div className='Buttonbar h-7 flex justify-around'>
        <button onClick={() => setLiked(!liked)}>
          <HeartIcon
            className={`w-6  ${
              liked
                ? ' fill-[rgb(233,68,68)] stroke-[rgb(233,68,68)] stroke-2'
                : 'stroke-1 stroke-voyagrBlack fill-none'
            } `}
          />
        </button>
        <div className='line bg-voyagrBorders w-[1px] h-full'></div>
        <button>
          <CommentIcon className='w-6 stroke-voyagrBlack' />
        </button>
        <div className='line bg-voyagrBorders w-[1px] h-full'></div>

        <button>
          <ShareIcon className='w-6 stroke-voyagrBlack' />
        </button>
      </div>
      <div className='mt-2 line bg-voyagrBorders h-[2px] w-full'></div>
    </div>
  );
};
