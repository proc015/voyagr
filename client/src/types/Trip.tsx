import { Activity } from './Activity';

export interface Trip {
  trip_id: number;
  userId: number;
  trip_name: string;
  start_loc: string;
  destination: string;
  start_date: string;
  end_date: string;
  start_lat_lon: number[]; 
  dest_lat_lon: number[];
  picture_src: string;
  published: boolean;
  activities: Activity[];
}
