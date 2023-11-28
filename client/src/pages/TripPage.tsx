import { Link } from 'react-router-dom';
import { Trip } from '../types/Trip';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchUserTrips } from '../services/fetchTrip';
import TripComponent from '../components/TripComponent';

function TripPage() {
  const dispatch = useDispatch<AppDispatch>();

  //hardcoding user_id until we create actual functionality 
  const user_id = 1; 

  useEffect(() => {
    dispatch(fetchUserTrips(user_id));
  }, [dispatch, user_id]);

  return (
    <div>
      <TripComponent />
    </div>
  );
}

export default TripPage;
