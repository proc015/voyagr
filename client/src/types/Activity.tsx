export interface Activity {
  activity_id: number; 
  activity_name: string;
  date: string;
  description: string; 
  location: string;
  tripId: number;
  type: string;
  loc_lat_lon: number[];
  picture_src: string; 
}
