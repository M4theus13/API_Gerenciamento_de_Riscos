import express from 'express'
import cors from 'cors'
import publicRoutes from '../routes/public.js'
import privateRoutes from '../routes/private.js'
import adminRoutes from '../routes/admin.js' 

import auth from '../middleware/auth.js'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'https://m4theus13.github.io' }))

// criar usuarios atualizados
app.use('/usuarios', publicRoutes)
app.use('/admin', auth , adminRoutes)
// listar usuarios
app.use('/',auth, privateRoutes )

// editar usuario

//deletar usuario
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
