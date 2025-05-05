import React from "react";
import styled from "styled-components";

function Postagens() {
  return (
    <XPWindow>
      <TitleBar>
        <h2>Crie uma nova postagem</h2>
        <StyledButton>Criar</StyledButton>
      </TitleBar>
    </XPWindow>
  );
}

const XPWindow = styled.div`
  max-width: 600px;
  margin: 20px auto;
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
  justify-content: center; 
  align-items: center;
  text-align: center;
   gap:20px;
 

  h2 {
    width: 100%; 
    margin: 0;
  }

  button {
    font-family: 'Press Start 2P', monospace;
    font-size: 12px;
    width: 30%; 
    padding: 10px 20px;
    background-color: #fff;
    color: purple;
    border: 2px solid #000;
    box-shadow: 2px 2px #808080;
    cursor: pointer;
  }

  button:hover {
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
export default Postagens;
