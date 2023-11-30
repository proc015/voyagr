export interface Activity {
  activity_id: number;
  //trip
  trip_id: number;
  //participants
  activity_name: string;
  location: string;
  type: string;
  //tags
  date: string;
  //picture_src
  //comments
  loc_lat_lon: number[];
}

// model Activity {
//   activity_id     Int         @id @default(autoincrement())
//   trip            Trip        @relation(fields: [tripId], references: [trip_id])
//   tripId          Int
//   participants    User[]
//   activity_name   String
//   location        String
//   loc_lat_lon     Decimal[]
//   type            String
//   tags            Tag[]
//   description     String?
//   date            String
//   picture_src     String?
//   comments        Comment[]
// }
