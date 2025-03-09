const express = require('express');
const { criar, listar, visualizar, editar, deletar } = require('../controladores/postagem');

const router = express.Router();


router.post('/', criar);
router.get('/', listar);
router.get('/:id', visualizar);
router.put('/:id', editar);
router.delete('/:id', deletar);

module.exports = router;
