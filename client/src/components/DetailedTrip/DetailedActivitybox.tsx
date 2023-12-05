import { Activity } from '../../types/Activity';
import { Trip } from '../../types/Trip';
import { StaticMap } from '../maps/staticMap';

interface Props {
  detailedActivity: Trip;
}

const DetailedActivitybox = ({ detailedActivity }: Props) => {
  console.log('DetailedActivity:', detailedActivity.activities);

  //TODO: add picture + map to the div below
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  return (
    <div className='dev-styling mb-4 flex flex-col gap-2 align-middle justify-center'>
      {detailedActivity.activities.length > 0 ? (
        detailedActivity.activities.map((allActivities) => (
          <div
            key={allActivities.activity_id}
            className='dev stlying flex flex-row'
          >
            <div className='flex-1'>
              <img
                className='rounded-md max-h-[250px] '
                src={`${IMG_BASE_URL}/${allActivities.picture_src}`}
              />
              <div>
                {' '}
                <StaticMap
                  location={allActivities.loc_lat_lon}
                ></StaticMap>{' '}
              </div>
            </div>
            <div className='flex-1 flex flex-col ml-4'>
              <div>
                <h3> {allActivities.activity_name} </h3>{' '}
              </div>
              <div> {allActivities.location} </div>
            </div>
          </div>
        ))
      ) : (
        <p> No activities </p>
      )}
    </div>
  );
};

export default DetailedActivitybox;
