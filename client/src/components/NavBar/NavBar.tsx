import { NavLink } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo/Voyagr-white-big.png';
import travelIcon from '../../assets/icons/button-active.svg';
import travelIconnoBackground from '../../assets/icons/traveller.svg';
import { useMatch } from 'react-router-dom';
import searchIcon from '../../assets/icons/search-icon.svg';

const NavBar = () => {
  const addTripMatch = useMatch('/addtrip');

  return (
    <>
      <div className='headerVoyagr'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
      </div>
      <div className='headerVoyagrPosition'></div>

      <div className='navbar'>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          Feed
        </NavLink>
        <NavLink
          to='/search'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          <img className='h-6' src={searchIcon} />
        </NavLink>
        <div className='nav-link-container'>
          {addTripMatch ? (
            <img src={travelIcon} alt='travelIcon' className='active-icon' />
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
          Profile
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
