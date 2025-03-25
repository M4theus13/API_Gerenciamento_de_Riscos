import express from 'express';
import { PrismaClient } from '@prisma/client';
import verifyAcessAdmin from '../middleware/verifyAcessAdmin.js';

const router = express.Router()
const prisma = new PrismaClient()

router.put('/active-account/:id', verifyAcessAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const activeAcount = await prisma.user.update({
      where: { id },
      data: { accountActive: true }
    })
    res.status(200).json({ message: 'Conta ativada com sucesso', activeAcount })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Falha ao atualizar conta' })
  }
})

router.put('/desactive-account/:id', verifyAcessAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const desactiveAcount = await prisma.user.update({
      where: { id },
      data: { accountActive: false }
    })
    res.status(200).json({ message: 'Conta desativada com sucesso', desactiveAcount})
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Falha ao atualizar conta' })
  }
})

router.put('/add-admin/:id', verifyAcessAdmin, async (req, res) => {
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

router.put('/rem-admin/:id', verifyAcessAdmin, async (req, res) => {
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

router.put('/delete-user/:id', verifyAcessAdmin, async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await prisma.user.delete({
      where: { id }
    })
    res.status(200).json({ message: 'Usuário deletado', deletedUser })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Falha ao deletar usuário' })
  }
})

export default router