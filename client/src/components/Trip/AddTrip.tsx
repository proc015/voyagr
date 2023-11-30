import { useAppDispatch } from '../../app/hooks';
import { Trip } from '../../types/Trip';
import { postTrip, uploadPhoto } from '../../services/apiService';
import { addTrip } from '../../redux/addTripSlice';
import { ChangeEvent, FormEvent, useState } from 'react';
import { DynamicMap } from '../maps/dynamicMap';
// import * as dayjs from 'dayjs';

const AddTrip = () => {
  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState<number>(0);
  const [trip_name, setTripName] = useState<string>('');
  const [tripNameError, setTripNameError] = useState('');
  const [start_loc, setStartLoc] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [start_date, setStartDate] = useState<string>('');
  const [end_date, setEndDate] = useState<string>('');
  const [picture_src, setPicture_src] = useState('');
  const [start_lat_lon, setStart_lat_lon] = useState<number[]>([]);
  const [dest_lat_lon, setDest_lat_lon] = useState<number[]>([]);

  const [newTrip, setNewTrip] = useState<Trip>({
    trip_id,
    userId,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
    start_lat_lon,
    dest_lat_lon,
    picture_src,
    published,
    activities,
  });

  const newTripObj: Trip = {
    trip_id, 
    userId,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
    start_lat_lon,
    dest_lat_lon,
    picture_src,
    published, 
    activities,
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    // convert event.target.value to a number from a string
    const convertStringtoNum = Number(event.target.value);
    setUserId(convertStringtoNum);
  };

  const handleTripNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newName.length <= 100) {
      setTripName(newName);
      setTripNameError('');
    } else {
      setTripNameError('Sorry, but the trip name is too long!');
    }
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const filename = event.target.files![0].name;
    setPicture_src(filename);
    console.log(filename);
    uploadPhoto(event.target.files);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tripNameError === '') {
      postTrip(newTripObj).then((createdTrip) =>
        dispatch(addTrip(createdTrip))
      );
      setNewTrip({
        trip_id: 0,
        userId: 0,
        trip_name: '',
        start_loc: '',
        destination: '',
        start_date: '',
        end_date: '',
        start_lat_lon: [],
        dest_lat_lon: [],
        picture_src: '',
        published: false, 
        activities: [],
      });
    }
  };

  // const dateTest = dayjs('2019-01-30').format('MM/YY')
  // console.log(dateTest)

  return (
    <form onSubmit={handleSubmit} className=''>
      <label>
        User ID:
        <input
          id='user_id'
          type='value'
          required={true}
          placeholder='Insert number'
          value={user_id}
          onChange={handleUserIdChange}
        />
      </label>

      <div className='w-[95%] h-[150px] bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Trip Name</p>
          <input
            id='trip_name'
            type='text'
            required={true}
            className='mt-1 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            placeholder='add trip name'
            value={trip_name}
            onChange={handleTripNameChange}
          />
        </label>
      </div>

      <div className='w-[95%] h-full bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Where to?</p>
          <DynamicMap
            locationCoordinates={start_lat_lon}
            destinationCoordinates={dest_lat_lon}
            setLocationCoordinates={setStart_lat_lon}
            setDestinationCoordinates={setDest_lat_lon}
            setLocationAddress={setStartLoc}
            setDestinationAddress={setDestination}
            type={'trip'}
            action={'create'}
          />
        </label>
      </div>

      <div className='w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 mx-auto mb-5'>
        <p className='p-3 pt-3 w-full text-zinc-800 text-3xl font-normal font-noto'>
          When?
        </p>
        <label>
          <input
            id='start_date'
            type='date'
            required={true}
            className='mt-1 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            value={start_date}
            onChange={handleStartDateChange}
          />
        </label>
        <label>
          <input
            id='end_date'
            type='date'
            className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            value={end_date}
            onChange={handleEndDateChange}
          />
        </label>
      </div>

      <div className='w-[95%] h-[150px] bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Trip Name</p>
          <input
            id='photo'
            type='file'
            className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            accept='image/png, image/jpeg'
            onChange={handlePhotoUpload}
          />
        </label>
      </div>
      <input
        type='submit'
        value='Submit'
        className='w-[20%] h-auto bg-#ffffff rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 content-center'
      />
    </form>
  );
};

export default AddTrip;
