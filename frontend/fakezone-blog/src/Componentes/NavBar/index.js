import { Link } from 'react-router-dom';
import styled from "styled-components";
import IconesNavBar from '../IconesNavBar/index';

const textoOpcoes = ['Home', 'Postagens', 'Ideias', 'Sobre'];

function NavBar() {
    return (
        <NavContainer>
            <NavWindow>
                <ConteudoNav>
                    <Opcoes>
                        {textoOpcoes.map((texto) => (
                            <Opcao key={texto}>
                                <LinkStyled to={texto === 'Home' ? '/' : `/${texto.toLowerCase()}`}>
                                    {texto}
                                </LinkStyled>
                            </Opcao>
                        ))}
                    </Opcoes>
                    <IconesNavBar />
                </ConteudoNav>
            </NavWindow>
        </NavContainer>
    );
}

const NavContainer = styled.nav`
    width: 100%;
    background-color: #c0c0c0;
    padding: 0;
    margin: 0;
`;

const NavWindow = styled.div`
    width: 100%;
    border: 2px solid #000;
    background-color: #e0e0e0;
    box-shadow: inset -2px -2px #fff, inset 2px 2px #808080;
    font-family: 'Press Start 2P', monospace;
    padding: 10px 20px;
    box-sizing: border-box;
`;

const ConteudoNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Opcoes = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  gap: 30px;
`;


const Opcao = styled.li`
    font-size: 18px;
    cursor: pointer;

    &:hover {
        color: #0000aa;
        text-decoration: underline;
    }
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: #000;
`;

export default NavBar;
