import { PrismaClient } from '@prisma/client'
import express from 'express'
import publicRoutes from '../routes/public.js'


// import { hash, compare } from 'bcrypt'
// import { sign } from 'jsonwebtoken'



const app = express()
const prisma = new PrismaClient()
app.use(express.json())

// listar usuarios
app.get('/usuarios',  async (req, res) => {

  const user = await prisma.user.findMany()



  res.send(user)
  res.status(200)
})

// criar usuarios
app.post('/criar', async (req, res) => {

   await prisma.user.create({
     data: {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
     }
   })

  console.log(req)
  res.status(201).send(req.body)
})

// criar usuarios atualizados
app.use('/usuarios', publicRoutes)

// editar usuario
app.put('/put', (req, res) => {
  
})

//deletar usuario
app.delete('/delete', (req, res) => {

})

app.listen(3000)