import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const postTrip = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
  }
};

export const getLastTrip = async (req: Request, res: Response) => {
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
};