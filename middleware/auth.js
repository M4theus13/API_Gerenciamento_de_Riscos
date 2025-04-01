import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {//next é a aprovação para continuar a aplicação

  const token = req.headers.authorization

   if (!token) {
    console.log(token)
    return res.status(401).json({message: 'acesso negado'})
   }
   
  try {
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
    req.userId = decodedToken.id //envia o user id para a req
    req.isAdmin = decodedToken.admin //envia o admin para
    req.accountActive = decodedToken.accountActive//envia se a conta esta ativa
  } catch (err) {
    return res.status(401).json({message: 'Token invalido'})
  }
  next()

}

export default auth