import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const postActivity = async (req: Request, res: Response) => {
  console.log('gets to postActivity');
  try {
    const newActivity = await req.body;
    console.log(newActivity);
    const createdActivity = await prisma.activity.create({
      data: {
        trip: {
          connect: {
            trip_id: newActivity.tripId,
          },
        },
        activity_name: newActivity.activity_name,
        location: newActivity.location,
        type: newActivity.type,
        date: newActivity.date,
        loc_lat_lon: newActivity.loc_lat_lon,
        picture_src: newActivity.picture_src,
      },
    });
    res.send(createdActivity);
  } catch (error) {
    console.log(error);
  }
};

export const getAllTripActivities = async (req: Request, res: Response) => {
  try {
    const tripId = Number(req.params.tripId);
    console.log(tripId);
    const allActivities = await prisma.trip.findUnique({
      where: {
        trip_id: tripId,
      },
      select: {
        activities: true,
      },
    });
    res.send(allActivities);
  } catch (error) {
    console.log(error);
  }
};
