import React from "react";
import styled from "styled-components";
import Head from '../Head';

const MainPage = ({ termoBusca, categorias, posts }) => {
    console.log("🔍 Termo de busca:", termoBusca);
    console.log("📂 Categorias:", categorias);
    console.log("📝 Posts:", posts);

    // filtra categorias e posts conforme a busca
    const resultados = [...new Set([...categorias, ...posts].map(item => JSON.stringify(item)))].map(str => JSON.parse(str)).filter(item => item.nome.toLowerCase().includes(termoBusca.toLowerCase()));

    console.log("🎯 Resultados filtrados:", resultados);

    return (
        <MainContainer>
            <Head />
            
            {termoBusca && (
                <ResultadosContainer>
                    {resultados.length === 0 ? (
                        <p>Nenhum resultado encontrado.</p>
                    ) : (
                        resultados.map((item, index) => (
                            <Resultado key={`${item.id}-${index}`}>{item.nome}</Resultado>
                        ))
                    )}
                </ResultadosContainer>
            )}

           
        </MainContainer>
    );
};

const MainContainer = styled.section`
  
`;

const Resultado = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ResultadosContainer = styled.section`
  margin-top: 20px; 
  padding: 10px;
  border-top: 2px solid #ccc;
`;





export default MainPage;
