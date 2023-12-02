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
  console.log(activities);
  const pictures = activities.map((activity) => activity.picture_src);
  console.log(pictures);
  return (
    <>
      <div className='dev-styling flex flex-col align-middle justify-center'>
        <h3>{name}</h3>
        <Splide options={{ rewind: true }}>
          {pictures.length &&
            pictures.map((pic) => {
              return (
                // <div className='rounded-md -ml-1 min-w-[145px] flex px-1 bg-voyagrWhite z-40'>
                <SplideSlide className={'flex '}>
                  <div className=''>
                    <DynamicMap
                      locationCoordinates={startLocation}
                      type={'feed'}
                      action={'view'}
                    />
                  </div>
                  <img
                    className='object-cover rounded-md mx-5 h-[236px] '
                    src={`${IMG_BASE_URL}/${picture}`}
                  ></img>
                </SplideSlide>
                // </div>
              );
            })}
        </Splide>
      </div>
    </>
  );
};