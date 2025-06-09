const express = require("express");
const cors = require('cors');
const rotaUsuarios = require("./rotas/usuarios");
const rotaPostagem = require("./rotas/postagem");
const rotaCategorias = require("./rotas/categorias");

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/api/usuarios', rotaUsuarios);
app.use('/api/postagens', rotaPostagem);
app.use("/api/categorias", rotaCategorias);

const port = 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
