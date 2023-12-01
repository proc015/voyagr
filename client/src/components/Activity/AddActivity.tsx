import { postActivity, uploadPhoto } from '../../services/apiService';
import { Activity } from '../../types/Activity';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addActivity } from '../../redux/addActivitySlice';
import { DynamicMap } from '../maps/dynamicMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


const AddActivity = () => {
  const dispatch = useAppDispatch();

  // const [tripId, setTripId] = useState<number>(0);
  const [activity_name, setActivityName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>(''); // this  is unwanted
  const [picture_src, setPicture_src] = useState<string>(''); // Updated to store the image URL
  const [loc_lat_lon, setLoc_lat_lon] = useState<number[]>([]);
  const [activity_id] = useState(0);

  const tripId = useSelector((state: RootState) => state.tripid.currentTrip
  );
  
  const [newActivity, setNewActivity] = useState<Activity>({
    activity_id,
    tripId: tripId,
    activity_name,
    location,
    description,
    type,
    date,
    loc_lat_lon,
    picture_src,
  });

  const newActivityObj: Activity = {
    activity_id,
    tripId,
    activity_name,
    location,
    description,
    type,
    date,
    loc_lat_lon,
    picture_src
  };

  // const handleTripIdChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   // convert event.target.value to a number from a string
  //   const convertStringtoNum = Number(event.target.value);
  //   setTripId(convertStringtoNum);
  // };

  const handleActivityNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActivityName(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filename = event.target.files[0].name;
      setPicture_src(filename);
      console.log(filename);
      uploadPhoto(event.target.files);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postActivity(newActivityObj).then((createdActivity) => {
      dispatch(addActivity(createdActivity));
      // Update the grouped state
      setNewActivity(newActivityObj);
      // Reset individual state variables
      // setTripId(0);
      setActivityName('');
      setLocation('');
      setType('');
      setDate('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className='add-trip-form-container'>
      {/* <label>
        Trip ID:
        <input
          id='trip_id'
          type='value'
          required={true}
          placeholder='Insert number'
          value={tripId}
          onChange={handleTripIdChange}
        />
      </label> */}

      <div className='w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 mx-auto mb-5'>
        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Activities?</p>
          <div className='flex w-[95%] mx-auto'>
            <div>
              <input
                type='file'
                ref={hiddenFileInput}
                className='hidden'
                accept='image/png, image/jpeg'
                onChange={handlePhotoUpload}
              />
              <button
                onClick={handleClick}
                className='mt-1 mb-3 block w-[60px] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto'
              >
                +
              </button>
            </div>
            <input
              id='activity_name'
              className='mt-1 mb-3 ml-4 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
              type='text'
              required={true}
              placeholder='add activity name'
              value={activity_name}
              onChange={handleActivityNameChange}
            />
          </div>
        </label>

        <label>
          <DynamicMap
            locationCoordinates={loc_lat_lon}
            setLocationCoordinates={setLoc_lat_lon}
            setLocationAddress={setLocation}
            type={'activity'}
            action={'create'}
          />
        </label>

        <div className='flex w-[95%] mx-auto space-x-5'>
          <label>
            <p className='ml-0 mr-0 pt-3 w-full h-[60px] text-zinc-800 text-3xl font-normal font-noto'>
              When?
            </p>{' '}
            <input
              id='date'
              type='date'
              className='mt-1 w-full block px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto mr-6'
              required={true}
              value={date}
              onChange={handleDateChange}
            />
          </label>

          <label className='w-[100%] text-zinc-800 text-3xl font-normal font-noto'>
            <p className='pb-3 pt-3'>Type</p>
            <select
              id='type'
              required={true}
              value={type}
              onChange={handleTypeChange}
              className='mt-1 block w-full h-[60px] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto'
            >
              <option value='nightlife'>Nightlife</option>
              <option value='restaurant'>Restaurant</option>
              <option value='sightseeing'>Sightseeing</option>
              <option value='leisure'>Leisure</option>
              <option value='other'>Other</option>
            </select>
          </label>
        </div>

        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Who?</p>
          <input
            id='participants'
            type='text'
            placeholder='add buddies'
            className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
          />
        </label>

        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Tags!</p>
          <input
            id='tags'
            className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            type='text'
            required={false}
            placeholder='add tags'
            // value={tag} //missing state variable
            onChange={handleTagChange}
          />
        </label>

        <div className='w-full text-zinc-800 text-xl font-normal flex font-noto '>
          <input type='submit' value='Submit' className='mx-auto' />
        </div>
      </div>
    </form>
  );
};

export default AddActivity;
