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
    const newUser = await req.body;
    // CHECK IF EMAIL EXISTS IN DB
    const accountCheck = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    if (accountCheck) throw new Error();
    // CONTINUE USER CREATION
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        pass_hash: hashedPassword,
      },
    });
    res.send(createdUser);
  } catch (error) {
    res.send({
      error: '400',
      message: 'This email is already associated with an account!',
    });
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

export const userLogin = async (req: Request, res: Response) => {
  try {
    // DESCTRUCTURE EMAIL, PASSWORD FROM BODY
    const { email, password } = req.body;
    // FIND USER BY EMAIL
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // COMPARE HASHED PASSWORD IN DB WITH INPUT
    const validatedPass = await bcrypt.compare(password, user!.pass_hash!);
    if (!validatedPass) throw new Error();
    res.send(user);
  } catch (error) {
    res.send({ error: '401', message: 'Email or password is wrong' });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.params.term;
    const user = await prisma.user.findMany({
      where: {
        display_name: {
          contains: searchTerm,
        },
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
