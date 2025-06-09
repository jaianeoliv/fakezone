const jwt = require('jsonwebtoken');

const JWT_SECRET = "dangerunzonerun";

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: "Token não enviado" });

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: "Token inválido ou expirado" });
    req.usuario = usuario;
    next();
  });
}

module.exports = { autenticarToken };
