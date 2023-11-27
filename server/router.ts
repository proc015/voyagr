import { Router } from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

router.get('/', async (req, res) => {
  const user = await prisma.user.findMany();
  res.send(user);
})

export default router;

// .then(async () => {
//   await prisma.$disconnect()
// })
// .catch(async (e) => {
//   console.error(e)
//   await prisma.$disconnect()
//   process.exit(1)
// })