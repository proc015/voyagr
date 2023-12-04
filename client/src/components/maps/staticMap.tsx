import { Autocompletion } from './autocompletion';
import { StaticMapProps } from './types';

export const StaticMap = ({ location }: StaticMapProps) => {
  // Markers will take either an address with correct format (e.g. '+' instead of whitespace) OR lat-lang nums

  console.log('activitylocation', location[0]);
  return (
    <>
      <div className='overflow-hidden h-44 w-28'>
        <img
          style={{
            borderRadius: '15px',
            height: '120%',
            width: '100%',
            objectFit: 'cover',
          }}
          src={`https://maps.googleapis.com/maps/api/staticmap?&markers=size:tiny%7Ccolor:red%7C${location[0]},${location[1]}&zoom=11&maptype=roadmap&size=150x150&scale=2&key=AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew&style=feature:poi|element:labels|visibility:off`}
        ></img>
      </div>
    </>
  );
};
