const express = require("express")
const rotaPostagem = require("./rotas/postagem") 

const app = express()
app.use(express.json()) 

app.use('/postagens', rotaPostagem)
const port = 8000

app.listen(port, () => {
    console.log(`escutando a porta ${port}`)
})
