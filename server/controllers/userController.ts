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
        display_name: newUser.displayName,
        display_pic_src: newUser.displayPicSrc,
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
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        display_name: true,
        display_pic_src: true,
        following: true,
        followers: true,
        trips: {
          select: {
            trip_id: true,
            trip_name: true,
            start_date: true,
            destination: true,
            dest_lat_lon: true,
            picture_src: true,
            published: true,
          },
        },
      },
    });
    console.log(userDetails);
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
          mode: 'insensitive',
        },
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const { loggedInUserId, userIdToFollow } = req.body;
    const addedToFollowing = await prisma.user.update({
      where: {
        user_id: loggedInUserId,
      },
      data: {
        following: {
          push: userIdToFollow,
        },
      },
    });

    const addedToFollowers = await prisma.user.update({
      where: {
        user_id: userIdToFollow,
      },
      data: {
        followers: {
          push: loggedInUserId,
        },
      },
    });
    res.send({ addedToFollowing, addedToFollowers });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = async (req: Request, res: Response) => {
  try {
    const { loggedInUserId, userIdToUnfollow } = req.body;

    const loggedInFollowLists = await getFollowersAndFollowing(loggedInUserId);
    const userFollowLists = await getFollowersAndFollowing(userIdToUnfollow);

    const updatedLoggedIn = await prisma.user.update({
      where: {
        user_id: loggedInUserId,
      },
      data: {
        following: loggedInFollowLists?.following.filter(
          (id) => id !== userIdToUnfollow
        ),
      },
    });
    console.log(updatedLoggedIn);

    const updatedUser = await prisma.user.update({
      where: {
        user_id: userIdToUnfollow,
      },
      data: {
        followers: userFollowLists?.followers.filter(
          (id) => id !== loggedInUserId
        ),
      },
    });
    console.log(updatedUser);

    res.send({ updatedLoggedIn, updatedUser });
  } catch (error) {
    console.log(error);
  }
};

const getFollowersAndFollowing = async (userId: number) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        followers: true,
        following: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserInfo = async (req: Request, res: Response) => {
  try {
    const allUserInfo = await prisma.user.findMany({
      where: {
        trips: {
          some: {
            published: true,
          },
        },
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        display_name: true,
        display_pic_src: true,
        following: true,
        followers: true,
      },
    });
    res.send(allUserInfo);
  } catch (error) {
    console.log(error);
  }
};
