import { ActivityFeed } from '../redux/fetchUserFeedSlice';
type Props = {
  name: string;
  startLocation: number[];
  destination: number[];
  startDate: string;
  endDate: string;
  activities: ActivityFeed[];
  picture: string;
};

export const Tripbox = ({
  name,
  startLocation,
  destination,
  startDate,
  endDate,
  activities,
  picture,
}: Props) => {
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  return (
    <>
      <div className='dev-styling flex flex-col m-5 gap-3 align-middle justify-center'>
        <h3>{name}</h3>
        <div className=' h-48 w-32 mb-4 overflow-hidden flex justify-center'>
          <img className='' src={`${IMG_BASE_URL}${picture}`}></img>
        </div>
      </div>
    </>
  );
};
