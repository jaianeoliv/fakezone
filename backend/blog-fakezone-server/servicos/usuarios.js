const db = require("./db");
const mysql = require("mysql2");


function insereUsuario(usuario, callback) {
  const query = `
    INSERT INTO usuarios (nome_exibicao, username, email, senha, biografia, imagem, data_nascimento)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const { nome_exibicao, username, email, senha, biografia, imagem, data_nascimento } = usuario;
  
  db.query(query, [nome_exibicao, username, email, senha, biografia, imagem || 'DEFAULT NULL', data_nascimento], callback);
}

function getUsuarioPorUsername(username, callback) {
  const query = "SELECT * FROM usuarios WHERE username = ?";
  db.query(query, [username], callback);
}

function getUsuarioPorEmail(email, callback) {
  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], callback);
}

module.exports = { insereUsuario, getUsuarioPorUsername, getUsuarioPorEmail };
