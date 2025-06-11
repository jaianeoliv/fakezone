import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {

    const userStorage = localStorage.getItem('usuario');
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  function login(usuario, token) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    setUsuario(usuario);
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); 
    localStorage.removeItem('perfilEmoji'); 
    localStorage.removeItem('perfilBio');   
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
