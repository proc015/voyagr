import { Link } from 'react-router-dom';
import AddTrip from '../components/AddTrip';
import AddActivity from '../components/AddActivity';
import Publish from '../components/Publish';


function AddTripPage() {
  return (
    <>
      <AddTrip />
      <AddActivity />
      < Publish />
    </>
  );
}

export default AddTripPage;
