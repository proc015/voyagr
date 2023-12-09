import { useEffect } from 'react';
import FeedList from '../components/Feed/FeedList';
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
