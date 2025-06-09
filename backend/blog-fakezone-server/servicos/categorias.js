const db = require("./db");

function getTodasCategorias(callback) {
  const sql = "SELECT id, nome FROM categorias";
  db.query(sql, callback);
}

module.exports = {
  getTodasCategorias,
};
