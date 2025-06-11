import styled from "styled-components";
import cover from "../../Assets/selfparking-v3.png";
import { useNavigate } from 'react-router-dom';
import xpwindows from '../../Assets/xpwindows.jpg';
import { useAuth } from '../../Contexts/AuthContext';

const HeadMain = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const handleClick = () => {
    if (usuario) {
      navigate('/postagens'); 
    } else {
      navigate('/entrar');
    }
  };

  return (
    <HeadContainer>
      <Content>
        <TitleBar>Bem-vindo à nave</TitleBar>
        <InnerContent>
          <h1>Olá Terráqueos</h1>
          <p>Explore e compartilhe ideias incríveis!</p>
          <XPButton onClick={handleClick}>
            {usuario ? 'Desabafo do Dia' : 'Entrar'}
          </XPButton>
        </InnerContent>
      </Content>

      <Image src={cover} alt="Imagem da página principal" />
    </HeadContainer>
  );
};
const HeadContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 40px 0;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  text-align: center;

  background-image: url(${xpwindows});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); 
    z-index: 1;
  }


  & > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;


const Image = styled.img`
    flex: 1;
   
    max-width: 60%;
    height: auto;
    object-fit: contain;
    display: block;

    @media (max-width: 768px) {
        max-width: 100%;
        width: 100%;
    }
`;



const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  padding: 0;
  color: black;
  max-width: 500px;
  background: rgba(240, 240, 255, 0.5); 
  backdrop-filter: blur(4px);
  border-radius: 4px;
  border: 2px solid #000;
  box-shadow: inset -2px -2px #fff, inset 2px 2px #808080;
  overflow: hidden;
  font-family: 'Tahoma', sans-serif;
`;

const TitleBar = styled.div`
  background: #0a246a;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerContent = styled.div`
  padding: 16px;

  button {
      padding: 5px;
      border: 2px solid #000;
      background-color: #c0c0c0;
      cursor: pointer;
      font-family: 'Press Start 2P', monospace;

      &:hover {
        background-color: #a0a0a0;
      }

  h1 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
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



export default HeadMain;
