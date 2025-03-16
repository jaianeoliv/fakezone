const db = require("./db");

// Buscar todas as postagens
function getTodasPostagens(callback) {
    db.query("SELECT * FROM posts", (err, results) => {
        callback(err, results);
    });
}

// Buscar uma postagem por ID
function getPostagemPorId(id, callback) {
    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        callback(err, results[0]); // Retorna apenas um resultado
    });
}

// Criar uma nova postagem
function inserePostagem(postagemNova, callback) {
    const { titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id } = postagemNova;
    const sql = "INSERT INTO posts (titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [titulo, conteudo, post_imagem, categorias_id, usuarios_id, moods_id], (err, result) => {
        callback(err, { id: result.insertId, ...postagemNova });
    });
}

// Atualizar uma postagem
function atualizaPostagem(id, postagemAtualizada, callback) {
    const { titulo, conteudo, post_imagem, categorias_id, moods_id } = postagemAtualizada;
    const sql = "UPDATE posts SET titulo = ?, conteudo = ?, post_imagem = ?, categorias_id = ?, moods_id = ?, data_atualizacao = NOW() WHERE id = ?";

    db.query(sql, [titulo, conteudo, post_imagem, categorias_id, moods_id, id], (err, result) => {
        callback(err, result.affectedRows > 0);
    });
}

// Deletar uma postagem
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
