export interface Activity {
  activity_id: number;
  //trip
  //tripID
  //participants
  activity_name: string;
  location: string;
  type: string;
  //tags
  date: string;
  //picture_src
  //comments
}

// model Activity {
//     activity_id     Int         @id @default(autoincrement())
//     trip            Trip        @relation(fields: [tripId], references: [trip_id])
//     tripId          Int
//     participants    User[]
//     activity_name   String
//     location        String
//     type            String
//     tags            Tag[]
//     date            String
//     picture_src     String?
//     comments        Comment[]
//   }
