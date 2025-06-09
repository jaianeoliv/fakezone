const express = require("express");
const router = express.Router();
const { listarCategorias } = require("../controladores/categorias");

router.get("/", listarCategorias);

module.exports = router;
