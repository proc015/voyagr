import { useAppDispatch } from '../../app/hooks';
import { Trip } from '../../types/Trip';
import { postTrip, uploadPhoto } from '../../services/apiService';
import { addTrip } from '../../redux/addTripSlice';
import { ChangeEvent, FormEvent, useState } from 'react';
import { DynamicMap } from '../maps/dynamicMap';
// import * as dayjs from 'dayjs';

const AddTrip = () => {
  const dispatch = useAppDispatch();

  const [user_id, setUserId] = useState<number>(0);
  const [trip_name, setTripName] = useState<string>('');
  const [start_loc, setStartLoc] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [start_date, setStartDate] = useState<string>('');
  const [end_date, setEndDate] = useState<string>('');
  const [picture_src, setPicture_src] = useState('');
  const [start_lat_lon, setStart_lat_lon] = useState<number[]>([]);
  const [dest_lat_lon, setDest_lat_lon] = useState<number[]>([]);

  const [newTrip, setNewTrip] = useState<Trip>({
    user_id,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
    start_lat_lon,
    dest_lat_lon,
    picture_src,
  });

  const newTripObj: Trip = {
    user_id,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
    start_lat_lon,
    dest_lat_lon,
    picture_src,
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    // convert event.target.value to a number from a string
    const convertStringtoNum = Number(event.target.value);
    setUserId(convertStringtoNum);
  };

  const handleTripNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTripName(event.target.value);
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
    postTrip(newTripObj).then((createdTrip) => dispatch(addTrip(createdTrip)));
    setNewTrip({
      user_id: 0,
      trip_name: '',
      start_loc: '',
      destination: '',
      start_date: '',
      end_date: '',
      start_lat_lon: [],
      dest_lat_lon: [],
      picture_src: '',
    });
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

      <div className='w-[95%] h-[150px] bg-stone-50 rounded-[20px] shadow-lg border-zinc-300 border p-2 flex mx-auto mb-5'>
        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Trip Name</p>
          <input
            id='trip_name'
            type='text'
            required={true}
            className='mt-1 block w-[95%] px-5 py-4 border border-gray-300 rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            placeholder='add trip name'
            value={trip_name}
            onChange={handleTripNameChange}
          />
        </label>
      </div>

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

      <label>
        Start Date:
        <input
          id='start_date'
          type='date'
          required={true}
          value={start_date}
          onChange={handleStartDateChange}
        />
      </label>

      <label>
        End Date:
        <input
          id='end_date'
          type='date'
          value={end_date}
          onChange={handleEndDateChange}
        />
      </label>

      <label>
        Add a photo!
        {/* THIS INITS PHOTO UPLOAD AS SOON AS FILE IS SELECTED */}
        <input
          id='photo'
          type='file'
          accept='image/png, image/jpeg'
          onChange={handlePhotoUpload}
        />
      </label>

      <input type='submit' value='Submit' />
    </form>
  );
};

export default AddTrip;
