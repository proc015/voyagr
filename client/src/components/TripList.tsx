import { Trip } from '../types/Trip';
import TripComponent from './TripComponent';

interface TripListProps {
  trip: Trip;
}

const TripList = ({ trip }: TripListProps) => {
  console.log('trip list', trip);

  return (
    <div className='trip-list'>
      <TripComponent trip={trip} />
    </div>
  );
};

export default TripList;

/* {trips.length ? (
        trips.map((trip) => {
          return (
            <TripComponent key={trip.trip_id} trip={trip} />
          );
        })
      ) : (
        <p> no trips to show at this time </p>
      )} */
