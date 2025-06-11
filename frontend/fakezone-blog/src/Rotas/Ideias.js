import styled from "styled-components";



function Ideias() {
  return (
    <PageWrapper>
    <Titulo>💡 Ideias</Titulo>
    </PageWrapper>
  )
  
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

const Titulo = styled.h1`
  font-size: 16px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 3px 3px #808080;
  padding: 10px 20px;
  margin-bottom: 30px;
  color: purple;
`;

export default Ideias;