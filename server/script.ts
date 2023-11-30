import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ~ test queries here ~ \\
  // const test =
  // console.log(test);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*  

-----------------------------
FIND BY USER ID AND RETURN THEIR TRIPS
    const user = await prisma.user.findUnique({
    where: {
      user_id: 3
    },
      include: {
        trips: true
      }
    })
  console.log(user);
-----------------------------
CREATE NEW TRIP AND CONNECT TO CURRENT USER
const trip = await prisma.trip.create({
    data: {
      user: {
        connect: {
          user_id: 2
        }
      },
      trip_name: 'tester',
      start_loc: 'sydney',
      start_lat_lon: [-33, 151],
      destination: 'cardiff',
      dest_lat_lon: [51, -3],
      start_date: new Date(),
    }
  })
  console.log(newTrip);
  ---------------------------
  // const test = await prisma.user.findMany({
  //   // FIND USERS THAT HAVE AT LEAST ONE PUBLISHED TRIP
  //   where: {
  //     trips: {
  //       some: {
  //         published: true,
  //       },
  //     },
  //   },
  //   // INCLUDE TRIPS ARRAY WITH ACTIVITIES FOR THOSE PUBLISHED TRIPS
  //   include: {
  //     trips: {
  //       where: {
  //         published: true,
  //       },
  //       include: {
  //         activities: true,
  //       },
  //     },
  //   },
  // });
  // console.log(test);
*/
