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

//usuario alterar seu proprio nome
router.put('/edit-name-user/:id', async (req, res) => {
  const newName = req.body.name
  try {
    const id = req.params.id
    await prisma.user.update({
      where: { id: id},
      data : {
        name: newName
      }
    })
    res.status(200).json({message:'Nome Alterado com sucesso'})
  } catch(err) {
    res.status(500).json({message:'falha no servidor'}) //resposta para o front

  }
})

//usuario alterar seu email
router.put('/edit-email-user/:id', async (req, res) => {
  const newEmail = req.body.newEmail
  try {
    const id = req.params.id
    await prisma.user.update({
      where: { id: id},
      data : {
        email: newEmail
      }
    })
    res.status(200).json({message:'Nome Alterado com sucesso'})
  } catch(err) {
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})




export default router