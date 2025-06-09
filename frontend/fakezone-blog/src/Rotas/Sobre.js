  import React from "react";
  import styled from "styled-components";
  import Danger from "../Assets/danger.png";

const Sobre = () => {
  return (
    <PageWrapper>
    <Container>
    
      <MainContent>
        <XPWindow>
          <TitleBar>💾 Sobre</TitleBar>
          <Content>
            <h2>Hello Hello</h2>
            <p>
              Ooieee! Me chamo Jay, tenho 23 anos e sou estudante de
              programação. Apaixonada por interfaces com personalidade, aliens,
              gatinhos e filmes de terror.
            </p>

            <h2>Sobre o Projeto</h2>
            <p>
              Este blog faz parte do projeto de conclusão do meu curso de
              Análise e Desenvolvimento de Sistemas, e também uma homenagem à
              estética do Windows XP, misturando criatividade e código moderno
              com o charme dos anos 2000.
            </p>
            <p>
              Ainda está em fase inicial e tem muuuuita coisa que eu quero
              adicionar futuramente. Terá essa pegada meio Alien, meio zona de
              perigo (área 51), meio série Brilhante Victória. Espero que goste
              da estadia, estarei dando sempre meu máximo para que fique do meu
              jeitinho.
              <br />
              Afinal, esse é minha Zona! :)
            </p>
            <img src={Danger} alt="ícone de Alien" />
          </Content>
        </XPWindow>

        <SideContent>
          <XPWindow>
            <TitleBar>⚙️ Tecnologias Usadas</TitleBar>
            <Content>
              <ul>
                <li>Node.js</li>
                <li>React</li>
                <li>Styled-components</li>
                <li>MySQL</li>
              </ul>
            </Content>
          </XPWindow>

          <XPWindow>
            <TitleBar>📧 Contato</TitleBar>
            <Content>
              <p>
                Sinta-se à vontade para entrar em contato comigo pelo e-mail:{" "}
                <a href="mailto:jaiane.liv02@gmail.com">emailsupersecreto@gmail.com</a>
              </p>
            </Content>
          </XPWindow>
        </SideContent>
      </MainContent>
    </Container>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background: linear-gradient(135deg, #d4d4ff, #f0e0ff);
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Press Start 2P', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`

  max-width: 1000px;
  margin: 40px auto;
`;


const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px; 
`;


const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 48%;
`;

const XPWindow = styled.div`
  max-width: 100%;
  margin: 20px 0;
  border: 2px solid #000;
  background-color: #e0e0e0;
  box-shadow: inset -2px -2px #fff, inset 2px 2px #808080;
  font-family: 'Press Start 2P', monospace;
`;

const TitleBar = styled.div`
  background-color: purple;
  color: white;
  padding: 10px;
  font-size: 20px;
  border-bottom: 2px solid #000;
`;

const Content = styled.div`
  padding: 20px;
  color: #000;

  h2 {
    margin-top: 20px;
    font-size: 18px;
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    margin-top: 10px;
  }

  ul {
     font-family: 'Press Start 2P', monospace; 
    font-size: 16px;
    list-style-type: disc; 
    padding-left: 20px; 
  }

  a {
    color: purple;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default Sobre;
