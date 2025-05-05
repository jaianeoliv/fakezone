const express = require("express")
const rotaPostagem = require("./rotas/postagem") 
const rotaUsuario = require("./rotas/usuarios");

const app = express()
app.use(express.json()) 

app.use('/api/postagens', rotaPostagem)
app.use('/api/usuarios', rotaUsuario);
const port = 8000

app.listen(port, () => {
    console.log(`escutando a porta ${port}`)
})
