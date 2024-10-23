const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta principal');
});

module.exports = router;  // Asegúrate de exportar el router
