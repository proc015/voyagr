import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/Voyagr-white-big.png';
type Props = {
  page: string;
};

export const Header = ({ page }: Props) => {
  const header = {
    detailedTrip: 'explore activities',
    addTrip: 'add trip',
    profile: 'profile',
    search: 'search',
    feed: 'feed',
  };

  const navigate = useNavigate();
  const goBack = () => {
    const back = () => {
      navigate(-1);
    };
    back();
  };

  return (
    <>
      <div className='headerVoyagr text-voyagrWhite font-noto text-3xl'>
        <button className='pb-5 pl-5' onClick={goBack}>
          {'<'}
        </button>

        {header[`${page}`] ? (
          <h1 className='pb-5'>{header[`${page}`]}</h1>
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
