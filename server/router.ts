import { Router } from 'express';
import * as c from './controllers/controller';

const router = Router();

// POST NEW TRIP
router.post('/trip', c.postTrip);

// GET MOST RECENT TRIP FROM USER
router.get('/trips/:id', c.getLastTrip);

//GET ALL TRIPS FROM USER
router.get('/trips/:id/all', c.getAllUserTrips);

// POST NEW ACTIVITY
router.post('/activity', c.postActivity);

// GET ALL ACTIVITIES FROM TRIP
router.get('/activity/:tripId/all', c.getAllTripActivities);

export default router;
