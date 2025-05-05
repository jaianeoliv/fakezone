const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const { insereUsuario, getUsuarioPorUsername, getUsuarioPorEmail } = require('../servicos/usuarios');

const JWT_SECRET = "dangerunzonerun";  

function postCadastroUsuario(req, res) {
  const { nome_exibicao, username, email, senha, biografia, imagem, data_nascimento } = req.body;
  
  // Verifica se o username ou email já existem
  getUsuarioPorUsername(username, (err, result) => {
    if (err) return res.status(500).send("Erro ao verificar usuário.");
    if (result.length > 0) return res.status(400).send("Username já existe.");
    
    getUsuarioPorEmail(email, (err, result) => {
      if (err) return res.status(500).send("Erro ao verificar email.");
      if (result.length > 0) return res.status(400).send("Email já registrado.");
      
      // Criptografa a senha
      bcrypt.hash(senha, 10, (err, senhaCriptografada) => {
        if (err) return res.status(500).send("Erro ao criptografar a senha.");
        
        const usuario = {
          nome_exibicao,
          username,
          email,
          senha: senhaCriptografada,
          biografia,
          imagem,
          data_nascimento,
        };
        
        // Insere o novo usuário no banco de dados
        insereUsuario(usuario, (err, result) => {
          if (err) return res.status(500).send("Erro ao criar usuário.");
          res.status(201).send("Usuário criado com sucesso.");
        });
      });
    });
  });
}

function postLoginUsuario(req, res) {
  const { username, senha } = req.body;

  getUsuarioPorUsername(username, (err, result) => {
    if (err) return res.status(500).send("Erro ao buscar usuário.");
    if (result.length === 0) return res.status(400).send("Usuário não encontrado.");

    const usuario = result[0];
    
    // Verifica se a senha informada bate com a senha criptografada no banco
    bcrypt.compare(senha, usuario.senha, (err, result) => {
      if (err) return res.status(500).send("Erro ao verificar a senha.");
      if (!result) return res.status(400).send("Senha incorreta.");
      
      // Gera o token JWT
      const token = jwt.sign({ id: usuario.id, username: usuario.username }, JWT_SECRET, { expiresIn: '1h' });
      
      res.json({ token });
    });
  });
}

module.exports = { postCadastroUsuario, postLoginUsuario };
