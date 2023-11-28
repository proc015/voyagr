import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const cloudinary = require('cloudinary');

// cloudinary.v2.config({
//   cloud_name: 'dwskyhib9',
//   api_key: '246646362899556',
//   api_secret: 'Js8vw_ifQ9S-Qpv0j-YOloO3F8Y',
//   secure: true,
// });

const router = Router();

// Test GET, just returns all users
router.get('/all', async (req, res) => {
  const user = await prisma.user.findMany();
  res.send(user);
});

router.post('/trip', async (req, res) => {
  try {
    const newTrip = await req.body;
    const createdTrip = await prisma.trip.create({
      data: {
        // connect user field in Trip table to primary key of User table
        user: {
          connect: {
            user_id: newTrip.user_id,
          },
        },
        // build rest of required Trip fields
        trip_name: newTrip.trip_name,
        start_loc: newTrip.start_loc,
        start_lat_lon: newTrip.start_lat_lon,
        destination: newTrip.destination,
        dest_lat_lon: newTrip.dest_lat_lon,
        start_date: newTrip.start_date,
        end_date: newTrip.end_date,
        picture_src: newTrip.picture_src,
      },
    });
    res.send(createdTrip);
    console.log(createdTrip);
  } catch (error) {
    console.log(error);
  }
});

// router.post('/photo', async (req, res) => {
//   const response = await cloudinary.uploader.upload_stream({
//     resource_type: 'image',
//     use_filename: true,
//     unique_filename: true,
//   });
//   console.log(response);
// });

export default router;

// JUST LEAVING THIS HERE FOR NOW IN CASE THIS IS NEEDED IN QUERIES
// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })
