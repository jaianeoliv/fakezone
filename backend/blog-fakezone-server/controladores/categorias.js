const { getTodasCategorias } = require("../servicos/categorias");

async function listarCategorias(req, res) {
  try {
    const categorias = await getTodasCategorias();
    res.json(categorias);
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    res.status(500).send("Erro ao buscar categorias");
  }
}

module.exports = {
  listarCategorias,
};
