import { postActivity, uploadPhoto } from '../../services/apiService';
import { Activity } from '../../types/Activity';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addActivity } from '../../redux/addActivitySlice';
import { DynamicMap } from '../maps/dynamicMap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ActivitySmallDetails from './ActivitySmallDetails';

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
  const [activityAdded, setActivityAdded] = useState(false);

  const tripId = useSelector(
    (state: RootState) => state.lastTrip.lastTrip.trip_id
  );

  // const tripIdentifier = useSelector(
  //   (state: RootState) => state.tripid.currentTrip
  // );

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
    picture_src,
  };

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
    event.stopPropagation();

    const filename = event.target.files![0].name;
    setPicture_src(filename);
    uploadPhoto(event.target.files);
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(newActivityObj);
    postActivity(newActivityObj).then((createdActivity) => {
      dispatch(addActivity(createdActivity));
      // Update the grouped state
      setNewActivity(newActivityObj);
      // Reset individual state variables

      setActivityName('');
      //TODO: check with sal - setLocation field does not seem to reset when you add activity
      setLocation('');
      setLoc_lat_lon([]);
      setPicture_src('');
      setType('');
      setDate('');
      setLocation('');
      setActivityAdded(true);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='add-trip-form-container mt-5'>
        <div className='w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 mx-auto mb-5'>
          <div className='w-full  text-3xl font-normal font-noto'>
            <p className='p-3 pb-3 pt-3'>Activities?</p>
            <ActivitySmallDetails
              activityAdded={activityAdded}
              setActivityAdded={setActivityAdded}
            />

            <div className='flex w-[95%] mx-auto'>
              <div>
                <input
                  type='file'
                  accept='image/png, image/jpeg'
                  name='picture_src'
                  ref={hiddenFileInput}
                  onChange={(e) => handlePhotoUpload(e)}
                  className='hidden'
                />
                <button
                  onClick={handleClick}
                  className='mt-1 mb-3 block w-[60px] py-4 border border-voyagrBorders rounded-[15px] shadow-sm text-voyagrLightGrey font-didact text-base mx-auto'
                >
                  Photo
                </button>
              </div>
              <input
                id='activity_name'
                className='mt-1 mb-3 ml-4 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm  font-didact mx-auto '
                type='text'
                required={true}
                placeholder='add activity name'
                value={activity_name}
                onChange={handleActivityNameChange}
              />
            </div>
          </div>

          <label>
            <DynamicMap
              locationCoordinates={loc_lat_lon}
              setLocationCoordinates={setLoc_lat_lon}
              setLocationAddress={setLocation}
              type={'activity'}
              action={'create'}
              style={{
                height: '175px',
                width: '95%',
                borderRadius: '20px',
                margin: '10px',
              }}
            />
          </label>

          <div className='flex w-[95%] mx-auto space-x-5'>
            <label>
              <p className='ml-0 mr-0 pt-3 w-full h-[60px]  text-3xl font-normal font-noto'>
                When?
              </p>{' '}
              <input
                id='date'
                type='date'
                className='mt-1 w-full block px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm  font-didact mx-auto mr-6'
                required={true}
                value={date}
                onChange={handleDateChange}
              />
            </label>

            <label className='w-[100%]  text-3xl font-normal font-noto'>
              <p className='pb-3 pt-3'>Type</p>
              <select
                id='type'
                required={true}
                value={type}
                onChange={handleTypeChange}
                className='mt-1 block w-full h-[60px] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base font-didact mx-auto'
              >
                <option value='nightlife'>Nightlife</option>
                <option value='restaurant'>Restaurant</option>
                <option value='sightseeing'>Sightseeing</option>
                <option value='leisure'>Leisure</option>
                <option value='other'>Other</option>
              </select>
            </label>
          </div>

          <label className='w-full  text-3xl font-noto'>
            <p className='p-3 pb-3 pt-3 mt-3'>Who?</p>
            <input
              id='participants'
              type='text'
              placeholder='add buddies'
              className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm  font-didact mx-auto '
            />
          </label>

          <label className='w-full  text-3xl font-noto'>
            <p className='p-3 pb-3 pt-3'>Tags!</p>
            <input
              id='tags'
              className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm  font-didact mx-auto '
              type='text'
              required={false}
              placeholder='add tags'
              onChange={handleTagChange}
            />
          </label>

          <div className='w-2/5 m-auto text-voyagrBlack text-center text-xl py-1 rounded-full border-voyagrBlack border font-noto'>
            <input type='submit' value='Save activity' className='mx-auto' />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddActivity;
