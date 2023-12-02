import { useLocation } from 'react-router';
import altPic from '../../assets/icons/button-active.svg';
type Props = {
  name: string;
  picture: string;
  myProfile: boolean;
};
export const Bio = ({ name, picture, myProfile }: Props) => {
  const ppUrlEnding = 'IMG_0873_2_pepnrb';
  const domainUrl = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
  // const fullUrl = `${domainUrl}${ppUrlEnding}`;
  // const name = 'Ryan Procacci';
  // const myProfile = false;

  const location = useLocation();
  console.log(domainUrl + picture);

  return (
    <>
      <div className='Here the PP will live with its functionality'>
        <img
          src={picture == null ? altPic : `${domainUrl + picture}`}
          alt='+'
          className='w-[150px] h-[150px] mt-7 object-cover rounded-full flex mx-auto '
        />
        <button className='flex text-black font-bold py-[3px] px-[40px] mt-[15px] rounded-full bg-voyagr border-[1px] mx-auto '>
          {myProfile ? '✎' : 'Follow'}
        </button>
      </div>
      <div className='font-noto text-2xl flex'>
        <p className='mx-auto mt-4'>{name} 🤙</p>
      </div>
    </>
  );
};
