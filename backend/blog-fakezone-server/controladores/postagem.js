
const {
    
    getPostagemPorId,
    inserePostagem,
    atualizaPostagem,
    deletaPostagem
} = require("../servicos/postagem");

const db = require('../servicos/db');

async function getPostagens(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        posts.id,
        posts.titulo,
        posts.conteudo,
        posts.usuarios_id,
        moods.id AS mood_id,
        moods.emoji,
        moods.descricao AS descricao_humor,
        categorias.id AS categoria_id,
        categorias.nome AS nome_categoria
      FROM posts
      JOIN moods ON posts.moods_id = moods.id
      JOIN categorias ON posts.categorias_id = categorias.id
    `);

    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
    res.status(500).json({ error: 'Erro ao buscar postagens' });
  }
}



module.exports = { getPostagens };



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
            console.error("Erro ao inserir postagem:", err);
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
