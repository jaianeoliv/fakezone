import styled from "styled-components";
import Input from "../Input";
import { useState } from "react";



function Pesquisa({ onSearch }) {
    const [termoBusca, setTermoBusca] = useState("");

    const handleChange = (e) => {
        setTermoBusca(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
        
    };

    return (
        <PesquisaContainer>
            <Input
                placeholder="Procurando algum tema?"
                value={termoBusca}
                onChange={handleChange}
            />
        </PesquisaContainer>
    );
}

const PesquisaContainer = styled.section``;

export default Pesquisa;