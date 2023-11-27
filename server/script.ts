import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ~ test queries here ~ \\
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  /*  
  BAD BAD NOT GOOD
  const trip = await prisma.trip.create({
    data: {
      user: {
        create: {
          first_name: 'hello',
          last_name: 'there',
          email: 'hello@there.com'
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
  console.log(trip);
---------------------------
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
----------------------------
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
*/