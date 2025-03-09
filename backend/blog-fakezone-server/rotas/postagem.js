const { Router } = require("express");
const { getPostagens, getPostagem, postPostagem } = require("../controladores/postagem");

const router = Router();

router.get('/', getPostagens); 
router.get('/:id', getPostagem); 

// Corrigindo a rota POST
router.post('/', postPostagem); // Aqui chamamos a função postPostagem

router.patch('/', (req, res) => {
    res.send("Você fez uma requisição do tipo PATCH");
});

router.delete('/', (req, res) => {
    res.send("Você fez uma requisição do tipo DELETE");
});

module.exports = router;
