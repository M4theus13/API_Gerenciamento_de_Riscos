import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const router = express.Router()
const prisma = new PrismaClient()

//rota para puxar informações do usuario logado
router.get('/me/:id', async (req, res) => { 
  const id = req.params.id
  try {
    const userLogado = await prisma.user.findMany({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        accountActive: true
      }
    }) 
    res.status(200).json({message: 'usuario', userLogado})
  } catch (err) {
    console.log(err)
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})//rota para retornar quem é o usuario logado

router.put('/users/:id', async (req, res) => { //rota para retornar quem é o usuario logado
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
        accountActive: true
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
    res.status(200).json({message:'Email Alterado com sucesso'})
  } catch(err) {
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})

//usuario alterar sua senha
router.put('/edit-password-user/:id', async (req, res) => {
  const newPassword = req.body.newPassword
  try {
    const id = req.params.id
    const salt = await bcrypt.genSalt(10) //nivel de encriptação
    const hashPassword = await bcrypt.hash(newPassword, salt) //senha criptografada
    await prisma.user.update({
      where: { id: id},
      data : {
        password: hashPassword
      }
    })
    res.status(200).json({message:'Senha Alterado com sucesso'})
  } catch(err) {
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})

//excluir sua propria conta
router.delete('/edit-delete-user/:id', async (req, res) => {
  try {
    const id = req.params.id
    await prisma.user.delete({
      where: { id: id},
    })
    res.status(200).json({message:'Conta deletada com sucesso'})
  } catch(err) {
    res.status(500).json({message:'falha no servidor'}) //resposta para o front
  }
})

//Rota para verificar se o email recebido é o mesmo do usuario
router.post('/verify-email/:id', async(req, res) => {
  try {
    const id = req.params.id
    const email = req.body
    const emailUser = await prisma.user.findMany({
      where: { id : id },
      select:  { email : true }
    })
    console.log(emailUser[0].email, '| email do banco de dados')
    console.log(email.email, '| email recebido')
    if (emailUser.length === 0) {
      return res.status(201).json({ message: 'usuario não encontrado' });
    }

    if (emailUser[0].email !== email.email) {
      return res.status(201).json({ message: 'email não corresponde'})
    }
    res.status(200).json()
  } catch (err) {
    console.log(err + 'erro no back')
    res.status(500).json({message:'erro'})
  }
})

//Rota para verificar se o novo email recebido já existe
router.post('/verify-new-email', async(req, res) => {
  try {
    const newEmail= req.body
    const emailDB = await prisma.user.findMany({
      where: { email : newEmail.emailNew },
      select:  { email : true }
    })
    console.log(newEmail.emailNew, '| novo email recebido')
    console.log(emailDB, '| emails do banco de dados')

    if (emailDB.length === 0) {
      console.log('email não cadastrado, pode ser utilizado')
      return res.status(200).json({ message: 'email não esta cadastrado no banco' });
    }
    console.log('email já cadastrado, não pode ser utilizado')
    return res.status(201).json({message: 'email já cadastrado'})
  } catch (err) {
    console.log(err + 'erro no backa')
    res.status(500).json({message:'erro'})
  }
})

//Rota para verificar se o password recebido é o mesmo do usuario
router.post('/verify-password/:id', async(req, res) => {
  try {
    const id = req.params.id
    const password = req.body
    const passwordUser = await prisma.user.findMany({
      where: { id : id },
      select:  { password : true }
    })
    console.log(passwordUser[0].password)
    console.log(password.password)


    const isMatch = await bcrypt.compare(password.password, passwordUser[0].password)

    if (!isMatch) {
      console.log('senha não corresponde')
      return res.status(201).json({ message: 'senha não corresponde'})
    }

    console.log('senha corresponde')
    return res.status(200).json({ message: 'senha corresponde'})
  } catch (err) {
    console.log(err + 'erro no back')
    res.status(500).json({message:'erro'})
  }
})

// rota não utilizada
router.post('/return-email/:id', async(req, res) => {
  try {
    const id = req.params.id
    const emailUser = await prisma.user.findMany({
      where: { id : id },
      select:  { email : true }
    })

    if (emailUser.length === 0) {
      return res.status(201).json({ message: 'usuario não encontrado' });
    }
    res.status(200).json(emailUser)
  } catch (err) {
    console.log(err + 'erro no back')
    res.status(500).json({message:'erro'})
  }
})
// rota não utilizada

export default router