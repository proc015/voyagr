import { Link } from 'react-router-dom';
import { Trip } from '../types/Trip';
import { getUserTrips } from '../services/apiService';
import TripList from '../components/TripList';
import { useEffect, useState } from 'react';

function TripPage() {
  const [trip, setTrip] = useState<Trip>({
    // user: User; // Assuming User is a custom type defined elsewhere
    user_id: 0,
    // participants: User[]; // Array of User objects
    trip_name: '',
    start_loc: '',
    destination: '',
    start_date: '',
    end_date: '',
    picture_src: '',
    // activities: Activity[]; // Assuming Activity is a custom type defined elsewhere
    // comments: Comment[]; // Assuming Comment is a custom type defined elsewhere
    start_lat_lon: [0, 0], // Representing an array of numbers
    dest_lat_lon: [0, 0],
  });

  const user_id = 2;

  useEffect(() => {
    getUserTrips(user_id).then((userTrip) => {
      setTrip(userTrip);
    });
  }, [user_id]);

  // console.log('TripPage', trip)

  return (
    <>
      <TripList trip={trip} />
    </>
  );
}

export default TripPage;
