import { useAppDispatch } from '../app/hooks';
import { Trip } from '../types/Trip';
import { postTrip } from '../services/apiService';
import { addTrip } from '../redux/addTripSlice';
import { ChangeEvent, FormEvent, useState } from 'react';

// import * as dayjs from 'dayjs';

const AddTrip = () => {
  const dispatch = useAppDispatch();

  const [user_id, setUserId] = useState<number>(0);
  const [trip_name, setTripName] = useState<string>('');
  const [start_loc, setStartLoc] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [start_date, setStartDate] = useState<string>('');
  const [end_date, setEndDate] = useState<string>('');

  const [newTrip, setNewTrip] = useState<Trip>({
    user_id,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
  });

  const newTripObj: Trip = {
    user_id,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    
    // convert event.target.value to a number from a string 
    const convertStringtoNum = Number(event.target.value);
    setUserId(convertStringtoNum);
  };

  const handleTripNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTripName(event.target.value);
  };

  const handleStartLocChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartLoc(event.target.value);
  };

  const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value)
    }

     
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        postTrip(newTripObj).then((createdTrip)=>
        dispatch(addTrip(createdTrip)));
        setNewTrip({
        user_id: 0, 
        trip_name: '',
        start_loc: '', 
        destination: '', 
        start_date: '',
        end_date: '',
        });
        };
    
    // const dateTest = dayjs('2019-01-30').format('MM/YY') 
    // console.log(dateTest)
  
    return (
    <form onSubmit={handleSubmit} className="add-trip-form-container">
        
        <label> User ID: 
            <input
                id="user_id"
                type="value"
                required={true}
                placeholder="Insert number"
                value={user_id}
                onChange={handleUserIdChange}
                />
        </label>

      <label>
        Trip Name:
        <input
          id='trip_name'
          type='text'
          required={true}
          placeholder=''
          value={trip_name}
          onChange={handleTripNameChange}
        />
      </label>

      <label>
        Start Location:
        <input
          id='start_loc'
          type='text'
          required={true}
          placeholder=''
          value={start_loc}
          onChange={handleStartLocChange}
        />
      </label>

      <label>
        Destination:
        <input
          id='destination'
          type='text'
          required={true}
          placeholder=''
          value={destination}
          onChange={handleDestinationChange}
        />
      </label>

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

      <input type='submit' value='Submit' />
    </form>
  );
};

export default AddTrip;
