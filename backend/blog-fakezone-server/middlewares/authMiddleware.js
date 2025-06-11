const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const JWT_SECRET = "dangerunzonerun";
const verifyAsync = promisify(jwt.verify);

async function autenticarToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ erro: "Token não enviado" });

    const usuario = await verifyAsync(token, JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = { autenticarToken };
