const express = require('express');
const bodyParser = require('body-parser');
const postagemRoutes = require('./rotas/postagem');

const app = express();

app.use(bodyParser.json());


app.use('/postagem', postagemRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
