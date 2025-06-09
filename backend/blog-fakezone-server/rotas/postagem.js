const { autenticarToken} = require('../middlewares/authMiddleware');
const { Router } = require("express");

const router = Router();


const { 
    getPostagens, 
    getPostagem, 
    postPostagem, 
    patchPostagem, 
    deletePostagem 
} = require("../controladores/postagem");

router.get('/', getPostagens);
router.get('/:id', getPostagem);
console.log("authMiddleware:", autenticarToken);
console.log("postPostagem:", postPostagem);

router.post('/', autenticarToken, postPostagem);
router.patch('/:id', patchPostagem);
router.delete('/:id', deletePostagem);

module.exports = router;
