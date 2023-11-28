import { Link } from 'react-router-dom';
import { Trip } from '../types/Trip';
import { getUserTrips } from '../services/apiService';
import TripList from '../components/TripList';
import { useEffect, useState } from 'react'; 


function TripPage() {
  const [trips, setTrips] = useState<Trip[]>([])

// const user_id = 3; 

useEffect(()=> {
  getUserTrips().then((userTrips) => {
    setTrips(userTrips);
  });
}, [])

// useEffect(()=> {
//     getUserTrips(user_id).then((userTrips) => {
//       setTrips(userTrips);
//     });
//   }, [user_id])

console.log('TripPage', trips)

  return (
    <>
      <TripList 
      trips={trips}
      />
    </>
  );
}

export default TripPage;
