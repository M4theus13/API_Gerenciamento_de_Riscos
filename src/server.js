import express from 'express'
import cors from 'cors'
import publicRoutes from '../routes/public.js'
import privateRoutes from '../routes/private.js'
import adminRoutes from '../routes/admin.js' 

import auth from '../middleware/auth.js'

const app = express()

app.use(express.json())
app.use(cors())

// criar usuarios atualizados
app.use('/usuarios', publicRoutes)
app.use('/admin', auth , adminRoutes)
// listar usuarios
app.use('/',auth, privateRoutes )

// editar usuario

//deletar usuario

app.listen(3000)