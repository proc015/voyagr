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



  // TESTING ENDPOINT FOR QUERIES \\
router.get('/testing/test', async (req, res) => {
  // ~ write test queries here ~ \\
});

export default router;
