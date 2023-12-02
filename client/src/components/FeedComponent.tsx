import { Trip } from '../types/Trip';
import { Buttonbar } from './Buttonbar';
import { Profilebar } from './Profilebar';
import { Tripbox } from './Tripbox';

interface FeedTripProp {
  feedTrip: Trip;
  onSelect: () => void;
}

const FeedComponent = ({ feedTrip, onSelect }: FeedTripProp) => {
  console.log('feedTrip', feedTrip);
  // console.log('feedTrip activity', feedTrip.activities);

  if (!feedTrip) {
    return null;
  }

  const location = feedTrip.start_lat_lon.map((loc) => {
    return Number(loc);
  });

  return (
    <div className='h-fit m-5' onClick={onSelect}>
      <Profilebar />
      <Tripbox
        name={feedTrip.trip_name}
        startLocation={location}
        destination={feedTrip.dest_lat_lon}
        startDate={feedTrip.start_date}
        endDate={feedTrip.end_date}
        activities={feedTrip.activities}
      />
      <Buttonbar />
    </div>
  );
};

export default FeedComponent;
