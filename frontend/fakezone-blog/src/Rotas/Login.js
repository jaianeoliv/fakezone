import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import xpwindows from '../Assets/xpwindows.jpg';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; 


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

const { login } = useAuth();

const handleLogin = async (e) => {
 console.log('handleLogin iniciou');
  e.preventDefault();
  setErro(null);
  try {
    const response = await axios.post('http://localhost:8000/api/usuarios/login', {
      username,
      senha,
      
    });

 console.log('Resposta do login:', response.data);
    login(response.data.usuario, response.data.token);
  
    navigate('/');
  } catch (err) {
    console.error('Erro ao fazer login:', err.response?.data || err.message);
    setErro('Nome de usuário ou senha inválidos.');
  }
};

  return (
    <BackgroundContainer>
      <GlassForm>
        <TitleBar>
          <Title>Login</Title>
          <CloseButton onClick={() => navigate('/')}>X</CloseButton>
        </TitleBar>
        <FormBody>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="nome de usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            <XPButton type="submit">Entrar</XPButton>
          </form>

          {erro && <p style={{ color: 'red', fontSize: '12px' }}>{erro}</p>}

          <ForgotPassword onClick={() => alert('Funcionalidade futura')}>
            Esqueceu a senha?
          </ForgotPassword>

          <SignUpLink onClick={() => navigate('/cadastrar')}>
            Não tem uma conta? <span>Crie aqui</span>
          </SignUpLink>
        </FormBody>
      </GlassForm>
    </BackgroundContainer>
  );
}




const BackgroundContainer = styled.div`
  position: relative;
  background-image: url(${xpwindows});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const GlassForm = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  width: 320px;
  border-radius: 6px;
  font-family: 'Press Start 2P', monospace;
  overflow: hidden;
`;

const TitleBar = styled.div`
  background-color: #0a246a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: #c0c0c0;
  border: 2px solid #000;
  font-size: 10px;
  font-family: 'Press Start 2P', monospace;
  cursor: pointer;
  padding: 2px 6px;

  &:hover {
    background-color: #a0a0a0;
  }
`;

const FormBody = styled.div`
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input {
      padding: 10px;
      border: 2px solid #000;
      background-color: rgba(255, 255, 255, 0.7);
      font-family: 'Press Start 2P', monospace;
    }

    button {
      padding: 10px;
      border: 2px solid #000;
      background-color: #c0c0c0;
      cursor: pointer;
      font-family: 'Press Start 2P', monospace;

      &:hover {
        background-color: #a0a0a0;
      }
    }
  }
`;

const ForgotPassword = styled.p`
  font-size: 16px;
  text-align: center;
  color: #0a246a;
 
  margin-top: 12px;
  cursor: pointer;

  &:hover {
    color:#0a246a;
     text-decoration: underline;
  }
`;

const SignUpLink = styled.p`
  font-size: 14px;
  text-align: center;
  color: rgb(249, 249, 251);
  margin-top: 10px;
  cursor: pointer;

  span {
   
    color: #0a246a;

    &:hover {
      color:#0a246a;
       text-decoration: underline;
    }
  }
`;

const XPButton = styled.button`
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;
  background: linear-gradient(to bottom, #dfdfdf, #bfbfbf);
  border: 2px solid #000;
  border-top-color: #fff;
  border-left-color: #fff;
  border-bottom-color: #808080;
  border-right-color: #808080;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #fff;

  &:hover {
    background: linear-gradient(to bottom, #bfbfbf, #dfdfdf);
  }

  &:active {
    box-shadow: inset 1px 1px 0 #000, inset -1px -1px 0 #fff;
    background: #a0a0a0;
  }
`;


export default Login;
