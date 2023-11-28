import { Autocompletion } from './autocompletion';
import { StaticMapProps } from './types';

export const StaticMap = ({ setAddress, location }: StaticMapProps) => {
  // Markers will take either an address with correct format (e.g. '+' instead of whitespace) OR lat-lang nums
  const options = {
    markers: [],
    mapId: '',
    size: '',
  };

  return (
    <>
      <Autocompletion setAddress={setAddress}></Autocompletion>
      <div
        style={{
          height: '200px',
          overflow: 'hidden',
          borderRadius: '15px',
          width: 'fit-content',
        }}
      >
        <img
          style={{ borderRadius: '15px', height: '110%', width: '100%' }}
          src={
            'https://maps.googleapis.com/maps/api/staticmap?&markers=Landala,Gothenburg|Majorna,Gothenburg|Tynnered,Gothenburg&size=300x300&key=AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew&style=feature:poi|element:labels|visibility:off'
          }
        ></img>
      </div>
    </>
  );
};
