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
};

export const Tripbox = ({
  name,
  startLocation,
  destination,
  startDate,
  endDate,
  activities,
}: Props) => {
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  const pictures = activities.map((activity) => activity.picture_src);
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '170px',
    borderRadius: '6px',
  };

  return (
    <>
      <div className='dev-styling mb-4 flex flex-col gap-2 align-middle justify-center'>
        <h3>{name}</h3>
        <DynamicMap
          style={style}
          locationCoordinates={startLocation}
          type={'feed'}
          action={'view'}
        />
        {pictures.length > 0 && (
          <Splide
            options={{
              type: 'loop',
              drag: 'free',
              gap: '0.2rem',
              snap: true,
              perPage: 3,
            }}
          >
            {pictures.length &&
              pictures.map((pic) => {
                return (
                  <SplideSlide className={'flex'}>
                    <img
                      className='rounded-md max-h-[250px] '
                      src={`${IMG_BASE_URL}/${pic}`}
                    />
                  </SplideSlide>
                );
              })}
          </Splide>
        )}
      </div>
    </>
  );
};
