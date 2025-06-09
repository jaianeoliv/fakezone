const { getTodasCategorias } = require("../servicos/categorias");

function listarCategorias(req, res) {
  getTodasCategorias((err, categorias) => {
    if (err) {
      console.error("Erro ao buscar categorias:", err);
      res.status(500).send("Erro ao buscar categorias");
    } else {
      res.json(categorias);
    }
  });
}

module.exports = {
  listarCategorias,
};
