
const verifyAcessAdmin =  (req, res, next) => {
  const VALIDATE_CODE = 'segredo123'

  
  if (false !== VALIDATE_CODE) {
    console.log(req.body)
    console.log(VALIDATE_CODE)
    return res.status(403).json({ message: 'Acesso negado. Código inválido.' });
  }

  next()
}

export default verifyAcessAdmin