import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ActivityPage from './pages/ActivityPage';
import AddTripPage from './pages/AddTripPage';
import FeedPage from './pages/FeedPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import TripPage from './pages/TripPage';
import SearchBar from './components/SearchBar';
import DetailedTripPage from './pages/DetailedTripPage';
import SignupDetails from './components/SignupDetails';



const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupDetails />} />
        <Route
          path='/profile'
          element={
            <>
              <NavBar />
              <ProfilePage />
            </>
          }
        />
        <Route path='/profile/:userId' element={<ProfilePage />} />
        <Route
          path='/feed'
          element={
            <>
              <NavBar />
              <FeedPage />
            </>
          }
        />
        <Route
          path='/addtrip'
          element={
            <>
              <NavBar />
              <AddTripPage />
            </>
          }
        />
        <Route
          path='/trip'
          element={
            <>
              <NavBar />
              <TripPage />
            </>
          }
        />
        <Route
          path='/activity'
          element={
            <>
              <NavBar />
              <ActivityPage />
            </>
          }
        />
        <Route
          path='/search'
          element={
            <>
              <NavBar />
              <SearchBar />
            </>
          }
        />
        <Route path='/trip/:trip_id' element={<><NavBar /><DetailedTripPage /></>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
