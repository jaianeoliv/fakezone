const { Router } = require('express');
const { postCadastroUsuario, postLoginUsuario } = require('../controladores/usuarios');

const router = Router();

router.post('/cadastro', postCadastroUsuario);
router.post('/login', postLoginUsuario);

module.exports = router;
