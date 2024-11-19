const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

const VentaService = require('../Services/ventasServices');
const VentaRepository = require('../Repositories/ventasRepository');
const VentaController = require('../Controllers/ventasController');

const ventaRepository = new VentaRepository();
const ventaService = new VentaService(ventaRepository);
const ventaController = new VentaController(ventaService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         id_producto:
 *           type: integer
 *           example: 1001
 *         id_cliente:
 *           type: integer
 *           example: 5001
 *         tipo_mascota:
 *           type: string
 *           example: "Perro"
 *         categoria:
 *           type: string
 *           example: "Alimento"
 *         precio:
 *           type: number
 *           format: decimal
 *           example: 459.99
 *       required:
 *         - id
 *         - id_producto
 *         - id_cliente
 *         - tipo_mascota
 *         - categoria
 *         - precio
 */

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros por página (por defecto es 10)
 *     responses:
 *       200:
 *         description: Lista de todas las ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       404:
 *         description: No se encontraron ventas
 */
router.get('/ventas', verifyToken, (req, res) => ventaController.obtenerVentas(req, res));

/**
 * @swagger
 * /ventas/{id}:
 *   get:
 *     summary: Obtener venta por ID
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta
 *     responses:
 *       200:
 *         description: Venta obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 */
router.get('/ventas/:id', verifyToken, (req, res) => ventaController.obtenerVentaPorId(req, res));

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Error en la solicitud de creación
 */
router.post('/ventas', verifyToken, (req, res) => ventaController.crearVenta(req, res));

/**
 * @swagger
 * /ventas/{id}:
 *   put:
 *     summary: Actualizar una venta
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *       404:
 *         description: Venta no encontrada
 *       400:
 *         description: Error en la solicitud de actualización
 */
router.put('/ventas/:id', verifyToken, (req, res) => ventaController.actualizarVenta(req, res));

/**
 * @swagger
 * /ventas/{id}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 */
router.delete('/ventas/:id', verifyToken, (req, res) => ventaController.eliminarVenta(req, res));

module.exports = router;
