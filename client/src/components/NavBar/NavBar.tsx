import { NavLink } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo/Voyagr-white-big.png';

const NavBar = () => {
  return (
    <>
      <div className='headerVoyagr'>
        <div className='logo'>
          <img src={logo} alt='logo'/>
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
          to='/abc'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          ... 
        </NavLink>
        <NavLink
          to='/addtrip'
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link-active' : 'nav-link'
          }
        >
          + Trip
        </NavLink>
        <NavLink
          to='abc'
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
