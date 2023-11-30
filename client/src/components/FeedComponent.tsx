import { Trip } from '../types/Trip';

interface FeedTripProp {
  feedTrip: Trip;
}

const FeedComponent = ({ feedTrip }: FeedTripProp) => {
  
    console.log('feedTrip', feedTrip);
    console.log('feedTrip activity', feedTrip.activities);

  if (!feedTrip) {
    return null;
  }

  return (
    <div>
      <h1>{feedTrip.trip_name}</h1>
      <p>Start Location: {feedTrip.start_loc}</p>
      <p>Destination: {feedTrip.destination}</p>
      <p>Start Date: {feedTrip.start_date}</p>
      <p>End Date: {feedTrip.end_date}</p>

      {feedTrip.activities &&
        feedTrip.activities.map((feedActivity) => (
          <div key={feedActivity.activity_id}>
            <h3> Activity: {feedActivity.activity_name}</h3>
            <p>Date: {feedActivity.date}</p>
            <p>Location: {feedActivity.location}</p>
            <p>Type: {feedActivity.type}</p>
          </div>
        ))}
    </div>
  );
};

export default FeedComponent;
