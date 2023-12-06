import { Trip } from '../types/Trip';

export default function sortFeedPosts(feedPosts: Trip[]) {
  return feedPosts.sort((a, b) => {
    const defaultDate = new Date(0);

    const dateA = a.end_date ? Date.parse(a.end_date) : defaultDate.getTime();

    const dateB = b.end_date ? Date.parse(b.end_date) : defaultDate.getTime();

    return dateB - dateA;
  });
}
