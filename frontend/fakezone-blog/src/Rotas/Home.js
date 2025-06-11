import styled from 'styled-components';
import MainPage from '../Componentes/MainPage/index';




const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
` 
//background-color: #F1F0E8;

function Home() {
 
  return (
    <AppContainer>
      
      
      <MainPage  />
     
    </AppContainer>
  );
}

export default Home
