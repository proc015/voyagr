import { Trip } from '../types/Trip';
import TripComponent from './TripComponent';

interface TripListProps {
    trips: Trip[]; 
  }

const TripList = ({ trips }: TripListProps) => {
  
    // console.log('trip list', trips)
  
    return (
    <div className='trip-list'>
      {trips.length ? (
        trips.map((trip) => {
          return (
            <TripComponent key={trip.trip_id} trip={trip} />
          );
        })
      ) : (
        <p> no trips to show at this time </p>
      )}
    </div>
  );
};

export default TripList;
