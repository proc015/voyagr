import { Trip } from '../../types/Trip';
import { DynamicMap } from '../maps/dynamicMap';

interface Props {
  detailedTrip: Trip;
}

const DetailedTripbox = ({ detailedTrip }: Props) => {
  // console.log('TripDetailBox:', detailedTrip);
  // console.log('TripDetailBox:', detailedTrip.activities);

  return (
    <div className='dev-styling mb-4 flex flex-col gap-2 align-middle justify-center'>
      <h3> {detailedTrip.trip_name}</h3>
      <DynamicMap
        activities={detailedTrip.activities}
        type={'activity'}
        action={'view'}
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default DetailedTripbox;