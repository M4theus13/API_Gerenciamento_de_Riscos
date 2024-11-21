import { PrismaClient } from '@prisma/client'
import express from 'express'
import publicRoutes from '../routes/public.js'
import privateRoutes from '../routes/private.js'

import auth from '../middleware/auth.js'

const app = express()

app.use(express.json())

// listar usuarios

// criar usuarios atualizados
app.use('/usuarios', publicRoutes)
app.use('/',auth, privateRoutes )

// editar usuario

//deletar usuario

app.listen(3000)