import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import menu from '../../Assets/menu.png';
import search from '../../Assets/search.png';

function IconesNavBar() {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    const handleMenuClick = () => {
        setMenuAberto((prev) => !prev);
    };

    useEffect(() => {
        function handleClickFora(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        }

        document.addEventListener('mousedown', handleClickFora);

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    return (
        <Container ref={menuRef}>
            <Icones>
                <Icone>
                    <img src={search} alt='ícone de busca' />
                </Icone>
                <Icone onClick={handleMenuClick}>
                    <img src={menu} alt='ícone de menu' />
                    {menuAberto && (
                        <Dropdown>
                            <DropdownItem>Entrar</DropdownItem>
                            <DropdownItem>Cadastrar</DropdownItem>
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

export default IconesNavBar;
