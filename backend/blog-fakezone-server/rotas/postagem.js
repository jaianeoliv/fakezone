const { Router } = require("express");
const { 
    getPostagens, 
    getPostagem, 
    postPostagem, 
    patchPostagem, 
    deletePostagem 
} = require("../controladores/postagem");

const router = Router();

router.get('/', getPostagens);
router.get('/:id', getPostagem);
router.post('/', postPostagem);
router.patch('/:id', patchPostagem);
router.delete('/:id', deletePostagem);

module.exports = router;
