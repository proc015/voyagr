import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ActivityPage from './pages/ActivityPage';
import AddTripPage from './pages/AddTripPage';
import FeedPage from './pages/FeedPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignupPage';
import TripPage from './pages/TripPage';
import SearchBar from './components/SearchBar';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/profile' element={<><NavBar /><ProfilePage /></>} />
        <Route path='/feed' element={<><NavBar /><FeedPage /></>} />
        <Route path='/addtrip' element={<><NavBar /><AddTripPage /></>} />
        <Route path='/trip' element={<><NavBar /><TripPage /></>} />
        <Route path='/activity' element={<><NavBar /><ActivityPage /></>} />
        <Route path='/search' element={<><NavBar /><SearchBar /></>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
