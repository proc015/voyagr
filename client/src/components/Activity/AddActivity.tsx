import { postActivity, uploadPhoto } from '../../services/apiService';
import { Activity } from '../../types/Activity';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addActivity } from '../../redux/addActivitySlice';
import { DynamicMap } from '../maps/dynamicMap';

const AddActivity = () => {
  const dispatch = useAppDispatch();

  const [tripId, setTripId] = useState<number>(0);
  const [activity_name, setActivityName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>(''); // this  is unwanted
  const [picture_src, setPicture_src] = useState('');
  const [loc_lat_lon, setLoc_lat_lon] = useState<number[]>([]);
  const [activity_id] = useState(0);

  const [newActivity, setNewActivity] = useState<Activity>({
    activity_id,
    tripId,
    activity_name,
    location,
    description,
    type,
    date,
    loc_lat_lon,
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
  };

  const handleTripIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    // convert event.target.value to a number from a string
    const convertStringtoNum = Number(event.target.value);
    setTripId(convertStringtoNum);
  };

  const handleActivityNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActivityName(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postActivity(newActivityObj).then((createdActivity) => {
      dispatch(addActivity(createdActivity));
      // Update the grouped state
      setNewActivity(newActivityObj);
      // Reset individual state variables
      setTripId(0);
      setActivityName('');
      setLocation('');
      setType('');
      setDate('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className='add-trip-form-container'>
      <label>
        Trip ID:
        <input
          id='trip_id'
          type='value'
          required={true}
          placeholder='Insert number'
          value={tripId}
          onChange={handleTripIdChange}
        />
      </label>

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

        <label>
          <p className='p-3 pt-3 w-full text-zinc-800 text-3xl font-normal font-noto'>
            When?
          </p>{' '}
          <input
            id='date'
            type='date'
            className='mt-1 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
            required={true}
            value={date}
            onChange={handleDateChange}
          />
        </label>

        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Type</p>
          <select
            id='type'
            required={true}
            value={type}
            onChange={handleTypeChange}
            className='mt-1 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto'
          >
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </select>
        </label>

        <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
          <p className='p-3 pb-3 pt-3'>Who?</p>
          <input
            id='participants'
            type='text'
            placeholder='add buddies'
            className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
          />
        </label>

        <div className='w-full text-zinc-800 text-xl font-normal flex font-noto mx-auto'>
          <input type='submit' value='Submit' className='mx-auto' />
        </div>
      </div>
    </form>
  );
};

export default AddActivity;
