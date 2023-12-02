import { Activity } from '../types/Activity';
import Carousel from 'react-material-ui-carousel';
import { DynamicMap } from './maps/dynamicMap';
import { StaticMap } from './maps/staticMap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

type Props = {
  name: string;
  startLocation: number[];
  destination: number[];
  startDate: string;
  endDate: string;
  activities: Activity[];
  picture: string;
};
//

export const Tripbox = ({
  name,
  startLocation,
  destination,
  startDate,
  endDate,
  activities,
  picture,
}: Props) => {
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  console.log('ACTIVITIES', activities);

  const pictures = activities.map((activity) => activity.picture_src);
  console.log('PICTURES', name, pictures);
  return (
    <>
      <div className='dev-styling mx-4 flex flex-col gap-3 align-middle justify-center'>
        <h3>{name}</h3>
        <DynamicMap
          locationCoordinates={startLocation}
          type={'feed'}
          action={'view'}
        />

        <Splide
          options={{
            type: 'loop',
            drag: 'free',
            gap: '0.5rem',
            snap: true,
            perPage: 3,
            // gap: 'rem',
          }}
        >
          {pictures.length &&
            pictures.map((pic) => {
              return (
                <SplideSlide className={'flex'}>
                  <img
                    className='rounded-md max-h-[250px] max-w-[106px]'
                    src={`${IMG_BASE_URL}/${pic}`}
                  />
                </SplideSlide>

                // </div>
              );
            })}
        </Splide>
      </div>
    </>
  );
};

// {/* VIEW WITH 3 IMGS --START */}
// {/* LEFT */}
// <div className=' h-fit w-fit mb-4 relative flex justify-center'>
//   <div className=' z-50 bg-voyagrWhite pr-1 rounded-md'>
//     <DynamicMap
//       locationCoordinates={startLocation.map((loc) => {
//         return Number(loc);
//       })}
//       type={'feed'}
//       action={'view'}
//     />
//   </div>

//   {/* MIDDLE */}
//   <div className='rounded-md -ml-1 min-w-[145px] px-1 bg-voyagrWhite z-40'>
//     <img
//       className='object-cover rounded-md h-56 '
//       src={`${IMG_BASE_URL}${picture}`}
//     ></img>
//   </div>

//   {/* RIGHT */}
//   <div className='z-10 -ml-5 max-w-[200px] flex px-1'>
//     <div className='bg-[#000000] rounded-md self-center'>
//       <img
//         className='object-cover rounded-md h-44 opacity-50'
//         src={`${IMG_BASE_URL}/nfmxmdamug9x5rk7icya`}
//       ></img>
//     </div>
//   </div>
// </div>

// {/* --VIEW WITH 4 IMGS-- */}
// <div className='h-fit w-fit mb-4 relative flex justify-center z-10'>
//   {/* LEFT */}
//   <div className='z-10 flex px-1 '>
//     <div className='bg-[#000000] self-center rounded-md'>
//       <img
//         className='object-cover rounded-md h-44 opacity-50'
//         // Maybe make this one into the last pic in previous view
//         src={`${IMG_BASE_URL}${picture}`}
//       ></img>
//     </div>
//   </div>

//   {/* MIDDLE */}
//   <div className='rounded-md -ml-5 w-42 min-w-[158px] px-1 bg-voyagrWhite z-50'>
//     <img
//       className='object-cover rounded-md h-56 '
//       src={`${IMG_BASE_URL}/nfmxmdamug9x5rk7icya`}
//     ></img>
//   </div>

//   <div className='rounded-md -ml-2 w-42 min-w-[135px] px-1 bg-voyagrWhite z-40'>
//     <img
//       className='object-cover rounded-md h-56'
//       src={`${IMG_BASE_URL}/upg7ol4qczag7ieknei0`}
//     ></img>
//   </div>

//   {/* RIGHT */}
//   <div className='z-10 -ml-5 flex px-1'>
//     <div className='bg-[#000000] self-center rounded-md '>
//       <img
//         className='object-cover rounded-md h-44 opacity-50'
//         src={`${IMG_BASE_URL}/qfgxwtcfu74hukqtvrgh`}
//       ></img>
//     </div>
//   </div>
// </div>

// {/* VIEW WITH 3 IMGS END--- */}
// <div className=' h-fit w-fit mb-4 relative flex justify-center'>
//   {/* LEFT */}
//   <div className='z-10 -mr-5 max-w-[120px] flex px-1'>
//     <div className='bg-[#000000] rounded-md self-center'>
//       <img
//         className='object-cover rounded-md h-44 opacity-50'
//         src={`${IMG_BASE_URL}/nfmxmdamug9x5rk7icya`}
//       ></img>
//     </div>
//   </div>

//   {/* MIDDLE */}
//   <div className='rounded-md -mr-5 px-1 bg-voyagrWhite z-40'>
//     <img
//       className='object-cover rounded-md h-56 '
//       src={`${IMG_BASE_URL}${picture}`}
//     ></img>
//   </div>

//   {/* RIGHT */}

//   <div className=' z-50 bg-voyagrWhite px-1 rounded-md '>
//     <img
//       className='object-cover rounded-md h-56 min-w-[150px]'
//       src={`${IMG_BASE_URL}/r0qt9zxyeevfqaz9wzrd`}
//     ></img>
//   </div>
// </div>

{
  /* <div className=' h-fit w-fit mb-4 relative flex justify-center'> */
}
// <div className=' z-50 bg-voyagrWhite pr-1 rounded-md'>
//   <DynamicMap
//     locationCoordinates={startLocation.map((loc) => {
//       return Number(loc);
//     })}
//     type={'feed'}
//     action={'view'}
//   />
// </div>

// {pictures.length &&
//   pictures.map((pic) => {
//     return (
//       <div className='rounded-md -ml-1 min-w-[145px] flex px-1 bg-voyagrWhite z-40'>
//         <img
//           className='object-cover rounded-md h-56 '
//           src={`${IMG_BASE_URL}/${picture}`}
//         ></img>
//       </div>
//     );
//   })}
