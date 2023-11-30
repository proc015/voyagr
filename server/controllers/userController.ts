import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
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

export const createUser = async (req: Request, res: Response) => {
  try {
    //hash password here
    const newUser = await req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        // pass_hash: hashedPassword,
      },
    });
    res.send(createdUser);
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const userDetails = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        trips: true,
      },
    });
    res.send(userDetails);
  } catch (error) {
    console.log(error);
  }
};
