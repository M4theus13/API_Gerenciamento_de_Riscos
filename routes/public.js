import express from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import token from 'jsonwebtoken'


const prisma = new PrismaClient()
const router = express.Router()

// ROTA criar usuarios
router.post('/cadastro', async (req, res) => {
  try {
    const user = req.body
    const salt = await bcrypt.genSalt(10) //nivel de encriptação
    const hashPassword = await bcrypt.hash(user.password, salt) //senha criptografada

    const usuario = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,  
      }
    })
    console.log(usuario)
    res.status(200).json(usuario) //resposta para o front
  } catch (err) {
    res.status(500).json({message:'erro'}) //resposta para o front

  }
})

//ROTA logar usuario

export default router