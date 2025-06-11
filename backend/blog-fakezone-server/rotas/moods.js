const db = require("../servicos/db");
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM moods');
    res.json(rows);  
  } catch (error) {
    console.error('Erro ao buscar moods:', error);
    res.status(500).json({ error: 'Erro ao buscar moods' });
  }
});

module.exports = router;
