const connection = require('../config/db');

// criar nova postagem
function criarPostagem(postagemData, callback) {
  const { titulo, conteudo, categorias_id, usuarios_id, moods_id, post_imagem } = postagemData;
  const sql = 'INSERT INTO posts (titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id) VALUES (?, ?, ?, ?, ?, ?)';
  
  connection.query(sql, [titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

// listar todas as postagens
function listarPostagens(callback) {
  const sql = 'SELECT * FROM posts';
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

// obter postagem específica
function obterPostagem(id, callback) {
  const sql = 'SELECT * FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
}

// atualizar postagem
function atualizarPostagem(id, postagemData, callback) {
  const { titulo, conteudo, post_imagem, categorias_id, moods_id } = postagemData;
  const sql = 'UPDATE posts SET titulo = ?, conteudo = ?, post_imagem = ?, categorias_id = ?, moods_id = ? WHERE id = ?';
  
  connection.query(sql, [titulo, conteudo, post_imagem, categorias_id, moods_id, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

// deletar postagem
function deletarPostagem(id, callback) {
  const sql = 'DELETE FROM posts WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

module.exports = { criarPostagem, listarPostagens, obterPostagem, atualizarPostagem, deletarPostagem };
