
import { Activity } from '../types/Activity';

interface ActivityComponentProp {
    activity: Activity;
}

const ActivityComponent = ({ activity }: ActivityComponentProp) => {
    
    console.log('test', activity)
    
    if (!activity) {
      return null; // or return some fallback UI
    }
  
    return (
      <div>
        <h1>{activity.activity_name}</h1>
        <p>Start Location: {activity.location}</p>
        <p>Destination: {activity.type}</p>
        <p>Start Date: {activity.date}</p>
      </div>
    );
  };

export default ActivityComponent
