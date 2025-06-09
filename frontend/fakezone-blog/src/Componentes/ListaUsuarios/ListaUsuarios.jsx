import { useEffect, useState } from 'react';
import api from '../../Services/api'; 

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios/usuarios') 
      .then((res) => {
        setUsuarios(res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar usuários:', err);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            <strong>{user.nome_exibicao}</strong> (@{user.username}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;
