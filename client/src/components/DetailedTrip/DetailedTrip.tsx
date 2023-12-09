import { Trip } from '../../types/Trip';
import { Buttonbar } from '../Feed/Buttonbar';
import DetailedTripbox from './DetailedTripbox';
import { Profilebar } from '../Feed/Profilebar';
import DetailedActivitybox from './DetailedActivitybox';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const DetailedTrip = () => {
  const { trip_id } = useParams();
  const [openActivity, setOpenActivity] = useState(null);

  const tripNumberID = Number(trip_id);

  console.log(' open', openActivity);
  // console.log('tripID', trip_id);

  const detailedTrip = useSelector(
    (state: RootState) => state.getAllTrips.tripFeed
  );

  const filteredDetailedTrip = detailedTrip.filter(
    (trip) => trip.trip_id === tripNumberID
  );

  // console.log('FT', filteredDetailedTrip);

  // filteredDetailTrip return an array of 1 trip so this function changes back to an object before passing as a prop
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
