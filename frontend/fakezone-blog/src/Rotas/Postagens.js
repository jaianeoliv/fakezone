import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Categorias from "./Categorias";

function Postagens() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState('');
  const [categorias, setCategorias] = useState([]);

  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [usuarioId, setUsuarioId] = useState(1); 
  const [humorId, setHumorId] = useState(1);
  const [moods, setMoods] = useState([]);
  const [dropdownHumorAberto, setDropdownHumorAberto] = useState(false);
  const dropdownHumorRef = useRef(null);



  useEffect(() => {
    console.log("Categoria selecionada:", categoriaSelecionada);
  }, [categoriaSelecionada]);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  function handleClickFora(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownAberto(false);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagemSelecionada(file.name);
    }
  };


  useEffect(() => {
    async function fetchCategorias() {
      try {
        const resposta = await fetch("http://localhost:8000/api/categorias");
        const dados = await resposta.json();
        setCategorias(dados);
        console.log("Categorias recebidas:", dados);
      } catch (erro) {
        console.error("Erro ao buscar categorias:", erro);
      }
    }

    fetchCategorias();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const resposta = await fetch('http://localhost:8000/api/postagens');
        const dados = await resposta.json();
        console.log("Posts recebidos:", dados);
        setPosts(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error("Erro ao buscar posts:", erro);
      }
    }

    fetchPosts();
  }, []);


 
useEffect(() => {
  fetch('http://localhost:8000/api/moods')
    .then(res => res.json())
    .then(data => {
      console.log('Moods recebidos:', data); 
      setMoods(data);
    })
    .catch(error => console.error('Erro ao buscar moods:', error));
}, []);


  async function handlePublicar() {

    const token = localStorage.getItem('token');

    if (!titulo || !conteudo || !categoriaSelecionada) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:8000/api/postagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          conteudo,
          categorias_id: categoriaSelecionada.id,
          usuarios_id: usuarioId,
          moods_id: humorId,
        }),

      });

      if (resposta.ok) {
        const novoPost = await resposta.json();
        setPosts((prev) => [...prev, novoPost]);
        setMostrarForm(false);
        setTitulo('');
        setConteudo('');
        setImagemSelecionada('');
        alert("Post publicado com sucesso!");
      } else {
        alert("Erro ao criar post.");
      }
    } catch (erro) {
      console.error("Erro ao enviar:", erro);
    }
  }

  const fecharFormulario = () => setMostrarForm(false);

  const postsFiltrados = categoriaSelecionada && Array.isArray(posts)
    ? posts.filter(post => post.nome_categoria === categoriaSelecionada.nome)
    : [];



  return (
    <PageWrapper>
      <TituloBlog>📝 Postagens no Blog</TituloBlog>

      <Container>
        <Categorias
          categorias={categorias}
          onCategoriaClick={setCategoriaSelecionada}
          onCriarClick={() => setMostrarForm(true)}
        />

      </Container>

      {categoriaSelecionada && (
        <PostsSection>
          <FiltroInfo>
            Posts da categoria: <strong>{categoriaSelecionada.nome}</strong>
          </FiltroInfo>

          <PostsContainer>
            {postsFiltrados.length > 0 ? (
              postsFiltrados.map(post => (
                <PostCard key={post.id}>
                  <PostConteudo>
                    <PostTitulo>{post.titulo}</PostTitulo>
                    <PostTexto>{post.conteudo}</PostTexto>
                    <PostDetalhes>
                      Por: {post.nome_usuario || "Anônimo"}
                      <br />
                      Sentindo: {post.emoji} {post.descricao_humor}
                    </PostDetalhes>
                  </PostConteudo>
                </PostCard>
              ))
            ) : (
              <SemPosts>Nenhum post nessa categoria.</SemPosts>
            )}
          </PostsContainer>
        </PostsSection>
      )}


      {mostrarForm && (
        <BlurOverlay>
          <PopupWindow>
            <PopupHeader>
              <span>Nova Postagem</span>
              <PopupButtons>
                <button >_</button>
                <button onClick={fecharFormulario}>X</button>
              </PopupButtons>
            </PopupHeader>
            <PopupContent>
              <ImageUploadContainer>
                <label htmlFor="imageUpload">Selecionar imagem</label>
                <input type="file" id="imageUpload" onChange={handleImageChange} />
                {imagemSelecionada && <NomeArquivo>Imagem selecionada: {imagemSelecionada}</NomeArquivo>}
              </ImageUploadContainer>

              <label>Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <label>Conteúdo</label>
              <textarea
                rows="5"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
              <label>Se sentindo: </label>
<div style={{ position: "relative", width: "100%" }} ref={dropdownHumorRef}>
  <StyledButton
    type="button"
    onClick={() => setDropdownHumorAberto(!dropdownHumorAberto)}
    style={{ width: "100%", textAlign: "left" }}
  >
    {
      Array.isArray(moods)
        ? (
          moods.find(m => m.id === humorId)
            ? `${moods.find(m => m.id === humorId).emoji} ${moods.find(m => m.id === humorId).descricao}`
            : "Selecionar humor"
        )
        : "Selecionar humor"
    }
  </StyledButton>

  {dropdownHumorAberto && (
    <div style={{
      position: "absolute",
      top: "100%",
      left: 0,
      width: "100%",
      backgroundColor: "#fff",
      border: "1px solid #000",
      zIndex: 10,
      fontFamily: "'Press Start 2P', cursive",
      fontSize: "12px",
      padding: "5px",
      maxHeight: "200px",
      overflowY: "auto",
    }}>
      {moods.map(mood => (
        <div
          key={mood.id}
          onClick={() => {
            setHumorId(mood.id);
            setDropdownHumorAberto(false);
          }}
          style={{
            cursor: "pointer",
            padding: "4px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {mood.emoji} {mood.descricao}
        </div>
      ))}
    </div>
  )}
</div>
              <label>Categoria</label>
              <div style={{ position: "relative", width: "100%" }} ref={dropdownRef}>
                <StyledButton
                  type="button"
                  onClick={() => setDropdownAberto(!dropdownAberto)}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {categoriaSelecionada && categoriaSelecionada.nome
                    ? categoriaSelecionada.nome
                    : "Selecionar categoria"}
                </StyledButton>


                {dropdownAberto && (
                  <Dropdown>
                    {categorias.map((cat) => (
                      <DropdownItem
                        key={cat.id}
                        onClick={() => {
                          setCategoriaSelecionada(cat);
                          setDropdownAberto(false);
                        }}

                      >
                        {cat.nome}
                      </DropdownItem>

                    ))}
                  </Dropdown>
                )}


              </div>

              <StyledButton onClick={handlePublicar}>
                Publicar
              </StyledButton>
            </PopupContent>
          </PopupWindow>
        </BlurOverlay>
      )}

      <PostsSection>
        <FiltroInfo>📚 Todas as postagens</FiltroInfo>

        <PostsContainer>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id}>
                <PostConteudo>
                  <PostTitulo>{post.titulo}</PostTitulo>
                  <PostTexto>{post.conteudo}</PostTexto>
                  <PostDetalhes>
                    Por: {post.nome_exibicao|| "Anônimo"} <br />
                    Categoria: {post.nome_categoria} <br />
                    Se sentindo: {post.emoji} {post.descricao_humor}<br />
                    Em: {new Date(post.data_criacao).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </PostDetalhes>
                </PostConteudo>
              </PostCard>
            ))
          ) : (
            <SemPosts>Não há postagens ainda.</SemPosts>
          )}
        </PostsContainer>
      </PostsSection>

    </PageWrapper>
  );
}





