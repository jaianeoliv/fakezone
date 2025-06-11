const db = require('./db');

async function insereUsuario(usuario) {
  const query = `
    INSERT INTO usuarios (nome_exibicao, username, email, senha, biografia, imagem, data_nascimento)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const { nome_exibicao, username, email, senha, biografia, imagem, data_nascimento } = usuario;
  const imagemParaInserir = imagem || null;

  const [result] = await db.query(query, [nome_exibicao, username, email, senha, biografia, imagemParaInserir, data_nascimento]);
  return result;
}

async function getUsuarioPorUsername(username) {
  const query = "SELECT * FROM usuarios WHERE username = ?";
  const [rows] = await db.query(query, [username]);
  return rows;
}

async function getUsuarioPorEmail(email) {
  const query = "SELECT * FROM usuarios WHERE email = ?";
  const [rows] = await db.query(query, [email]);
  return rows;
}

async function getUsuarioPorId(id) {
  const query = "SELECT * FROM usuarios WHERE id = ?";
  const [rows] = await db.query(query, [id]);
  return rows[0];
}

async function getTodosUsuarios() {
  const query = "SELECT * FROM usuarios";
  const [rows] = await db.query(query);
  return rows;
}

async function atualizarUsuarioPorId(id, dadosAtualizados) {
  const campos = [];
  const valores = [];

  for (const chave in dadosAtualizados) {
    campos.push(`${chave} = ?`);
    valores.push(dadosAtualizados[chave]);
  }

  const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`;
  valores.push(id);

  const [result] = await db.query(query, valores);
  return result;
}

module.exports = {
  insereUsuario,
  getUsuarioPorUsername,
  getUsuarioPorEmail,
  getUsuarioPorId,
  getTodosUsuarios,
  atualizarUsuarioPorId,
};
