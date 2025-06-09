import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import xpwindows from '../Assets/xpwindows.jpg';
import axios from 'axios';

function Cadastro() {
  const [nome_exibicao, setNomeExibicao] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [biografia, setBiografia] = useState('');
  const [imagem, setImagem] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      console.log({ nome_exibicao, username, email, senha, biografia, imagem, data_nascimento });

      function converterDataBRParaISO(dataBR) {
        const partes = dataBR.split('/');
        if (partes.length !== 3) return null;
        const [dia, mes, ano] = partes;
        return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      }

      const dataNascimentoISO = converterDataBRParaISO(data_nascimento);

      await axios.post('http://localhost:8000/api/usuarios/cadastro', {
        nome_exibicao,
        username,
        email,
        senha,
        biografia,
        imagem,
        data_nascimento: dataNascimentoISO
      });


      alert('Usuário cadastrado com sucesso!');
      navigate('/entrar');
    } catch (err) {
      console.error('Erro ao cadastrar:', err.response?.data || err.message);

      alert(err.response?.data?.mensagem || 'Erro ao cadastrar usuário.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImagem(imageUrl);
    }
  };

  const handleDataNascimentoChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    setDataNascimento(value);
  };

  return (
    <BackgroundContainer>
      <GlassForm>
        <TitleBar>
          <Title>Criar Conta</Title>
          <CloseButton onClick={() => navigate('/')}>X</CloseButton>
        </TitleBar>
        <FormBody>
          <form onSubmit={handleCadastro}>
            <ImageUploadContainer>
              <ImagePreview htmlFor="imagemInput">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" />
                ) : (
                  <span>Foto de perfil</span>
                )}
              </ImagePreview>
              <input
                id="imagemInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </ImageUploadContainer>

            <input
              type="text"
              placeholder="nome"
              value={nome_exibicao}
              onChange={(e) => setNomeExibicao(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="emailsupersecreto@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="data de nascimento (dd/mm/aaaa)"
              value={data_nascimento}
              onChange={handleDataNascimentoChange}
              maxLength={10}
              required
            />

            <textarea
              placeholder="biografia (opcional)"
              rows={3}
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
            />

            <XPButton type="submit">Criar Conta</XPButton>
          </form>
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
    width: 340px;
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
    font-size: 16px;
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
      gap: 12px;

      input,
      textarea {
        padding: 10px;
        border: 2px solid #000;
        background-color: rgba(255, 255, 255, 0.7);
        font-family: 'Press Start 2P', monospace;
        resize: none;
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

const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input[type='file'] {
      display: none;
    }
  `;

const ImagePreview = styled.label`
    width: 100px;
    height: 100px;
    background-color: #d3d3d3;
    border: 2px solid #000;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    color: #000;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      background-color: #a0a0a0;
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


export default Cadastro;
