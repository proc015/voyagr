import { useNavigate } from 'react-router';
import { Activity } from '../../types/Activity';
import { Trip } from '../../types/Trip';
import { StaticMap } from '../maps/staticMap';

interface Props {
  detailedActivity: Trip;
}

const DetailedActivitybox = ({ detailedActivity }: Props) => {
  // console.log('DetailedActivity:', detailedActivity.activities);
  const navigate = useNavigate();

  //TODO: add picture + map to the div below
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';

  return (
    <div className='dev-styling flex flex-col gap-2 mb-20 align-middle justify-center'>
      {detailedActivity.activities.length > 0 ? (
        detailedActivity.activities.map((allActivities) => (
          <div
            onClick={() =>
              navigate(
                `/trip/${detailedActivity.trip_id}/activity/${allActivities.activity_id}`
              )
            }
            key={allActivities.activity_id}
            className='  h-full   flex items-center gap-1  rounded-[10px]'
          >
            <div className='flex flex-row rounded-[10px] overflow-hidden self-start mt-3  h-[130px] max-w-[170px]  '>
              <div className=' relative flex z-40 object-scale-down max-w-[100px]  '>
                <img
                  className='rounded-md object-cover max-w-[92px] min-w-[92px]'
                  src={`${IMG_BASE_URL}/${allActivities.picture_src}`}
                  style={{ maxHeight: '250px' }}
                />
              </div>
              <div className=' relative z-10  object-cover  min-h-[100%]'>
                <StaticMap
                  location={allActivities.loc_lat_lon}
                  className='h-full -ml-2'
                ></StaticMap>{' '}
              </div>
            </div>
            <div className='flex-1 self-start flex flex-col rounded-[10px] ml-2 py-3'>
              <div className='text-lg font-semibold font-didact mb-1'>
                <h3> {allActivities.activity_name} </h3>
              </div>
              <p className='text-voyagrLightGrey'>📍{allActivities.location}</p>
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
