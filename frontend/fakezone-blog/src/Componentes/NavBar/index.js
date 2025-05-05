import { Link } from 'react-router-dom';
import styled from "styled-components";

const textoOpcoes = ['Home', 'Postagens', 'Categorias', 'Ideias', 'Sobre'];

function NavBar() {
    return (
        <NavContainer>
            <OpcoesWrapper>
                <Opcoes>
                    {textoOpcoes.map((texto) => (
                        <Opcao key={texto}>
                            <LinkStyled to={texto === 'Home' ? '/' : `/${texto.toLowerCase()}`}>
                                {texto}
                            </LinkStyled>
                        </Opcao>
                    ))}
                </Opcoes>
            </OpcoesWrapper>
        </NavContainer>
    )
}

const NavContainer = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    background: white;
`;

const OpcoesWrapper = styled.div`
    width: 100%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
`;

const Opcoes = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; 
    list-style: none;
    background: #FFFFFF;
    margin: 0;
`;

const Opcao = styled.li`
    color: #2d2d34;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;

    &:hover {
        color: rgb(101, 101, 116);
    }
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export default NavBar;
