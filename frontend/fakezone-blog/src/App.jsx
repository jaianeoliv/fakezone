  import React from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';

  import Home from './Rotas/Home';
  import Postagens from './Rotas/Postagens';
  import Ideias from './Rotas/Ideias';
  import Sobre from './Rotas/Sobre';
  import Login from './Rotas/Login';
  import Cadastro from './Rotas/Cadastro';
  import Perfil from './Rotas/Perfil';

  import LayoutComum from './Componentes/LayoutComum';
  import { AuthProvider } from './Contexts/AuthContext';


  function App() {
    return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas sem Navbar */}
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastro />} />

          {/* Rotas com Navbar */}
          <Route element={<LayoutComum />}>
          
            <Route path="/" element={<Home />} />
            <Route path="/postagens" element={<Postagens />} />
            <Route path="/ideias" element={<Ideias />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    );
  }

  export default App;
