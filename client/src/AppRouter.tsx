import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ActivityPage from './pages/ActivityPage';
import AddTripPage from './pages/AddTripPage';
import FeedPage from './pages/FeedPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignupPage';
import TripPage from './pages/TripPage';
import SearchBar from './components/SearchBar';
import DetailedTripPage from './pages/DetailedTripPage';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route
          path='/profile'
          element={
            <>
              <NavBar page={'profile'} />
              <ProfilePage />
            </>
          }
        />
        <Route
          path='/feed'
          element={
            <>
              <NavBar page={'feed'} />
              <FeedPage />
            </>
          }
        />
        <Route
          path='/addtrip'
          element={
            <>
              <NavBar page={'addTrip'} />
              <AddTripPage />
            </>
          }
        />
        <Route
          path='/trip'
          element={
            <>
              <NavBar page={'trip'} />
              <TripPage />
            </>
          }
        />
        <Route
          path='/activity'
          element={
            <>
              <NavBar page={'activity'} />
              <ActivityPage />
            </>
          }
        />
        <Route
          path='/search'
          element={
            <>
              <NavBar page={'search'} />
              <SearchBar />
            </>
          }
        />
        <Route
          path='/trip/:trip_id'
          element={
            <>
              <NavBar page={'detailedTrip'} />
              <DetailedTripPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
