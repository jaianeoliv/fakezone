const { 
    getTodasPostagens, 
    getPostagemPorId, 
    inserePostagem, 
    atualizaPostagem, 
    deletaPostagem 
} = require("../servicos/postagem");

function getPostagens(req, res) {
    getTodasPostagens((err, postagens) => {
        if (err) {
            res.status(500).send("Erro ao buscar postagens");
        } else {
            res.json(postagens);
        }
    });
}

function getPostagem(req, res) {
    const id = req.params.id;
    getPostagemPorId(id, (err, postagem) => {
        if (err) {
            res.status(500).send("Erro ao buscar postagem");
        } else if (!postagem) {
            res.status(404).send("Postagem não encontrada");
        } else {
            res.json(postagem);
        }
    });
}

function postPostagem(req, res) {
    const postagemNova = req.body;
    inserePostagem(postagemNova, (err, novaPostagem) => {
        if (err) {
            res.status(500).send("Erro ao criar postagem");
        } else {
            res.status(201).json(novaPostagem);
        }
    });
}

function patchPostagem(req, res) {
    const id = req.params.id;
    const postagemAtualizada = req.body;
    
    atualizaPostagem(id, postagemAtualizada, (err, sucesso) => {
        if (err) {
            res.status(500).send("Erro ao atualizar postagem");
        } else if (!sucesso) {
            res.status(404).send("Postagem não encontrada");
        } else {
            res.send("Postagem atualizada com sucesso!");
        }
    });
}

function deletePostagem(req, res) {
    const id = req.params.id;
    
    deletaPostagem(id, (err, sucesso) => {
        if (err) {
            res.status(500).send("Erro ao deletar postagem");
        } else if (!sucesso) {
            res.status(404).send("Postagem não encontrada");
        } else {
            res.send("Postagem deletada com sucesso!");
        }
    });
}

module.exports = {
    getPostagens,
    getPostagem,
    postPostagem,
    patchPostagem,
    deletePostagem
};
