const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const authService = require('../Services/authService.js');
const UsuarioController= require ('../Controllers/usuarioController.js');
const UserRepository = require('../Repositories/UserRepository.js');
const { verifyToken } = require('../middleware/authMiddleware.js');





////(/)
const userRepository = new UserRepository();
const userService = new authService(userRepository);
const userController = new UsuarioController(userService)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     description: Endpoint para registrar un nuevo usuario en la aplicación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - email
 *               - contraseña
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario (debe ser único)
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario (mínimo 6 caracteres)
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario registrado
 *                 apellido:
 *                   type: string
 *                   description: Apellido del usuario registrado
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario registrado
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *       500:
 *         description: Error en el servidor
 */
router.post('/register',(req,res) => userController.crearUsuario(req,res));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión un usuario.
 *     description: Endpoint para que un usuario inicie sesión y obtenga un token de autenticación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraseña
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo del usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación JWT
 *       400:
 *         description: Error en las credenciales o en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/login',(req,res)=> userController.login(req,res));

module.exports = router;
