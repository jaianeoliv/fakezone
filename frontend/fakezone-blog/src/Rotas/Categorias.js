import React, { useState } from "react";
import styled from "styled-components";

function Categorias({ onCategoriaClick, onCriarClick }) {
  const categorias = [
    "Inspiração", "Leituras", "Games", "Filmes", "Séries", "Animes",
    "Mangás", "Reflexões", "Ideias Soltas", "Criatividade", "DevLogs", "Random", "Pessoal"
  ];

  return (
    <XPWindow>
      <TitleBar>
        <h2>Criar uma nova postagem</h2>
        <StyledButton onClick={onCriarClick}>Criar Post</StyledButton>
      </TitleBar>

      <CategoriaLista>
        {categorias.map((cat, index) => (
          <CategoriaBotao key={index} onClick={() => onCategoriaClick(cat)}>
            {cat}
          </CategoriaBotao>
        ))}
      </CategoriaLista>
    </XPWindow>
  );
}

const XPWindow = styled.div`
  max-width: 700px;
  border: 2px solid #000;
  background-color: #e0e0e0;
  box-shadow: inset -2px -2px #fff, inset 2px 2px #808080;
  font-family: 'Press Start 2P', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TitleBar = styled.div`
  background-color: purple;
  color: white;
  padding: 20px;
  font-size: 20px;
  border-bottom: 2px solid #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  h2 {
    margin: 0;
    font-size: 16px;
    text-align: center;
  }
`;

const CategoriaLista = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const CategoriaBotao = styled.button`
  background-color: #fff;
  padding: 8px 12px;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  font-size: 10px;
  color: purple;
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledButton = styled.button`
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  padding: 10px 20px;
  background-color: #fff;
  color: purple;
  border: 2px solid #000;
  box-shadow: 2px 2px #808080;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Categorias;
