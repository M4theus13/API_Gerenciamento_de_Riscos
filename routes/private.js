import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/listar', async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
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

router.put('/admin/:id', async (req, res) => {
  const { id } = req.params
  console.log(`Recebido pedido para tornar admin o usuário com ID: ${id}`) // Log do ID recebido

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

export default router