import express from 'express'
import cors from 'cors'
import publicRoutes from '../routes/public.js'
import privateRoutes from '../routes/private.js'
import adminRoutes from '../routes/admin.js' 
import dotenv from 'dotenv';

import auth from '../middleware/auth.js'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
console.log("Ambiente:", process.env.NODE_ENV);
const app = express()



app.use(express.json())

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://m4theus13.github.io']
  : ['https://m4theus13.github.io', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Se usar cookies ou tokens
}));

app.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

app.use('/usuarios', publicRoutes)
app.use('/admin', auth , adminRoutes)
app.use('/private',auth, privateRoutes )


console.log(process.env.NODE_ENV)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Servidor rodando em ${port}`);
});
