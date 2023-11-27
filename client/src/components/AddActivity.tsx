import { postActivity } from '../services/apiService';
import { Activity } from '../types/Activity';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addActivity } from '../redux/addActivitySlice';

const AddActivity = () => {
  const dispatch = useAppDispatch();

  const [activity_id, setActivityId] = useState<number>(0);
  const [activity_name, setActivityName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [newActivity, setNewActivity] = useState<Activity>({
    activity_id,
    activity_name,
    location,
    type,
    date,
  });

  const newActivityObj: Activity = {
    activity_id,
    activity_name,
    location,
    type,
    date,
  };

  const handleActivityIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    // convert event.target.value to a number from a string
    const convertStringtoNum = Number(event.target.value);
    setActivityId(convertStringtoNum);
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
      setActivityId(0);
      setActivityName('');
      setLocation('');
      setType('');
      setDate('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className='add-trip-form-container'>
      <label>
        Activity ID:
        <input
          id='activity_id'
          type='value'
          required={true}
          placeholder='Insert number'
          value={activity_id}
          onChange={handleActivityIdChange}
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
        <input
          id='location'
          type='text'
          required={true}
          placeholder=''
          value={location}
          onChange={handleLocationChange}
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
