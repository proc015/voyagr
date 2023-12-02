import { useAppDispatch } from '../../app/hooks';
import { Trip } from '../../types/Trip';
import { postTrip, uploadPhoto } from '../../services/apiService';
import { addTrip } from '../../redux/addTripSlice';
import { setTrip } from '../../redux/saveTripIdSlice';

import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { DynamicMap } from '../maps/dynamicMap';
import AddActivity from '../Activity/AddActivity';
import { set } from '@cloudinary/url-gen/actions/variable';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

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

  // const toggleDivVisibility = (event) => {
  //   // Check if the click target is not an input element
  //   if (event.target.tagName.toLowerCase() !== 'input' && 'button') {
  //     setDiv1Visible(!isDiv1Visible);
  //     setDiv2Visible(!isDiv2Visible);
  //   }
  // };

  const userId = useSelector((state: RootState) => state.user.currentUser);

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

  // const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const filename = event.target.files![0].name;
  //   setPicture_src(filename);
  //   console.log(filename);
  //   uploadPhoto(event.target.files);
  // };

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
              <div className='ToggleDiv w-[95%] h-[150px] bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
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
              <div className='ToggleDiv w-[95%] h-auto bg-stone-50 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
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
      <div className='h-[100px]'></div> {/* spacer div */}
    </>
  );
};

export default AddTrip;
