import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Voyagr-white-big.png';
import backButton from '../../assets/icons/back-button.svg';

type Props = {
  page: string;
};

type Header = {
  [page: string]: string;
};

export const Header = ({ page }: Props) => {
  const header: Header = {
    detailedTrip: 'explore activities',
    addTrip: 'add trip',
    profile: 'profile',
    search: 'search',
    feed: 'feed',
  };

  const navigate = useNavigate();

  return (
    <>
      <div className='headerVoyagr pb-5 px-5 text-voyagrWhite font-noto text-3xl'>
        {page != 'feed' && (
          <button className='pb-2' onClick={() => navigate(-1)}>
            <img className='' src={backButton} />
          </button>
        )}

        {header[`${page}`] ? (
          <h1 className={(page == 'feed' && 'w-full text-center') || ''}>
            {header[`${page}`]}
          </h1>
        ) : (
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
        )}
        <h1></h1>
      </div>
      <div className='headerVoyagrPosition'></div>
    </>
  );
};
