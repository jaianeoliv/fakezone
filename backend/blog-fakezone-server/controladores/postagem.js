const { getTodasPostagens, getPostagemPorId, inserePostagem } = require("../servicos/postagem");

function getPostagens(req, res) {
    try {  
        const postagens = getTodasPostagens();
        res.send(postagens);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function getPostagem(req, res) {
    try {  
        const id = req.params.id;
        const postagem = getPostagemPorId(id);
        res.send(postagem);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function postPostagem(req, res) {
    try {
        const postagemNova = req.body;
        inserePostagem(postagemNova); // Chama a função de inserir a postagem
        res.status(201);  // Status 201 para "criado"
        res.send("Postagem publicada");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getPostagens,
    getPostagem,
    postPostagem // Agora só exporta uma vez
};
