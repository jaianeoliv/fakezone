import React from "react";
import styled from "styled-components";
import cover from "../../Assets/selfparking-v3.png";
import { XPButton } from '../XPButton';
import xpwindows from '../../Assets/xpwindows.jpg';



const HeadMain = () => {
    return (
        <HeadContainer>
            <Content>
                <TitleBar>
                    Bem-vindo à nave
                </TitleBar>
                <InnerContent>
                    <h1>Olá Terráqueos</h1>
                    <p>Explore e compartilhe ideias incríveis!</p>
                    <XPButton>Entrar</XPButton>
                </InnerContent>
            </Content>
            
            <Image src={cover} alt="Imagem da página principal" />
        </HeadContainer>
    );
}
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
  background: #1700d1;
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

  h1 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`;




export default HeadMain;
