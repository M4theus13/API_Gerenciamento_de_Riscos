import express from "express"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyAcessAdmin from "../middleware/verifyAcessAdmin.js"


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
    res.status(200).json(usuario) //resposta para o front
  } catch (err) {
    console.log(err)
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
      console.log('usuario não encontrado')
      return res.status(201).json({message: "Usuario não encontrado"})
    }
    const isMatch = await bcrypt.compare(userInfo.password, user.password)

    //verifica se a senha esta correta
    if (!isMatch) {
      console.log('senha invalida')
      return res.status(201).json({message: "Senha invalida!"})
    }

    //gerar o token jwt
    const token = jwt.sign({id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin, accountActive: user.accountActive, avatarURL: user.avatarURL}, process.env.JWT_SECRET, {expiresIn:'7d'})

    res.status(200).json(token)

  } catch (err) {
    console.log(err)
    res.status(500).json({message:'erro'}) //resposta para o front
  }
})

router.post('/user', async(req, res) => {
  try {
    const { email } = req.body
    const findUser = await prisma.user.findMany({
      where: { email }
    })

    if (findUser.length === 0) {
      return res.status(200).json({ message: 'usuario não encontrado' });
    }
    res.status(201).json(findUser)
  } catch (err) {
    console.log(err + 'erro no back')
    res.status(500).json({message:'erro'})
  }
})

router.post('/administrador', async (req, res) => {
  try {
    const user = req.body
    const salt = await bcrypt.genSalt(10) //nivel de encriptação
    const hashPassword = await bcrypt.hash(user.password, salt) //senha criptografada

    const usuario = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
        isAdmin: user.isAdmin
      }
    })
    res.status(200).json(usuario) //resposta para o front
  } catch (err) {
    console.log(err)
    res.status(500).json({message:'erro'}) //resposta para o front

  }
})

export default router