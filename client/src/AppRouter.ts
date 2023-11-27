import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import FeedPage from './pages/FeedPage';

// Since this component does not use any props or state,
// the refactoring is minimal. Just change the file extension to .tsx
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
