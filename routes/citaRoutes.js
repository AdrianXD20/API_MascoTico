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
 *         id_mascota:
 *           type: integer
 *           example: 856
 *         id_veterinario:
 *           type: integer
 *           example: 1103
 *         id_usuario:
 *           type: integer
 *           example: 157
 *         nombre_mascota:
 *           type: string
 *           example: "Lucy"
 *         fecha:
 *           type: string
 *           format: date
 *           example: "28-12-24"
 *       required:
 *         - id
 *         - id_mascota
 *         - id_veterinario
 *         - id_usuario
 *         - nombre_mascota
 *         - fecha
 */

/**
 * @swagger
 * /citas:
 *   get:
 *     summary: Obtener todas las citas
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
 *         description: Lista de todas las citas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Citas'
 *       404:
 *         description: No se encontraron citas
 */
router.get('/citas', verifyToken, (req, res) => citasController.obtenerCitas(req, res));

/**
 * @swagger
 * /citas/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita a buscar
 *     responses:
 *       200:
 *         description: Cita encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Citas'
 *       404:
 *         description: Cita no encontrada
 */
router.get('/citas/:id', verifyToken, (req, res) => citasController.obtenerCitasPorId(req, res));

/**
 * @swagger
 * /citas:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Citas'
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Citas'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/citas', verifyToken, (req, res) => citasController.crearCitas(req, res));

/**
 * @swagger
 * /citas/{id}:
 *   put:
 *     summary: Actualizar una cita por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Citas'
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Cita no encontrada
 */
router.put('/citas/:id', verifyToken, (req, res) => citasController.actualizarCitas(req, res));

/**
 * @swagger
 * /citas/{id}:
 *   delete:
 *     summary: Eliminar una cita por ID
 *     tags: [Citas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita a eliminar
 *     responses:
 *       200:
 *         description: Cita eliminada exitosamente
 *       404:
 *         description: Cita no encontrada
 */
router.delete('/citas/:id', verifyToken, (req, res) => citasController.eliminarCitas(req, res));


module.exports = router;
