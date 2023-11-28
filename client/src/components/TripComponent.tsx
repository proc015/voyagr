import { Trip } from '../types/Trip';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const TripComponent = () => {
  const userTrip = useSelector((state: RootState) => state.getTrip.trip);
  // const status = useSelector((state: RootState) => state.getTrip.status);

  console.log(userTrip);

  if (userTrip) {
    return (
      <div>
        <h1>{userTrip.trip_name}</h1>
        <p>Start Location: {userTrip.start_loc}</p>
        <p>Destination: {userTrip.destination}</p>
        <p>Start Date: {userTrip.start_date}</p>
        <p>End Date: {userTrip.end_date}</p>
      </div>
    );
  }
};

export default TripComponent;
