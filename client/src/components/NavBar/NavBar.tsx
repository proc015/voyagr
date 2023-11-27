import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={''} alt="logo" className='logoNB'/>
      <div className='sHeaders'>Menu</div>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        Expenses
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive ? 'nav-link nav-link-active' : 'nav-link'
        }
      >
        Orders
      </NavLink>
    </div>
  );
};

export default NavBar;
