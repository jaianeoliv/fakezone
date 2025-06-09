import styled from "styled-components";
import logo from '../../Assets/logo-v2.png'


function Header({ onSearch }) {
    return (
        <HeaderContainer>
            <LogoImg
                src={logo}
                alt='logo'
            />
        </HeaderContainer>
    )
}

const LogoImg = styled.img`
    height: 160px;
    width: 160px;

`

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column; 
    align-items: center;
   
    
`;





export default Header