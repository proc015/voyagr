import { NavLink } from 'react-router-dom';
import './NavBar.css';
import travelIcon from '../../assets/icons/button-active.svg';
import travelIconnoBackground from '../../assets/icons/traveller.svg';
import { useMatch } from 'react-router-dom';
import searchIcon from '../../assets/icons/search-black.svg';
// import activeSearch from '../../assets/icons/search-orange.svg';
import { Header } from './header';
import homeIcon from '../../assets/icons/home-black.svg';
import profileIcon from '../../assets/icons/profile-black.svg';
import activeSearch from '../../assets/icons/search-orange.svg';
import activeHome from '../../assets/icons/home-orange.svg';
import activeProfile from '../../assets/icons/profile-orange.svg';

type Props = {
  page: string;
};

const NavBar = ({ page }: Props) => {
  const addTripMatch = useMatch('/addtrip');
  const feedMatch = useMatch('/feed');
  const searchMatch = useMatch('/search');
  const profileMatch = useMatch('/profile');

  return (
    <>
      <Header page={page} />

      <div className='navbar px-5'>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {feedMatch ? <img src={activeHome} /> : <img src={homeIcon} />}
        </NavLink>
        <NavLink
          to='/search'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {searchMatch ? <img src={activeSearch} /> : <img src={searchIcon} />}
        </NavLink>
        <div className='nav-link-container'>
          {addTripMatch ? (
            <img
              src={travelIcon}
              alt='travelIcon'
              className='active-icon mb-2'
            />
          ) : null}
          <NavLink
            to='/addtrip'
            className='nav-link'
            //@ts-ignore
            activeClassName='nav-link-active'
          >
            <img src={travelIconnoBackground} alt='travelIcon' />
          </NavLink>
        </div>
        <NavLink
          to='/abc'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          ...
        </NavLink>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {profileMatch ? (
            <img src={activeProfile} />
          ) : (
            <img src={profileIcon} />
          )}{' '}
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
