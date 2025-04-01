import express from 'express'
import cors from 'cors'
import publicRoutes from '../routes/public.js'
import privateRoutes from '../routes/private.js'
import adminRoutes from '../routes/admin.js' 
import dotenv from 'dotenv';

import auth from '../middleware/auth.js'

dotenv.config({   path: process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development' });

console.log('Ambiente:', process.env.NODE_ENV);
console.log('DB URL:', process.env.DATABASE_URL);
const app = express()

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://m4theus13.github.io']
  : ['http://localhost:5173']; // Apenas a origem do front em desenvolvimento

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Adicione OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'], // Adicione Origin
  credentials: true
}));

app.use(express.json())

// Adicione tratamento explícito para requisições OPTIONS
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

app.use('/usuarios', publicRoutes)
app.use('/admin', auth , adminRoutes)
app.use('/',auth, privateRoutes )


console.log(process.env.NODE_ENV)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Servidor rodando em ${port}`);
});
