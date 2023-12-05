import { Router } from 'express';
import * as c from './controllers/controller';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

// POST NEW TRIP
router.post('/trip', c.postTrip);

//GET ALL PUBLISHED TRIPS
router.get('/trip/all', c.getPublishedTrips);

// GET MOST RECENT TRIP FROM USER
router.get('/trip/:id', c.getLastTrip);

//GET ALL TRIPS FROM USER
router.get('/trip/:id/all', c.getAllUserTrips);

//PUBLISH CURRENT TRIP
router.put('/trip/:id/publish', c.publishTrip);

// POST NEW ACTIVITY
router.post('/activity', c.postActivity);

// GET ALL ACTIVITIES FROM TRIP
router.get('/activity/:tripId/all', c.getAllTripActivities);

// CREATE NEW USER
router.post('/user', c.createUser);

// GET ALL USER INFORMATION (DOES NOT INCLUDE TRIPS)
router.get('/user/all', c.getAllUserInfo);

// GET USER DETAILS
router.get('/user/:id', c.getUserDetails);

// USER LOGIN
router.post('/login', c.userLogin);

// USER SEARCH
router.get('/search/:term', c.searchUsers);

// FOLLOW A USER
router.put('/profile/follow', c.followUser);

// UNFFOLLOW A USER
router.put('/profile/unfollow', c.unFollowUser);

// USER LAST TRIP
router.get('/lastTrip/:id', c.getLastTrip);




// TESTING ENDPOINT FOR QUERIES \\
router.get('/testing/test', async (req, res) => {
  const test = await prisma.user.findMany({
    // FIND USERS THAT HAVE AT LEAST ONE PUBLISHED TRIP
    where: {
      trips: {
        some: {
          published: true,
        },
      },
    },
    // INCLUDE TRIPS ARRAY WITH ACTIVITIES FOR THOSE PUBLISHED TRIPS
    include: {
      trips: {
        where: {
          published: true,
        },
        include: {
          activities: true,
        },
      },
    },
  });
  res.send(test);
});

export default router;
