const express = require('express');
const router = express.Router();

const EliminarPro_Controller = require('../Controllers/EliminarPro_Controller');
const EliminarProductoRepository = require('../Repositories/EliminarProductoRepository');
const EliminarProductoServ = require('../Services/EliminarProductoServ');

const eliminarProductoRepository = new EliminarProductoRepository();
const eliminarProductoServ = new EliminarProductoServ(eliminarProductoRepository);
const eliminarProductoController = new EliminarPro_Controller(eliminarProductoServ);

/**
 * @swagger
 * /Eliminar/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */

// Ruta para eliminar un producto
router.delete('/Eliminar/productos/:id', (req, res) => eliminarProductoController.eliminarProducto(req, res));

module.exports = router;
