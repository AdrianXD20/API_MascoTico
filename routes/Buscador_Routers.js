const express = require('express');
const router = express.Router();

const ProductoController = require('../Controllers/Buscador_Controllers');
const BuscadorProductoSer = require('../Services/BuscadorProductoSer');
const ProductoRespository = require('../Repositories/ProductoRespository');

// Instanciar las capas con el JSON como origen de datos
const productoRespository = new ProductoRespository();
const ProductoService = new BuscadorProductoSer(productoRespository);
const productoController = new ProductoController(ProductoService);

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No se encontraron productos
 */
// Rutas
router.get('/productos', (req, res) => productoController.obtenerProductos(req, res));
/**
 * @swagger
 * /producto/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/producto/:id', (req, res) => productoController.obtenerProductosporId(req, res));

module.exports = router;
