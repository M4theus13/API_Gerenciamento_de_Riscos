import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/listar', async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        // Sem o campo de senha
      }
    }) //esconde as informações (esconde o password)
    res.status(200).json({message: 'usuarios listados', user})

  } catch (err) {
    console.log(err)
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})

export default router