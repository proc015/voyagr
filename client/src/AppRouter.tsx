import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AddTripPage from './pages/AddTripPage';
import FeedPage from './pages/FeedPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import SearchBar from './components/Search/SearchBar';
import DetailedTripPage from './pages/DetailedTripPage';
import { DetailedActivityPage } from './pages/DetailedActivityPage';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
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
          path='/profile/:id'
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
        <Route
          path='trip/:trip_id/activity/:activity_id'
          element={
            <>
              <NavBar page={'detailedActivity'} />
              <DetailedActivityPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
