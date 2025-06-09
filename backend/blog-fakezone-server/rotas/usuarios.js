const { Router } = require('express');
const { autenticarToken } = require('../middlewares/authMiddleware');


const {
  getUsuarios,
  getMeuPerfil,
  postCadastroUsuario,
  putAtualizarPerfil,
  postLoginUsuario,
} = require('../controladores/usuarios');

const router = Router();


router.get('/', autenticarToken, getUsuarios);
router.get('/meuPerfil', autenticarToken, getMeuPerfil);
router.get('/usuario/me', autenticarToken, getMeuPerfil);
router.put('/usuario/me', autenticarToken, putAtualizarPerfil);
router.post('/cadastro', postCadastroUsuario);
router.post('/login', postLoginUsuario);

module.exports = router;
