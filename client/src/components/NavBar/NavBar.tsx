import { NavLink } from 'react-router-dom';
import './NavBar.css';
import travelIcon from '../../assets/icons/button-active.svg';
import travelIconnoBackground from '../../assets/icons/traveller.svg';
import { useMatch } from 'react-router-dom';
import { SearchIcon } from '../../assets/icons/search-black';
import { Header } from './Header';
import { HomeIcon } from '../../assets/icons/home-black';
import { ProfileIcon } from '../../assets/icons/profile-black';
// import { SearchIcon } from '../../assets/icons/search-orange';
// import activeHome from '../../assets/icons/home-orange';
// import activeProfile from '../../assets/icons/profile-orange';
import { BellIcon } from '../../assets/icons/bell-black';
// import activeBell from '../../assets/icons/bell-orange';

type Props = {
  page: string;
};

const NavBar = ({ page }: Props) => {
  const addTripMatch = useMatch('/addtrip');
  const feedMatch = useMatch('/feed');
  const searchMatch = useMatch('/search');
  const profileMatch = useMatch('/profile');
  const notificationMatch = useMatch('/abc');
  const activityMatch = useMatch('/trip/:trip_id/activity/:activity_id');

  const color = activityMatch ? '#FFFFFF' : '#28292B';

  return (
    <>
      <Header page={page} />

      <div
        className={`navbar px-5  translate-y-1 ${
          activityMatch && 'navbar-activity'
        }`}
      >
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {feedMatch ? (
            <HomeIcon className='#E84323' />
          ) : (
            <HomeIcon className={color} />
          )}
        </NavLink>
        <NavLink
          to='/search'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {searchMatch ? (
            <SearchIcon className='#E84323' />
          ) : (
            <SearchIcon className={color} />
          )}
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
          {notificationMatch ? (
            <BellIcon className='#E84323' />
          ) : (
            <BellIcon className={color} />
          )}
        </NavLink>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          {profileMatch ? (
            <ProfileIcon className='#E84323' />
          ) : (
            <ProfileIcon className={color} />
          )}
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
