import { postActivity } from '../../services/apiService';
import { Activity } from '../../types/Activity';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addActivity } from '../../redux/addActivitySlice';
import { DynamicMap } from '../maps/dynamicMap';

const AddActivity = () => {
  const dispatch = useAppDispatch();

  const [trip_id, setTripId] = useState<number>(0);
  const [activity_name, setActivityName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [loc_lat_lon, setLoc_lat_lon] = useState<number[]>([]);
  const [activity_id] = useState(0);

  const [newActivity, setNewActivity] = useState<Activity>({
    activity_id,
    trip_id,
    activity_name,
    location,
    type,
    date,
    loc_lat_lon,
  });

  const newActivityObj: Activity = {
    activity_id,
    trip_id,
    activity_name,
    location,
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
          value={trip_id}
          onChange={handleTripIdChange}
        />
      </label>

      <label>
        Activity Name:
        <input
          id='activity_name'
          type='text'
          required={true}
          placeholder=''
          value={activity_name}
          onChange={handleActivityNameChange}
        />
      </label>

      <label>
        Location:
        <DynamicMap
          locationCoordinates={loc_lat_lon}
          setLocationCoordinates={setLoc_lat_lon}
          setLocationAddress={setLocation}
          type={'activity'}
          action={'create'}
        />
      </label>

      <label>
        Type:
        <input
          id='type'
          type='text'
          required={true}
          placeholder=''
          value={type}
          onChange={handleTypeChange}
        />
      </label>

      <label>
        Date:
        <input
          id='date'
          type='date'
          required={true}
          value={date}
          onChange={handleDateChange}
        />
      </label>

      <input type='submit' value='Submit' />
    </form>
  );
};

export default AddActivity;
