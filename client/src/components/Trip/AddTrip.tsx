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

const AddTrip = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.currentUser);
  const lastTrip = useSelector((state: RootState) => state.lastTrip);
  console.log('lastTrip in Add Trip', lastTrip);

  // const [userId, setUserId] = useState<number>(0);
  const [trip_name, setTripName] = useState<string>(
    lastTrip.lastTrip.trip_name || ''
  );
  const [tripNameError, setTripNameError] = useState('');
  const [start_loc, setStartLoc] = useState<string>(
    lastTrip.lastTrip.start_loc || ''
  );
  const [destination, setDestination] = useState<string>(
    lastTrip.lastTrip.destination || ''
  );
  const [start_date, setStartDate] = useState<string>(
    lastTrip.lastTrip.start_date || ''
  );
  const [end_date, setEndDate] = useState<string>(
    lastTrip.lastTrip.end_date || ''
  );
  const [picture_src, setPicture_src] = useState(
    lastTrip.lastTrip.picture_src || ''
  );

  const tripExists = () => {
    if (lastTrip.lastTrip.trip_name) {
      return '';
    }
    return 'trip';
  };

  const [start_lat_lon, setStart_lat_lon] = useState<number[]>([]);
  const [dest_lat_lon, setDest_lat_lon] = useState<number[]>([]);
  const [participants, setParticipants] = useState('');
  const [visibleDiv, setVisibleDiv] = useState(tripExists());

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
{/*                         FIX THIS */}
{/*                         onClick={handleClick} */}
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
                    {start_loc} ↔ {destination}
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

        <div
          className='w-full text-zinc-800 text-xl font-normal flex font-noto mx-auto mb-4'
          onClick={() => changeVisibleDiv('')}
        >
          {lastTrip.status === 'failed' && (
            <div className='flex text-black py-[3px] px-[40px] rounded-full bg-voyagr border-[1px] mx-auto '>
              <input type='submit' value='Start Trip' className='mx-auto' />
            </div>
          )}
          {lastTrip.status === 'idle' && (
            <div className='flex text-black py-[3px] px-[40px] rounded-full bg-voyagr border-[1px] mx-auto '>
              <input type='submit' value='Start Trip' className='mx-auto' />
            </div>
          )}
          {lastTrip.status == 'succeeded' && (
            <div className='flex text-voyagrRed py-[3px] px-[40px] rounded-full bg-voyagr border-voyagrRed border-[1px] mb-1 mx-auto '>
              <p>🛰️ recording</p>
            </div>
          )}
        </div>
      </form>
      <AddActivity />
      <Publish />
      <div className='h-[100px]'></div> {/* spacer div */}
    </>
  );
};

export default AddTrip;
