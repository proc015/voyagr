import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllUserTrips = async (req: Request, res: Response) => {
  try {
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
};