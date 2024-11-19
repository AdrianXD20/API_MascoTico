const express = require('express');
const router = express.Router();
const CitasController = require('../Controllers/citaController');
const CitaService = require('../Services/citasServices');
const CitasRepository = require('../Repositories/citasRepository');
const {verifyToken} = require('../middleware/authMiddleware')

const citasRepository = new CitasRepository();
const citasService = new CitaService(citasRepository);
const citasController = new CitasController(citasService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Citas:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre_mascota:
 *           type: string
 *           example: "rei Ejemplo"
 *       
 * 
 *       required:
 *         - id
 *         - nombre_mascota
 */

/**
 * @swagger
 * /citas:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Citas]
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
router.get('/citas', verifyToken, (req, res) => citasController.obtenerCitas(req, res));

/**
 * @swagger
 * /citas/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []  
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
 *               $ref: '#/components/schemas/Citas'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/citas/:id', verifyToken, (req, res) => citasController.obtenerCitasPorId(req, res));

/**
 * @swagger
 * /citas:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/citas', verifyToken, (req, res) => citasController.crearCitas(req, res));

/**
 * @swagger
 * /citas/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []  
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
router.put('/citas/:id', verifyToken, (req, res) => citasController.actualizarCitas(req, res));

/**
 * @swagger
 * /citas/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []  
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
router.delete('/citas/:id', verifyToken, (req, res) => citasController.eliminarCitas(req, res));


module.exports = router;
