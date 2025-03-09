const { criarPostagem, listarPostagens, obterPostagem, atualizarPostagem, deletarPostagem } = require('../servicos/postagem');

// criar nova postagem
function criar(req, res) {
  const postagemData = req.body;
  criarPostagem(postagemData, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar postagem', error: err });
    }
    res.status(201).json({ message: 'Postagem criada com sucesso', data: results });
  });
}

// listar todas as postagens
function listar(req, res) {
  listarPostagens((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar postagens', error: err });
    }
    res.status(200).json({ data: results });
  });
}

// obter postagem específica
function visualizar(req, res) {
  const id = req.params.id;
  obterPostagem(id, (err, postagem) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter postagem', error: err });
    }
    res.status(200).json({ data: postagem });
  });
}

// atualizar postagem
function editar(req, res) {
  const id = req.params.id;
  const postagemData = req.body;
  atualizarPostagem(id, postagemData, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar postagem', error: err });
    }
    res.status(200).json({ message: 'Postagem atualizada com sucesso', data: results });
  });
}

// deletar postagem
function deletar(req, res) {
  const id = req.params.id;
  deletarPostagem(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar postagem', error: err });
    }
    res.status(200).json({ message: 'Postagem deletada com sucesso' });
  });
}

module.exports = { criar, listar, visualizar, editar, deletar };
