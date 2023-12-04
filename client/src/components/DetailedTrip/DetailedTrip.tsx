import { Trip } from '../../types/Trip';
import { Buttonbar } from '../Buttonbar';
import DetailedTripbox from './DetailedTripbox';
import { Profilebar } from '../Profilebar';
import DetailedActivitybox from './DetailedActivitybox';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailedTrip = () => {
  const { trip_id } = useParams();

  const tripNumberID = Number(trip_id);

  console.log('tripID', trip_id);

  const detailedTrip = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  const filteredDetailedTrip = detailedTrip.filter(
    (trip) => trip.trip_id === tripNumberID
  );

  console.log('FT', filteredDetailedTrip);

  // filteredDetailTrip return an array of 1 trip so this function changes back to an object
  // before passing as a prop
  const tripDetails = filteredDetailedTrip[0];

  return (
    <div className='dev-styling absolute mt-24 mb-4 inset-0 flex flex-col h-fit m-5 overflow-auto bg-white'>
      <div className='flex-grow overflow-auto'>
        <Profilebar />
        <DetailedTripbox detailedTrip={tripDetails} />
        <Buttonbar />
        <DetailedActivitybox detailedActivity={tripDetails} />
      </div>
    </div>
  );
};

export default DetailedTrip;
