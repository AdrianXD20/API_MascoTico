const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');

const VeterinarioController= require('../Controllers/veterinariosController');
const VeterinarioService= require('../Services/veterinariosServices');
const VeterinarioRepository = require ('../Repositories/veterinariosRepository');

const veterinarioRepository = new VeterinarioRepository();
const veterinariosServices = new VeterinarioService(veterinarioRepository);
const veterinariosController = new VeterinarioController(veterinariosServices);

/**
 * @swagger
 * components:
 *   schemas:
 *     Veterinario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         grado_estudio:
 *           type: string
 *           example: "Doctorado en Medicina Veterinaria"
 *         especialidad:
 *           type: string
 *           example: "Cirugía"
 *         nombre:
 *           type: string
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           example: "Pérez"
 *         dni:
 *           type: string
 *           example: "12345678"
 *       required:
 *         - id
 *         - grado_estudio
 *         - especialidad
 *         - nombre
 *         - apellido
 *         - dni
 */

/**
 * @swagger
 * /veterinarios:
 *   get:
 *     summary: Obtener todos los veterinarios
 *     tags: [Veterinarios]
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
 *         description: Lista de todos los veterinarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veterinario'
 *       404:
 *         description: No se encontraron veterinarios
 */

router.get('/veterinarios',verifyToken, (req,res)=> veterinariosController.obtenerVeterinarios(req,res));

/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Obtener veterinario por ID
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del veterinario
 *     responses:
 *       200:
 *         description: Veterinario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinario'
 *       404:
 *         description: Veterinario no encontrado
 */
router.get('/veterinario/:id' ,verifyToken, (req,res)=> veterinariosController.obtenerVeterinarioPorId(req,res));

/**
 * @swagger
 * /veterinario:
 *   post:
 *     summary: Crear un nuevo veterinario
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veterinario'
 *     responses:
 *       201:
 *         description: Veterinario creado exitosamente
 *       400:
 *         description: Error en la solicitud de creación
 */
router.post('/veterinario', verifyToken, (req, res) => veterinariosController.crearVeterinario(req,res));

/**
 * @swagger
 * /veterinario/{id}:
 *   put:
 *     summary: Actualizar un veterinario
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del veterinario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veterinario'
 *     responses:
 *       200:
 *         description: Veterinario actualizado exitosamente
 *       404:
 *         description: Veterinario no encontrado
 *       400:
 *         description: Error en la solicitud de actualización
 */
router.put('/veterinario/:id', verifyToken, (req, res)=> veterinariosController.actualizarVeterinario(req,res));

/**
 * @swagger
 * /veterinario/{id}:
 *   delete:
 *     summary: Eliminar un veterinario
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del veterinario a eliminar
 *     responses:
 *       200:
 *         description: Veterinario eliminado exitosamente
 *       404:
 *         description: Veterinario no encontrado
 */
router.delete('/veterinario/:id', verifyToken, (req, res) => veterinariosController.eliminarVeterinario(req,res));

module.exports= router;