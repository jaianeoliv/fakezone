const db = require("./db");
const mysql = require("mysql2");


function insereUsuario(usuario, callback) {
  
  const query = `
      INSERT INTO usuarios (nome_exibicao, username, email, senha, biografia, imagem, data_nascimento)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  const { nome_exibicao, username, email, senha, biografia, imagem, data_nascimento } = usuario;
  const imagemParaInserir = imagem || null; // null mesmo

  db.query(query, [nome_exibicao, username, email, senha, biografia, imagemParaInserir, data_nascimento], callback);

}

function atualizarUsuarioPorId(id, dados, callback) {
  const { nome_exibicao, email, biografia, emoji, imagem, data_nascimento } = dados;

  const sql = `
    UPDATE usuarios
    SET nome_exibicao = ?, email = ?, biografia = ?, emoji = ?, imagem = ?, data_nascimento = ?
    WHERE id = ?
  `;

  conexao.query(sql, [nome_exibicao, email, biografia, emoji, imagem, data_nascimento, id], callback);
}


function getUsuarioPorUsername(username, callback) {
  const query = "SELECT * FROM usuarios WHERE username = ?";
  db.query(query, [username], callback);
}

function getUsuarioPorEmail(email, callback) {
  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], callback);
}

function getTodosUsuarios(callback) {
  const query = "SELECT * FROM usuarios";
  db.query(query, callback);
}

module.exports = { insereUsuario, getUsuarioPorUsername, getUsuarioPorEmail, getTodosUsuarios, atualizarUsuarioPorId };
