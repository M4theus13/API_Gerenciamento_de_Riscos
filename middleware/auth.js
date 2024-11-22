import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {//next é a aprovação para continuar a aplicação

  const token = req.headers.authorization


   if (!token) {
     return res.status(401).json({message: 'acesso negado'})
   }

  try {

    const decodedToken = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
    req.userId = decodedToken.id //envia o user id para a req


  } catch (err) {
    return res.status(401).json({message: 'Token invalido'})
  }
  next()

}

export default auth