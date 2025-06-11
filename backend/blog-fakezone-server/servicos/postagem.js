const db = require("./db");
const mysql = require("mysql2");


async function getTodasPostagens(callback) {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        posts.id,
        posts.titulo,
        posts.conteudo,
        posts.data_criacao,

        usuarios.id AS usuario_id,
        usuarios.nome_exibicao,

        categorias.id AS categoria_id,
        categorias.nome AS nome_categoria,

        moods.id AS mood_id,
        moods.emoji,
        moods.descricao AS descricao_humor

      FROM posts
      JOIN usuarios ON posts.usuarios_id = usuarios.id
      JOIN categorias ON posts.categorias_id = categorias.id
      JOIN moods ON posts.moods_id = moods.id
    `);

    callback(null, rows);
  } catch (error) {
    callback(error, null);
  }
}

function getPostagemPorId(id, callback) {
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        callback(err, results[0]); 
    });
}

function inserePostagem(postagemNova, callback) {
  const { titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id } = postagemNova;
  const sql = "INSERT INTO posts (titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, { id: result.insertId, ...postagemNova });
  });
}


function atualizaPostagem(id, postagemAtualizada, callback) {
    const { titulo, conteudo, post_imagem, categorias_id, moods_id } = postagemAtualizada;
    const sql = "UPDATE posts SET titulo = ?, conteudo = ?, post_imagem = ?, categorias_id = ?, moods_id = ?, data_atualizacao = NOW() WHERE id = ?";

    db.query(sql, [titulo, conteudo, post_imagem, categorias_id, moods_id, id], (err, result) => {
        callback(err, result.affectedRows > 0);
    });
}


function deletaPostagem(id, callback) {
    db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
        callback(err, result.affectedRows > 0);
    });
}

module.exports = {
    getTodasPostagens,
    getPostagemPorId,
    inserePostagem,
    atualizaPostagem,
    deletaPostagem
};
