export interface Trip {
  // trip_id: number;
  // user: User; // Assuming User is a custom type defined elsewhere
  user_id: number;
  // participants: User[]; // Array of User objects
  trip_name: string;
  start_loc: string;
  destination: string;
  start_date: string;
  end_date: string;
  // picture_src: string;
  // activities: Activity[]; // Assuming Activity is a custom type defined elsewhere
  // comments: Comment[]; // Assuming Comment is a custom type defined elsewhere
  start_lat_lon: number[]; // Representing an array of numbers
  dest_lat_lon: number[];
}
 
