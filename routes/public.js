import express from "express"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const router = express.Router()

router.post('/cadastro', async (req, res) => {

   await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
  })

   res.send(201)
})

export default router