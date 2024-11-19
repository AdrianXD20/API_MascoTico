const express = require('express');
const router = express.Router();
const MascotaController = require('../Controllers/mascotasController');
const MascotaService = require('../Services/mascotasServices');
const MascotaRepository = require('../Repositories/mascotasRepository');
const {verifyToken} = require('../middleware/authMiddleware')

const mascotasRepository = new MascotaRepository();
const mascotaService = new MascotaService(mascotasRepository);
const mascotasController = new MascotaController(mascotaService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Mascota:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "rei Ejemplo"
 *         raza:
 *           type: string
 *           example: "rei "
 * 
 *       required:
 *         - id
 *         - nombre
 *         - raza
 */

/**
 * @swagger
 * /mascotas:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Mascotas]
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
router.get('/mascotas', verifyToken, (req, res) => mascotasController.obtenerMascotas(req, res));

/**
 * @swagger
 * /mascotas/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Mascotas]
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
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/mascotas/:id', verifyToken, (req, res) => mascotasController.obtenerMascotasPorId(req, res));

/**
 * @swagger
 * /mascotas:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Mascotas]
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
router.post('/mascotas', verifyToken, (req, res) => mascotasController.crearMascotas(req, res));

/**
 * @swagger
 * /mascotas/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Mascotas]
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
router.put('/mascotas/:id', verifyToken, (req, res) => mascotasController.actualizarMascotas(req, res));

/**
 * @swagger
 * /mascotas/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Mascotas]
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
router.delete('/mascotas/:id', verifyToken, (req, res) => mascotasController.eliminarMascotas(req, res));


module.exports = router;
