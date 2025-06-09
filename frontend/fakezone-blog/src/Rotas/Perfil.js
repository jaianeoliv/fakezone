import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import styled from 'styled-components';
import { useAuth } from '../Contexts/AuthContext';
import { FaEdit } from 'react-icons/fa';
import { emojis } from '../Componentes/Utils/emojisLista';

const Perfil = () => {
  const { usuario } = useAuth();

  const [emoji, setEmoji] = useState(() => {
    return localStorage.getItem('perfilEmoji') || usuario?.emoji || '😀';
  });

  const [editando, setEditando] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [fotoNome, setFotoNome] = useState('');

  const [formData, setFormData] = useState(() => ({
    nome_exibicao: localStorage.getItem('perfilNomeExibicao') || usuario?.nome_exibicao || '',
    email: usuario?.email || '',
    senha: '',
    bio: localStorage.getItem('perfilBio') || usuario?.biografia || '',
    foto: usuario?.foto || '',
    emoji: localStorage.getItem('perfilEmoji') || usuario?.emoji || '😀',
  }));

  // Sincroniza formData e emoji sempre que usuario mudar (ex: recarregar, login)
  useEffect(() => {
    if (usuario) {
      setFormData({
        nome_exibicao: usuario.nome_exibicao || '',
        email: usuario.email || '',
        senha: '',
        bio: localStorage.getItem('perfilBio') || usuario.biografia || '',
        foto: usuario.foto || '',
        emoji: localStorage.getItem('perfilEmoji') || usuario.emoji || '😀',
      });
      setEmoji(usuario.emoji || '😀');
    }
  }, [usuario]);

  // Atualiza localStorage sempre que emoji mudar
  useEffect(() => {
    localStorage.setItem('perfilEmoji', emoji);
  }, [emoji]);

  // Atualiza localStorage sempre que bio mudar
  useEffect(() => {
    localStorage.setItem('perfilBio', formData.bio);
  }, [formData.bio]);

  // Atualiza localStorage sempre que nome_exibicao mudar
  useEffect(() => {
    localStorage.setItem('perfilNomeExibicao', formData.nome_exibicao);
  }, [formData.nome_exibicao]);

  if (!usuario) {
    return <Navigate to="/" replace />;
  }


  const defaultPhotoUrl = `https://robohash.org/${usuario.username}.png?set=cat`;

  const handleInputChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEmojiClick = (emj) => {
    setEmoji(emj);
    setFormData((f) => ({ ...f, emoji: emj }));
    setMostrarDropdown(false);
  };

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoNome(file);
      // upload real depois, se quiser
    }
  };

  const salvarEdicao = (e) => {
    e.preventDefault();

    console.log('Salvando dados:', formData);

    // Atualiza o emoji no estado principal
    setEmoji(formData.emoji);

    // Atualiza localStorage com o nome de exibição, bio e emoji
    localStorage.setItem('perfilNomeExibicao', formData.nome_exibicao);
    localStorage.setItem('perfilBio', formData.bio);
    localStorage.setItem('perfilEmoji', formData.emoji);

    // Atualiza o objeto usuario para refletir mudanças locais
    usuario.biografia = formData.bio;
    usuario.nome_exibicao = formData.nome_exibicao;
    usuario.email = formData.email;
    usuario.emoji = formData.emoji;

    if (fotoNome) {
      usuario.foto = URL.createObjectURL(fotoNome);
    }

    setEditando(false);
  };

  return (
    <PerfilContainer>
      <Titulo>Zona terrestre de @{usuario.username}</Titulo>

      <Container>
        <ProfileBox>
          <LeftSide>
            <UserPhoto
              src={fotoNome ? URL.createObjectURL(fotoNome) : (usuario.foto || defaultPhotoUrl)}
              alt="Foto de perfil"
            />
            <EmojiBadge onClick={() => setMostrarDropdown((prev) => !prev)}>
              {emoji}
              {mostrarDropdown && (
                <Dropdown>
                  {emojis.map((emj, i) => (
                    <DropdownItem key={i} onClick={() => handleEmojiClick(emj)}>
                      {emj}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </EmojiBadge>
            <DisplayName>{formData.nome_exibicao}</DisplayName>
            <Username>@{usuario.username}</Username>
          </LeftSide>

          <RightSide>
            <Bio>{formData.bio}</Bio>

            <StyledButton onClick={() => setEditando(true)}>
              <FaEdit /> Editar perfil
            </StyledButton>
          </RightSide>
        </ProfileBox>
      </Container>

      {editando && (
        <BlurOverlay>
          <PopupWindow>
            <PopupHeader>
              Editar perfil
              <PopupButtons>
                <button onClick={() => setEditando(false)}>X</button>
              </PopupButtons>
            </PopupHeader>

            <form onSubmit={salvarEdicao}>
              <PopupContent>
                <label>Nome de exibição</label>
                <input name="nome_exibicao" value={formData.nome_exibicao} onChange={handleInputChange} />

                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleInputChange} />

                <label>Senha (nova)</label>
                <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} />

                <label>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} />

                <ImageUploadContainer>
                  <label htmlFor="upload">📷 Trocar foto</label>
                  <input type="file" id="upload" accept="image/*" onChange={handleFotoUpload} />
                  {fotoNome && <NomeArquivo>{fotoNome.name}</NomeArquivo>}
                </ImageUploadContainer>

                <StyledButton type="submit">Salvar</StyledButton>
              </PopupContent>
            </form>
          </PopupWindow>
        </BlurOverlay>
      )}
    </PerfilContainer>
  );
};

export default Perfil;


// ======== STYLED COMPONENTS =========

const PerfilContainer = styled.div`
  background: linear-gradient(135deg, #d4d4ff, #f0e0ff);
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h1`
  font-size: 16px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 3px 3px #808080;
  padding: 10px 20px;
  margin-bottom: 30px;
  color: purple;
  font-family: 'Press Start 2P', monospace;
  text-align: center;
  width: fit-content;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 4px 4px #808080;
  padding: 30px 40px;
  display: flex;
  flex-direction: row;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border: 3px solid #000;
  box-shadow: 4px 4px #555;
  object-fit: cover;
  background-color: #fff;
`;

const EmojiBadge = styled.div`
  font-size: 30px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  padding: 5px 10px;
  margin-top: -20px;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  user-select: none;
`;

const DisplayName = styled.p`
  font-size: 24px;
  margin: 5px 0;
  color: purple;
  font-weight: bold;
`;

const Username = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
`;

const RightSide = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Bio = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const Redes = styled.div`
  font-size: 12px;
  color: purple;
  margin-bottom: 20px;

  p {
    margin-bottom: 6px;
  }
`;

const StyledButton = styled.button`
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  padding: 10px;
  background-color: #fff;
  color: purple;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  cursor: pointer;
  width: 150px;
  align-self: flex-end;

  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const PopupWindow = styled.div`
  width: 400px;
  background-color: #e0e0e0;
  border: 2px solid #000;
  box-shadow: 4px 4px #555;
  padding: 0;
  font-family: 'Press Start 2P', monospace;
`;

const PopupHeader = styled.div`
  background-color: purple;
  color: white;
  padding: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopupButtons = styled.div`
  button {
    background: #fff;
    border: 1px solid #000;
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    margin-left: 5px;
    cursor: pointer;
    padding: 2px 8px;
    box-shadow: 2px 2px #808080;

    &:hover {
      background: #ddd;
    }
  }
`;

const PopupContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 9px;
  }

  input,
  textarea {
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    padding: 6px;
    border: 2px solid #000;
    box-shadow: 2px 2px #808080;
    outline: none;
    resize: none;
  }

  textarea {
    height: 60px;
  }
`;

const ImageUploadContainer = styled.div`
  margin-top: 5px;

  label {
    cursor: pointer;
    font-size: 12px;
    color: purple;
    user-select: none;
  }

  input[type='file'] {
    display: none;
  }
`;

const NomeArquivo = styled.span`
  font-size: 10px;
  margin-left: 10px;
  color: #555;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 3px 3px #808080;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  z-index: 100;
  width: 220px; /* largura fixa */
  max-height: 160px; /* altura fixa com scroll */
  overflow-y: auto; /* scroll vertical */
  user-select: none;

  /* Barra de scroll estilo retrô */
  &::-webkit-scrollbar {
    width: 12px;
    background: #eee;
    border: 2px solid #000;
    border-left: none;
  }

  &::-webkit-scrollbar-thumb {
    background: purple;
    border: 2px solid #000;
    box-shadow: 1px 1px #555 inset;
    border-radius: 4px;
  }

  scrollbar-width: thin;
  scrollbar-color: purple #eee;
`;


const DropdownItem = styled.div`
  font-size: 22px;
  cursor: pointer;
  text-align: center;
  user-select: none;

  &:hover {
    background-color: #f0e0ff;
  }
`;
