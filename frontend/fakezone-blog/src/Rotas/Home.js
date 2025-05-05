import styled from 'styled-components';
import MainPage from '../Componentes/MainPage/index';
import { useState } from 'react';
import { categorias, posts } from '../Componentes/Pesquisa/dadosPesquisa';


const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
` 
//background-color: #F1F0E8;

function Home() {
  const [termoBusca, setTermoBusca] = useState(""); 

  return (
    <AppContainer>
      
      
      <MainPage termoBusca={termoBusca} categorias={categorias} posts={posts} />
     
    </AppContainer>
  );
}

export default Home
