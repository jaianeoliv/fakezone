import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import menu from '../../Assets/menu.png';
import search from '../../Assets/search.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';



function IconesNavBar() {
    const { usuario, logout } = useAuth();

    const [menuAberto, setMenuAberto] = useState(false);
    const [mostrarBusca, setMostrarBusca] = useState(false);
    const menuRef = useRef(null);
    const buscaRef = useRef(null);

    const toggleBusca = () => {
        setMostrarBusca((prev) => {
            if (!prev) setMenuAberto(false);
            return !prev;
        });
    };

    const handleMenuClick = () => {
        setMenuAberto((prev) => {
            if (!prev) setMostrarBusca(false);
            return !prev;
        });
    };



    useEffect(() => {
        function handleClickFora(event) {
            if (
                buscaRef.current && !buscaRef.current.contains(event.target) &&
                menuRef.current && !menuRef.current.contains(event.target)
            ) {
                setMostrarBusca(false);
                setMenuAberto(false);
            }
        }

        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, []);

    return (
        <Container>
            <Icones>
                <Icone ref={buscaRef}>
                    <img src={search} alt="ícone de busca" onClick={toggleBusca} />
                    {mostrarBusca && (
                        <SearchBox>
                            <input type="text" placeholder="Buscar..." />
                        </SearchBox>
                    )}
                </Icone>

                <Icone ref={menuRef}>
                    <img src={menu} alt="ícone de menu" onClick={handleMenuClick} />
                    {menuAberto && (
                        <Dropdown>
                            {usuario ? (
                                <>
                                    <DropdownItem>
                                        <StyledLink to="/perfil">
                                            Oi, {usuario.nome_exibicao || usuario.username}!
                                        </StyledLink>

                                    </DropdownItem>

                                    <DropdownItem>
                                        <StyledLink to="/solicitar-nave">Solicitar Nave 🛸</StyledLink>
                                    </DropdownItem>

                                    <DropdownItem onClick={logout} to="/">Sair</DropdownItem>
                                </>
                            ) : (
                                <>
                                    <DropdownItem>
                                        <StyledLink to="/entrar">Entrar</StyledLink>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <StyledLink to="/cadastrar">Cadastrar</StyledLink>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <StyledLink to="/solicitar-nave">Solicitar Nave 🛸</StyledLink>
                                    </DropdownItem>
                                </>
                            )}
                        </Dropdown>
                    )}


                </Icone>
            </Icones>
        </Container>
    );
}


const Container = styled.div`
    position: relative;
    
`;

const SearchBox = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #e0e0e0;
  border: 2px solid #000;
  box-shadow: inset -2px -2px #fff, inset 2px 2px #808080;
  padding: 6px;
  z-index: 99;

  input {
    font-family: 'Press Start 2P', monospace;
    font-size: 12px;
    padding: 4px;
    width: 160px;
    border: 2px solid #000;
    background-color: #fff;
    box-shadow: inset -1px -1px #fff, inset 1px 1px #808080;
    outline: none;
  }
`;


const Icones = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-left: 6px;
`;

const Icone = styled.li`
    position: relative;
    display: flex;
    cursor: pointer;
    list-style-type: none;

    img {
        width: 20px;
        height: 20px;
    }
`;

const Dropdown = styled.ul`
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    border: 2px solid #000;
    box-shadow: 2px 2px #808080;
    list-style: none;
    padding: 10px;
    z-index: 100;
`;

const DropdownItem = styled.li`
    font-family: 'Press Start 2P', monospace;
    font-size: 14px;
    padding: 5px 10px;
    color: purple;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: purple;
  display: block;
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }
`;


export default IconesNavBar;
