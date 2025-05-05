import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Rotas/Home';
import Postagens from './Rotas/Postagens';
import Categorias from './Rotas/Categorias';
import Ideias from './Rotas/Ideias';
import Sobre from './Rotas/Sobre';
import Header from './Componentes/Header';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';



const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
   
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    overflow-x: hidden;
  }
   
`;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postagens" element={<Postagens />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ideias" element={<Ideias />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
