import { useAppDispatch } from '../../app/hooks';
import { postTrip, uploadPhoto } from '../../services/apiService';
import { addTrip } from '../../redux/addTripSlice';
import { setTrip } from '../../redux/saveTripIdSlice';
import dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { DynamicMap } from '../maps/dynamicMap';
import AddActivity from '../Activity/AddActivity';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Publish from '../Publish';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.currentUser);
  const lastTrip = useSelector((state: RootState) => state.lastTrip);
  // console.log('lastTrip in Add Trip', lastTrip);

  const [trip_name, setTripName] = useState('');
  const [start_loc, setStartLoc] = useState('');
  const [destination, setDestination] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [picture_src, setPicture_src] = useState('');

  useEffect(() => {
    if (lastTrip.lastTrip.published === false) {
      setTripName(lastTrip.lastTrip.trip_name);
      setStartLoc(lastTrip.lastTrip.start_loc);
      setDestination(lastTrip.lastTrip.destination);
      setStartDate(lastTrip.lastTrip.start_date);
      setEndDate(lastTrip.lastTrip.end_date);
      setPicture_src(lastTrip.lastTrip.picture_src);
    };
  }, []);

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
    setTripName(newName);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  
  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const filename = event.target.files![0].name;
    setPicture_src(filename);
    uploadPhoto(event.target.files);
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  
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
    try {
      const createdTrip = await postTrip(newTripObj);
      console.log('serv res', createdTrip);
      dispatch(addTrip(createdTrip));
      //sends the trip_id associated to this trip to the redux store
      dispatch(setTrip(createdTrip.trip_id));
      navigate('/feed');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <form onSubmit={handleStartTrip} className=''>
        <div>
          {visibleDiv == 'trip' ? (
            <div  onClick={() => changeVisibleDiv('')}>
              <div className='ToggleDiv w-[95%] h-[150px] mt-4 rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
                <div className='w-full text-zinc-800 text-3xl font-normal font-noto'>
                  <p className='p-3 pb-3 pt-3'>Trip name?</p>

                  <div className='flex w-[95%] mx-auto' onClick={(e) => e.stopPropagation()}>
                    <div>
                      <input
                        type='file'
                        accept='image/png, image/jpeg'
                        name='picture_src'
                        ref={hiddenFileInput}
                        onChange={handlePhotoUpload}
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
                      id='trip_name'
                      className='mt-1 mb-3 ml-4 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm placeholder-gray-400 font-didact mx-auto'
                      type='text'
                      maxLength={100}
                      required={true}
                      placeholder='add trip name'
                      value={trip_name}
                      onChange={handleTripNameChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div onClick={() => changeVisibleDiv('trip')}>
              <div className='ToggleDiv mt-4 w-[95%] h-auto  rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    Trip name
                  </p>
                  <div className='p-1 w-[60%] font-didact text-xl text-right text-voyagrBlack mr-5'>
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
              <div className='w-[95%] h-full  rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
                <label className='w-full  text-3xl font-normal font-noto'>
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
              <div className='ToggleDiv w-[95%] h-auto  rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    Where to?
                  </p>
                  {(start_loc) &&
                    <div className='p-1 w-[60%] font-didact text-xl text-right text-voyagrBlack mr-5'>
                      {start_loc} 
                      {(destination) &&
                      <span> ↔ {destination} </span>
                      } 
                    </div>
                  }
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          {visibleDiv == 'when' ? (
            <div onClick={() => changeVisibleDiv('')}>
              <div className='w-[95%] h-auto  rounded-[20px] shadow-lg border-voyagrBorders border p-2 mx-auto mb-5'>
                <p className='p-3 pt-3 w-full  text-3xl font-normal font-noto'>
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
              <div className='ToggleDiv w-[95%] h-auto  rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    When?
                  </p>
                  {(start_date) && 
                    <div className='p-1 w-[60%] font-didact text-xl text-right text-voyagrBlack mr-5'>
                      {dayjs(start_date).format('DD/MM/YY')} 
                      {(end_date) &&
                      <span> ↔ {dayjs(end_date).format('DD/MM/YY')}</span>
                      }    
                    </div>
                  }
                </label>
              </div>
            </div>
          )}
        </div>

        <div>
          {visibleDiv == 'who' ? (
            <div onClick={() => changeVisibleDiv('')}>
              <div className='w-[95%] h-[150px]  rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5'>
                <label className='w-full  text-3xl font-normal font-noto'>
                  <p className='p-3 pb-3 pt-3'>Who?</p>
                  <input
                    id='participants'
                    type='text'
                    placeholder='add buddies'
                    className='mt-1 mb-3 block w-[95%] px-5 py-4 border border-voyagrBorders rounded-[15px] text-base shadow-sm  focus:outline-none   font-didact mx-auto '
                    value={participants}
                    onChange={handleParticipantsChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div onClick={() => changeVisibleDiv('who')}>
              <div className='ToggleDiv w-[95%] h-auto  rounded-[20px] shadow-lg border-voyagrBorders border p-2 flex mx-auto mb-5 transition-all duration-1000 hover:grow'>
                <label className='w-full font-normal flex font-didact items-center justify-between'>
                  <p className='p-3 pb-3  text-voyagrLightGrey text-2xl'>
                    Who?
                  </p>
                  <div className='p-1 w-[60%] font-didact text-xl text-right text-voyagrBlack mr-5'>
                    {participants}
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div
          className='w-full  text-xl font-normal flex font-noto mx-auto mb-4'
          onClick={() => changeVisibleDiv('')}
        >
          {/* {trip_name ?
            <div className='flex text-voyagrRed py-[3px] px-[40px] rounded-full border-voyagrRed border mx-auto'>
              <p>🛰️ Recording</p>
            </div>
            :
            <div className='flex text-voyagrBlack py-[3px] px-[40px] rounded-full border-voyagrBlack border mx-auto'>
              <input type='submit' value='Start Trip' className='mx-auto' />
            </div>
          } */}
          {lastTrip.status === 'failed' && (
            <div className='flex text-voyagrBlack py-[3px] px-[40px] rounded-full bg-voyagr border-[1px] mx-auto '>
              <input type='submit' value='Start Trip' className='mx-auto' />
            </div>
           )}
          {lastTrip.status === 'idle' && (
            <div className='flex text-voyagrBlack py-[3px] px-[40px] rounded-full bg-voyagr border-[1px] mx-auto '>
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
