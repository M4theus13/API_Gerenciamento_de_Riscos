import express from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

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
router.post('/login', async (req, res) => {
  try {
    //busca o usuario no banco de dados
    const userInfo = req.body
    const user = await prisma.user.findUnique({
      where: {email: userInfo.email},
    })
    
    //verifica se o usuario existe
    if (!user) {
      return res.status(404).json({message: "Usuario não encontrado"})
    }
    const isMatch = await bcrypt.compare(userInfo.password, user.password)

    //verifica se a senha esta correta
    if (!isMatch) {
      return res.status(404).json({message: "Senha invalida!"})
    }

    //gerar o token jwt
    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn:'7d'})

    res.status(200).json(token)

  } catch (err) {
    res.status(500).json({message:'erro'}) //resposta para o front
  }
})

export default router