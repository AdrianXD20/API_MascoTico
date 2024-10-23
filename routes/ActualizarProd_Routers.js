const express = require('express');
const router = express.Router();

const ActualizarPro_Controller = require('../Controllers/ActualizarPro_Controller');
const ActualizarProductoRepository = require('../Repositories/ActualizarProductoRepository');
const ActualizarProductoServ = require('../Services/ActualizarProductoSer');

const actualizarProductoRepository = new ActualizarProductoRepository();
const actualizarProductoServ = new ActualizarProductoServ(actualizarProductoRepository);
const actProductoController = new ActualizarPro_Controller(actualizarProductoServ);

/**
 * @swagger
 * /Actualizar/productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Producto no encontrado
 */
router.put('/Actualizar/productos/:id', (req, res) => actProductoController.actualizarProducto(req, res));

module.exports = router;
