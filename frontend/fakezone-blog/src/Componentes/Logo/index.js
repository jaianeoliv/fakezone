import styled from "styled-components"
import logo from '../../Assets/logo-v2.png'


function Logo() {
    return (
        <LogoContainer>
            <LogoImg
                src={logo}
                alt='logo'
            />
            
        </LogoContainer>
        
    )
}

const LogoImg= styled.img`
    height: 160px;
    width: 160px;

`

const LogoContainer = styled.div`
    display: flex;

`



export default Logo