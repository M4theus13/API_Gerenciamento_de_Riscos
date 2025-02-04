import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.put('/info-user/:id', async (req, res) => { //rota para retornar quem é o usuario logado
  const id = req.params.id
  try {
    const userLogado = await prisma.user.findMany({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      }
    }) 

    const usersInfo = await prisma.user.findMany({
      where: { id: {not :id} },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      }
    })
    res.status(200).json({message: 'usuarios listados', userLogado, usersInfo})
  } catch (err) {
    console.log(err)
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})


router.put('/up-admin/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isAdmin: true }
    })
    res.status(200).json({ message: 'Usuário atualizado para administrador', updatedUser })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Falha ao atualizar usuário' })
  }
})

router.put('/del-admin/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isAdmin: false }
    })
    res.status(200).json({ message: 'Administrador removido', updatedUser })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Falha ao atualizar administrador' })
  }
})

export default router