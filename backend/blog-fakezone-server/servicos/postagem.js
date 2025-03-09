const fs = require("fs")

function getTodasPostagens() {
    return JSON.parse(fs.readFileSync("postagens.json"))
}

function getPostagemPorId(id) {
    const postagens = JSON.parse(fs.readFileSync("postagens.json"))
    const postagemFiltrada = postagens.filter( postagem => postagem.id === id) [0]
    return postagemFiltrada
    
}

function inserePostagem(postagemNova) {
    const postagens = JSON.parse(fs.readFileSync("postagens.json"))
    const novaListaDePostagens = [...postagens, postagemNova]
    fs.writeFileSync("postagens.json", JSON.stringify(novaListaDePostagens))
    
}

module.exports = {
    getTodasPostagens,
    getPostagemPorId,
    inserePostagem
}