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

// const AppRouter: React.FC = () => {
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
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
          path='/addtrip'
          element={
            <>
              <NavBar />
              <AddTripPage />
            </>
          }
        />
        <Route
          path='/feed'
          element={
            <>
              <NavBar />
              <FeedPage />
            </>
          }
        />
      </Routes>
      <Route
        path='/landing'
        element={
          <>
            <NavBar />
            <LandingPage />
          </>
        }
      />
      <Route
        path='/profile'
        element={
          <>
            <NavBar />
            <ProfilePage />
          </>
        }
      />
      <Route
        path='/signup'
        element={
          <>
            <NavBar />
            <SignUpPage />
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
    </Router>
  );
}

export default AppRouter;
