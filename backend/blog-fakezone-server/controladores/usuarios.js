const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  insereUsuario,
  getUsuarioPorUsername,
  getUsuarioPorEmail,
  getUsuarioPorId,
  getTodosUsuarios,
  atualizarUsuarioPorId,
} = require('../servicos/usuarios');

const JWT_SECRET = "dangerunzonerun";

async function getUsuarios(req, res) {
  try {
    const usuarios = await getTodosUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar usuários.", erro: err.message });
  }
}

async function getMeuPerfil(req, res) {
  try {
    const usuario = await getUsuarioPorId(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar usuário.", erro: err.message });
  }
}

async function putAtualizarPerfil(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { nome_exibicao, email, biografia, emoji, imagem, data_nascimento } = req.body;

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
    res.status(500).json({ mensagem: 'Erro ao atualizar perfil.', erro: err.message });
  }
}

async function postCadastroUsuario(req, res) {
  try {
    const { nome_exibicao, username, email, senha, biografia, imagem, data_nascimento } = req.body;

    if (!nome_exibicao || !username || !email || !senha || !data_nascimento) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios faltando.' });
    }

    const usuariosComUsername = await getUsuarioPorUsername(username);
    if (usuariosComUsername.length > 0) return res.status(400).json({ mensagem: "Username já existe." });

    const usuariosComEmail = await getUsuarioPorEmail(email);
    if (usuariosComEmail.length > 0) return res.status(400).json({ mensagem: "Email já registrado." });

    const senhaCriptografada = await bcrypt.hash(senha, 10);
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

    await insereUsuario(usuario);

    res.status(201).json({ mensagem: "Usuário criado com sucesso." });

  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ mensagem: "Erro ao criar usuário.", erro: err.message });
  }
}

async function postLoginUsuario(req, res) {
  try {
    const { username, senha } = req.body;

    if (!username || !senha) {
      return res.status(400).json({ mensagem: "Preencha usuário/email e senha." });
    }

    let usuario = null;

    const usuariosPorUsername = await getUsuarioPorUsername(username);
    if (usuariosPorUsername.length > 0) {
      usuario = usuariosPorUsername[0];
    } else {
      const usuariosPorEmail = await getUsuarioPorEmail(username);
      if (usuariosPorEmail.length > 0) {
        usuario = usuariosPorEmail[0];
      } else {
        return res.status(400).json({ mensagem: "Usuário não encontrado." });
      }
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(400).json({ mensagem: "Senha incorreta." });

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        nome_exibicao: usuario.nome_exibicao,
        email: usuario.email,
      }
    });

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ mensagem: "Erro interno no login.", erro: err.message });
  }
}

module.exports = {
  getUsuarios,
  getMeuPerfil,
  putAtualizarPerfil,
  postCadastroUsuario,
  postLoginUsuario,
};
