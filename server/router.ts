import { Router } from "express"

const router = Router();

router.get('/', (req, res) => {
  res.send('hey there')
})

export default router;