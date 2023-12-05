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
            className='dev stlying flex flex-row items-center gap-1 border-2 border-voyagrBorders rounded-[10px]'
          >
            <div className='flex flex-row rounded-[10px] w-4/10 '> 
            <div className='w-1/2 relative z-40'> 
              <img
                className='rounded-md w-full object-cover h-[100px]'
                src={`${IMG_BASE_URL}/${allActivities.picture_src}`}
                style={{maxHeight: '250px'}}
              />
              </div>
              <div className='w-1/2 relative z-10'>
                <StaticMap
                  location={allActivities.loc_lat_lon}
                  className='h-[100px] -ml-5'
                ></StaticMap>{' '}
            </div>
            </div>
            <div className='flex-1 flex flex-col ml-4'>
              <div className='text-2xl font-semibold font-noto mb-1'>
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
