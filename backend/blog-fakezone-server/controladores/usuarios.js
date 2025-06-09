const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  insereUsuario,
  getUsuarioPorUsername,
  getUsuarioPorEmail,
  getUsuarioPorId,
  getTodosUsuarios,
  atualizarUsuarioPorId, // <-- vamos criar essa função no seu serviço de usuários
} = require('../servicos/usuarios');

const { autenticarToken } = require('../middlewares/authMiddleware');

const JWT_SECRET = "dangerunzonerun";

async function getUsuarios(req, res) {
  getTodosUsuarios((err, results) => {
    if (err) return res.status(500).json({ mensagem: "Erro ao buscar usuários.", erro: err });
    res.json(results);
  });
}

async function getMeuPerfil(req, res) {
  getUsuarioPorId(req.usuario.id, (err, result) => {
    if (err) return res.status(500).json({ mensagem: "Erro ao buscar usuário.", erro: err });
    if (!result) return res.status(404).json({ mensagem: "Usuário não encontrado." });
    res.json(result);
  });
}

// Nova função para atualizar o perfil do usuário logado
async function putAtualizarPerfil(req, res) {
  const usuarioId = req.usuario.id;
  const { nome_exibicao, email, biografia, emoji, imagem, data_nascimento } = req.body;

  // Aqui você pode adicionar validações básicas (ex: campos obrigatórios, formato de email, etc)

  try {
    // Atualiza usuário no banco
    await atualizarUsuarioPorId(usuarioId, {
      nome_exibicao,
      email,
      biografia,
      emoji,
      imagem,
      data_nascimento,
    });

    res.json({ mensagem: 'Perfil atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar perfil.', erro: err });
  }
}

async function postCadastroUsuario(req, res) {
  const { nome_exibicao, username, email, senha, biografia, imagem, data_nascimento } = req.body;

  if (!nome_exibicao || !username || !email || !senha || !data_nascimento) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios faltando.' });
  }

  getUsuarioPorUsername(username, (err, result) => {
    if (err) return res.status(500).json({ mensagem: "Erro ao verificar username.", erro: err });
    if (result.length > 0) return res.status(400).json({ mensagem: "Username já existe." });

    getUsuarioPorEmail(email, (err, result) => {
      if (err) return res.status(500).json({ mensagem: "Erro ao verificar email.", erro: err });
      if (result.length > 0) return res.status(400).json({ mensagem: "Email já registrado." });

      bcrypt.hash(senha, 10, (err, senhaCriptografada) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao criptografar senha.", erro: err });

        const dataFormatada = new Date(data_nascimento).toISOString().slice(0, 10);

        const usuario = {
          nome_exibicao,
          username,
          email,
          senha: senhaCriptografada,
          biografia,
          imagem: imagem || null,
          data_nascimento: dataFormatada,
        };

        console.log('Tentando inserir usuário:', usuario);

        insereUsuario(usuario, (err) => {
          if (err) {
            console.error('Erro ao criar usuário detalhado:', err.sqlMessage || err);
            return res.status(500).json({ mensagem: "Erro ao criar usuário.", erro: err });
          }
          res.status(201).json({ mensagem: "Usuário criado com sucesso." });
        });
      });
    });
  });
}

async function postLoginUsuario(req, res) {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(400).json({ mensagem: "Preencha usuário/email e senha." });
  }

  // Tenta buscar por username primeiro
  getUsuarioPorUsername(username, (err, result) => {
    if (err) return res.status(500).json({ mensagem: "Erro ao buscar usuário.", erro: err });

    if (result.length === 0) {
      // Se não achou por username, tenta por email
      getUsuarioPorEmail(username, (err, resultEmail) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao buscar por email.", erro: err });
        if (resultEmail.length === 0) return res.status(400).json({ mensagem: "Usuário não encontrado." });

        autenticarUsuario(resultEmail[0], senha, res);
      });
    } else {
      autenticarUsuario(result[0], senha, res);
    }
  });
}

function autenticarUsuario(usuario, senha, res) {
  bcrypt.compare(senha, usuario.senha, (err, senhaCorreta) => {
    if (err) return res.status(500).json({ mensagem: "Erro ao verificar senha.", erro: err });
    if (!senhaCorreta) return res.status(400).json({ mensagem: "Senha incorreta." });

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome_exibicao: usuario.nome_exibicao,
        username: usuario.username,
        email: usuario.email,
        biografia: usuario.biografia,
        imagem: usuario.imagem,
        data_nascimento: usuario.data_nascimento,
        emoji: usuario.emoji // incluir emoji se tiver
      }
    });
  });
}

module.exports = {
  getUsuarios,
  getMeuPerfil,
  putAtualizarPerfil,  // exporta a função nova
  postCadastroUsuario,
  postLoginUsuario,
};
