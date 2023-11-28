import { Trip } from '../types/Trip';

interface TripProps {
  trip: Trip; 
}

const TripComponent = ({ trip }: TripProps) => {
 
 console.log('trip component', trip)

  return (
    <div>
      <p> {trip.trip_name}</p>
      <p> {trip.start_loc}</p>
      <p> {trip.destination}</p>
      <p> {trip.start_date}</p>
      <p> {trip.end_date}</p>

    </div>
  );
};

export default TripComponent;
