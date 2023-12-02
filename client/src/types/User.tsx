import { Trip } from './Trip';

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  display_pic_src: string;
  following: string[];
  followers: string[];
  trips: ProfileTrip[];
}

interface ProfileTrip {
  trip_id: number;
  trip_name: string;
  destination: string;
  start_date: string;
  dest_lat_lon: number[];
  picture_src: string;
  published: boolean;
}
