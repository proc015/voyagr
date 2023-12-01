import { Trip } from '../types/Trip';
import { Buttonbar } from './Buttonbar';
import { Profilebar } from './Profilebar';
import { Tripbox } from './Tripbox';

interface FeedTripProp {
  feedTrip: Trip;
  picture: string; //NOTE mock prop
}

const FeedComponent = ({ feedTrip, picture }: FeedTripProp) => {
  console.log('feedTrip', feedTrip);
  console.log('feedTrip activity', feedTrip.activities);

  if (!feedTrip) {
    return null;
  }

  return (
    <div className='h-fit m-5'>
      {/* <Profilebar /> */}
      <Tripbox
        picture={picture}
        name={feedTrip.trip_name}
        startLocation={feedTrip.start_lat_lon}
        destination={feedTrip.dest_lat_lon}
        startDate={feedTrip.start_date}
        endDate={feedTrip.end_date}
        activities={feedTrip.activities}
      />
      <Buttonbar />
      {/* <h1>{feedTrip.trip_name}</h1>
      <p>Start Location: {feedTrip.start_loc}</p>
      <p>Destination: {feedTrip.destination}</p>
      <p>Start Date: {feedTrip.start_date}</p>
      <p>End Date: {feedTrip.end_date}</p> */}

      {/* {feedTrip.activities &&
        feedTrip.activities.map((feedActivity) => (
          <div key={feedActivity.activity_id}>
            <h3> Activity: {feedActivity.activity_name}</h3>
            <p>Date: {feedActivity.date}</p>
            <p>Location: {feedActivity.location}</p>
            <p>Type: {feedActivity.type}</p>
          </div>
        ))} */}
    </div>
  );
};

export default FeedComponent;