const PageWrapper = styled.div`
  background: linear-gradient(135deg, #d4d4ff, #f0e0ff);
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Press Start 2P', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TituloBlog = styled.h1`
  font-size: 16px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 3px 3px #808080;
  padding: 10px 20px;
  margin-bottom: 30px;
  color: purple;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
`;





// Postagens
const PostsSection = styled.section`
  margin-top: 40px;
  width: 100%;
  max-width: 1000px; /* ou maior se quiser */
  margin-left: auto;
  margin-right: auto;
  font-family: 'Press Start 2P', monospace;
`;


const FiltroInfo = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  color: purple;
  font-weight: bold;
`;

const PostsContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PostCard = styled.div`
  display: flex;
  gap: 15px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  padding: 15px;
  border-radius: 6px;
  width: calc(33.333% - 13.33px);
  box-sizing: border-box;
`;


const PostImagem = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid #000;
  border-radius: 6px;
`;

const PostConteudo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const PostTitulo = styled.h3`
  margin: 0;
  font-size: 14px;
  color: purple;
`;

const PostTexto = styled.p`
  margin: 8px 0 12px 0;
  font-size: 10px;
  color: #222;
`;

const PostDetalhes = styled.div`
  font-size: 8px;
  color: #666;
`;

const SemPosts = styled.div`
  font-size: 12px;
  color: purple;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

///forms da postagem
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
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  label {
    font-size: 10px;
    color: purple;
  }

  input, textarea {
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    padding: 5px;
    border: 2px solid #000;
    background-color: #fff;
  }
`;

const StyledButton = styled.button`
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
  color: purple;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  label {
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    color: purple;
    padding: 6px 12px;
    background-color: #fff;
    border: 2px solid #000;
    box-shadow: 2px 2px #808080;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  input[type="file"] {
    display: none;
  }
`;

const NomeArquivo = styled.p`
  font-size: 12px;
  margin-top: 5px;
  color: #333;
  font-family: 'Press Start 2P', monospace;
`;


const Dropdown = styled.ul`
  position: absolute;
 
  right: 0;
  left: 0;
  max-height: 200px; 
  overflow-y: auto; 
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  list-style: none;
  padding: 10px;
  z-index: 100;

 
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border: 2px solid #000;
  }

  &::-webkit-scrollbar-thumb {
    background: purple;
    border: 2px solid #000;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7a007a;
  }
`;


const DropdownItem = styled.li`
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  padding: 5px;
  color: purple;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;





export default Postagens;
