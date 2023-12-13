import { Buttonbar } from '../Feed/Buttonbar';
import DetailedTripbox from './DetailedTripbox';
import { Profilebar } from '../Feed/Profilebar';
import DetailedActivitybox from './DetailedActivitybox';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const DetailedTrip = () => {
  const { trip_id } = useParams();

  const tripNumberID = Number(trip_id);

  const detailedTrip = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  const filteredDetailedTrip = detailedTrip.filter(
    (trip) => trip.trip_id === tripNumberID
  );

  const tripDetails = filteredDetailedTrip[0];

  return (
    <div className='dev-styling flex flex-col h-fit my-1 mx-2 overflow-auto'>
      <div className='flex-grow overflow-auto'>
        <Profilebar feedTrip={tripDetails} />
        <DetailedTripbox detailedTrip={tripDetails} />
        <Buttonbar />
        <DetailedActivitybox detailedActivity={tripDetails} />
      </div>
    </div>
  );
};

export default DetailedTrip;
