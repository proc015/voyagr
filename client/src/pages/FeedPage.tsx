import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Publish from '../components/Publish';
import FeedList from '../components/FeedList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchLastTrip } from '../services/fetchLastTrip';

function FeedPage() {
  const userId = useSelector((state: RootState) => state.user.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchLastTrip(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <FeedList />
    </>
  );
}

export default FeedPage;
