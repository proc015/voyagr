import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import AddTripPage from './components/AddTripPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FeedPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/dashboard'
          element={
            <>
              <NavBar />
              <Dashboard />
            </>
          }
        />
        <Route
          path='/expenses'
          element={
            <>
              <NavBar />
              <ExpenseTracker />
            </>
          }
        />
        <Route
          path='/orders'
          element={
            <>
              <NavBar />
              <OrderTimeline />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
