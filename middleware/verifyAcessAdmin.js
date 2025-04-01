import jwt from 'jsonwebtoken'

const verifyAcessAdmin =  (req, res, next) => {

  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded) //mostra o id do usuario e se ele é admin, essa info vem do token
    if (!decoded.isAdmin) {
      return res.status(401).json({message: 'Acesso negado!'})
    }
  }catch (err) {
    return res.status(401).json({message: 'Token invalido'})
  }
  next()

}

export default verifyAcessAdmin