import styled from "styled-components";
import Logo from '../Logo';
import NavBar from "../NavBar";
import IconesNavBar from "../IconesNavBar";
import Pesquisa from "../Pesquisa";



function Header({ onSearch }) {
    return (
        <HeaderContainer>
            <Icons>
                <Pesquisa onSearch={onSearch} />
                <IconesNavBar />
            </Icons>
            <Logo />
            <NavBar />

        </HeaderContainer>
    )
}



const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column; 
    align-items: center;
   
    
`;

const Icons = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-end;
    margin: 15px 120px 0 0;
    width: 100vw;
    
`



export default Header