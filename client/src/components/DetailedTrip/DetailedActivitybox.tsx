import { Activity } from '../../types/Activity';
import { Trip } from '../../types/Trip';

interface Props {
  detailedActivity: Trip;
}

const DetailedActivitybox = ({ detailedActivity }: Props) => {
  console.log('DetailedActivity:', detailedActivity.activities);

  //TODO: add picture + map to the div below 
  
  return (
    <div>
      {detailedActivity.activities.length > 0 ? (
        detailedActivity.activities.map((allActivities) => (
          <div key={allActivities.activity_id}>
            <div> ADD PIC+STATIC MAP </div>
            <div> {allActivities.activity_name} </div>
            <div> {allActivities.location} </div>
          </div>
        ))
      ) : (
        <p> No activities </p>
      )}
    </div>
  );
};

export default DetailedActivitybox;
