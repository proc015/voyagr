import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

// Test GET, just returns all users
router.get('/all', async (req, res) => {
  const user = await prisma.user.findMany();
  res.send(user);
});

// POST new trip
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

// GET MOST RECENT TRIP FROM USER
router.get('/trips/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const trip = await prisma.trip.findFirst({
      where: {
        userId: userId,
      },
      take: -1,
    });
    res.send(trip);
  } catch (error) {
    console.log(error);
  }
});

//GET ALL TRIPS FROM USER
router.get('/trips/:id/all', async (req, res) => {
  try {
    console.log(req.params);
    const userId = Number(req.params.id);
    const allTrips = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        trips: true,
      },
    });
    res.send(allTrips);
  } catch (error) {
    console.log(error);
  }
});

// router.post('/activity', async (req, res) => {
//   try {
//     const newActivity = await req.body;
//     const createdActivity = await prisma.activity.create({
//       data: {
//         trip: {
//           connect: {
//             trip_id: newActivity.trip_id,
//           }
//         },
//         activity_name:
//         location:
//         type:
//         date:
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// })

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
