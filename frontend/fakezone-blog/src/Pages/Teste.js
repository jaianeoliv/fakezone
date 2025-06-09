import { useEffect, useState } from 'react';
import api from '../Services/api';

function Teste() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios') 
      .then((res) => {
        console.log("🔍 Dados recebidos:", res.data);
        setUsuarios(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuários", err);
      });
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            {user.nome_exibicao} (@{user.username})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teste;
