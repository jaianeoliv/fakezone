const db = require("./db");

async function getTodasCategorias() {
  const [rows] = await db.execute('SELECT * FROM categorias');
  return rows;
}

module.exports = {
  getTodasCategorias
};