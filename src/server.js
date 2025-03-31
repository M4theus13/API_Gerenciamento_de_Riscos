import express from 'express'
import cors from 'cors'
import publicRoutes from '../routes/public.js'
import privateRoutes from '../routes/private.js'
import adminRoutes from '../routes/admin.js' 

import auth from '../middleware/auth.js'

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'https://m4theus13.github.io', // Domínio base (sem o caminho do repositório)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Se usar cookies ou tokens
}));

app.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

// criar usuarios atualizados
app.use('/usuarios', publicRoutes)
app.use('/admin', auth , adminRoutes)
// listar usuarios
app.use('/private',auth, privateRoutes )

// editar usuario

//deletar usuario
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Servidor rodando em ${port}`);
});
