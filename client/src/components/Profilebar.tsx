import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../app/store';
import { fetchUserInfo } from '../services/fetchUserInfo';

interface Prop {
  userIdentifier: number; 
}

export const Profilebar = ({userIdentifier}:Prop) => {
  
  const dispatch = useDispatch<AppDispatch>(); 

  const userInfo = useSelector((state:RootState)=> state.getUserInfo.userInfo);
  
  // HARD CODED INFO FOR NOW
    //pass userInfo object

    //pass specific userID from the trip that is being mapped -> userIdentifier
    console.log('TI', userIdentifier)

useEffect(()=> {
  dispatch(fetchUserInfo(userIdentifier));
}, [dispatch, userIdentifier])


  
  const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  
  return (
    <>
      <div className='flex gap-3 my-2 align-middle'>
        <div className='picture h-12 w-12 rounded-full overflow-hidden bg-voyagrBlue'>
          
          <img
            className='object-cover'
            src={`${IMG_BASE_URL}/${userInfo.display_pic_src}`}
          />
          
        </div>
        <div className='info flex flex-col align-middle '>
          <h3 className='h-fit mt-1  text-md font-semibold font-noto text-voyagrBlack'>
            {userInfo.display_name}
          </h3>
          <p className='text-sm text-voyagrLightGrey'>November 24th, 4:40pm</p>
        </div>
      </div>
    </>
  );
};
