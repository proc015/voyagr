import { useAppDispatch } from '../../app/hooks';
import { Trip } from '../../types/Trip';
import { postTrip, uploadPhoto } from '../../services/apiService';
import { addTrip } from '../../redux/addTripSlice';
import { setTrip } from '../../redux/saveTripIdSlice';

import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { DynamicMap } from '../maps/dynamicMap';
import AddActivity from '../Activity/AddActivity';
import { set } from '@cloudinary/url-gen/actions/variable';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Publish from '../Publish';

// import * as dayjs from 'dayjs';

export interface NewTripType {
  userId: number;
  trip_name: string;
  start_loc: string;
  destination: string;
  start_date: string;
  end_date: string;
  start_lat_lon: number[];
  dest_lat_lon: number[];
  picture_src: string;
}

// if getLastTrip.published (redux) is set to false, then inject the getlastTrip.trip_name in the AddTrip component as the initial value for trip_name. Do the same for the other fields. If getLastTrip.published is set to true, then the fields are empty. Write a function that does that.


const AddTrip = () => {
  const dispatch = useAppDispatch();

  // const [userId, setUserId] = useState<number>(0);
  const [trip_name, setTripName] = useState<string>('');
  const [tripNameError, setTripNameError] = useState('');
  const [start_loc, setStartLoc] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [start_date, setStartDate] = useState<string>('');
  const [end_date, setEndDate] = useState<string>('');
  const [picture_src, setPicture_src] = useState('');
  const [start_lat_lon, setStart_lat_lon] = useState<number[]>([]);
  const [dest_lat_lon, setDest_lat_lon] = useState<number[]>([]);
  const [participants, setParticipants] = useState('');
  const [visibleDiv, setVisibleDiv] = useState('trip');

  const userId = useSelector((state: RootState) => state.user.currentUser);
  
  // Access the getLastTrip state from Redux
  const lastTrip = useSelector((state: RootState) => state.getLastTrip);
  console.log('lastTrip', lastTrip);

  useEffect(() => {
    // Check if the last trip is not published
    if (!lastTrip.trip.published) {
      setTripName(lastTrip.trip.trip_name);
      setStartLoc(lastTrip.trip.start_loc);
      setDestination(lastTrip.trip.destination);
      setStartDate(lastTrip.trip.start_date);
      setEndDate(lastTrip.trip.end_date);
      setPicture_src(lastTrip.trip.picture_src);
      setStart_lat_lon(lastTrip.trip.start_lat_lon);
      setDest_lat_lon(lastTrip.trip.dest_lat_lon);
      // Set other fields if necessary
    } else {
      // Reset all fields to empty or default values
      setTripName('');
      setStartLoc('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setPicture_src('');
      setStart_lat_lon([]);
      setDest_lat_lon([]);
      // Reset other fields if necessary
    }
  }, [lastTrip]); 


  const [newTrip, setNewTrip] = useState<NewTripType>({
    userId: userId,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
    start_lat_lon,
    dest_lat_lon,
    picture_src,
    // published,
    // activities,
  });

  const newTripObj: NewTripType = {
    userId,
    trip_name,
    start_loc,
    destination,
    start_date,
    end_date,
    start_lat_lon,
    dest_lat_lon,
    picture_src,
    // published,
    // activities,
  };

  const changeVisibleDiv = (div: any) => {
    setVisibleDiv(div);
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

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const filename = event.target.files![0].name;
    setPicture_src(filename);
    console.log(filename);
    uploadPhoto(event.target.files);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    hiddenFileInput.current?.click();
  };

  const handleParticipantsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const convertStringtoNum = Number(event.target.value); // nw: this is not right, but I keep it for now to change it tomorrow
    // setUserId(convertStringtoNum);
  };

  //START-REDUX-INFORMATION-HELPER: --> RP

  // get trip information from redux store
  const entireState = useSelector((state: RootState) => state);
  console.log('entire state', entireState);

  // get trip information from redux state
  // this is saved every time you start a trip
  const tripStartedInfo = useSelector((state: RootState) => state.trip);
  // console.log('tripStartInfo', tripStartedInfo)

  const tripName = tripStartedInfo[0]?.trip_name;
  // console.log('trip name', tripName)
  const tripDestination = tripStartedInfo[0]?.destination;
  // console.log('trip name', tripDestination)

  const tripStartDate = tripStartedInfo[0]?.start_date;
  const tripEndDate = tripStartedInfo[0]?.end_date;

  // get activity information from redux store

  const activityInfo = useSelector((state: RootState) => state.activity);
  // console.log('activityInfo', activityInfo)

  const activityName = activityInfo[0]?.activity_name;
  // console.log('trip name', activityName)

  //END-REDUX-INFO-HELPER: --> RP

  const handleStartTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tripNameError === '') {
      try {
        const createdTrip = await postTrip(newTripObj);
        console.log('serv res', createdTrip);
        dispatch(addTrip(createdTrip));
        //sends the trip_id associated to this trip to the redux store
        dispatch(setTrip(createdTrip.trip_id));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // updates the local state to match the redux state (i.e., when you click start a trip that info is saved to redux store and updates local state)
  useEffect(() => {
    if (tripStartedInfo.length > 0) {
      const latestTrip = tripStartedInfo[0];
      setTripName(latestTrip.trip_name);
      setDestination(latestTrip.destination);
      setStartDate(latestTrip.start_date);
      setEndDate(latestTrip.end_date);
    }
  }, [tripStartedInfo]);

  return (
    <>
      <form onSubmit={handleStartTrip} className=''>
        <div>
          {visibleDiv == 'trip' ? (
            <div onClick={() => changeVisibleDiv('')}>
              <div className='ToggleDiv w-[95%] h-[150px] mt-4 bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
                <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
                  <p className='p-3 pb-3 pt-3'>Trip name?</p>
                  <div className='flex w-[95%] mx-auto'>
                    <div className=''>
                      <button
                        onClick={handleClick}
                        // onClick={(e) => e.stopPropagation()}
                        className='mt-1 mb-3 block w-[60px] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 font-didact mx-auto'
                      >
                        <input
                          type='file'
                          ref={hiddenFileInput}
                          className='hidden'
                          accept='image/png, image/jpeg'
                          onChange={handlePhotoUpload}
                        />
                        +
                      </button>
                    </div>
                    <input
                      id='trip_name'
                      className='mt-1 mb-3 ml-4 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 font-didact mx-auto '
                      type='text'
                      required={true}
                      placeholder='add trip name'
                      value={trip_name}
                      onChange={handleTripNameChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div onClick={() => changeVisibleDiv('trip')}>
              <div className='ToggleDiv mt-4 w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    Trip name
                  </p>
                  <div className='p-1 w-[60%] font-didact text-xl text-right text-black mr-5'>
                    {trip_name}
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          {visibleDiv == 'whereTo' ? (
            <div onClick={() => changeVisibleDiv('')}>
              <div className='w-[95%] h-full bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
                <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
                  <p className='p-3 pb-3 pt-3'>Where to?</p>
                  <div className='95%' onClick={(e) => e.stopPropagation()}>
                    <DynamicMap
                      locationCoordinates={start_lat_lon}
                      destinationCoordinates={dest_lat_lon}
                      setLocationCoordinates={setStart_lat_lon}
                      setDestinationCoordinates={setDest_lat_lon}
                      setLocationAddress={setStartLoc}
                      setDestinationAddress={setDestination}
                      type={'trip'}
                      action={'create'}
                      style={{
                        height: '200px',
                        width: '95%',
                        borderRadius: '20px',
                        margin: '10px',
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div onClick={() => changeVisibleDiv('whereTo')}>
              <div className='ToggleDiv w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    Where to?
                  </p>
                  <div className='p-1 w-[60%] font-didact text-xl text-right text-black mr-5'>
                    {setStartLoc} ↔ {setDestination}
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          {visibleDiv == 'when' ? (
            <div onClick={() => changeVisibleDiv('')}>
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
                    onClick={(e) => e.stopPropagation()}
                  />
                </label>
                <label>
                  <input
                    id='end_date'
                    type='date'
                    className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
                    value={end_date}
                    onChange={handleEndDateChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div onClick={() => changeVisibleDiv('when')}>
              <div className='ToggleDiv w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    When?
                  </p>
                  <div className='p-1 w-[60%] font-didact text-xl text-right text-black mr-5'>
                    {start_date} ↔ {end_date}
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          {visibleDiv == 'who' ? (
            <div onClick={() => changeVisibleDiv('')}>
              <div className='w-[95%] h-[150px] bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
                <label className='w-full text-zinc-800 text-3xl font-normal font-noto'>
                  <p className='p-3 pb-3 pt-3'>Who?</p>
                  <input
                    id='participants'
                    type='text'
                    placeholder='add buddies'
                    className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-didact mx-auto '
                    value={participants}
                    onChange={handleParticipantsChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div onClick={() => changeVisibleDiv('who')}>
              <div className='ToggleDiv w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    Who?
                  </p>
                  <div className='p-1 w-[60%] font-didact text-xl text-right text-black mr-5'>
                    {participants}
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className='w-full text-zinc-800 text-xl font-normal flex font-noto mx-auto mb-4'>
          <input type='submit' value='Start Trip' className='mx-auto' />
        </div>
      </form>
      <AddActivity />
      <Publish />
      <div className='h-[100px]'></div> {/* spacer div */}
    </>
  );
};

export default AddTrip;
