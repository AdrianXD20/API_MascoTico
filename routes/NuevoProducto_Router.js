    const express = require('express');
    const router = express.Router();

    const NuvPro_Controller = require('../Controllers/NuevoPro_Controller');
    const NuevosProductosServ = require('../Services/NuevosProductosServ');
    const NuevoProductoRepository = require('../Repositories/NuevoProductoRepository');

    // Instanciar las capas con el JSON como origen de datos
    const nuevoProductoRepository = new NuevoProductoRepository();
    const nuevoProductoService = new NuevosProductosServ(nuevoProductoRepository);
    const nuevoProController = new NuvPro_Controller(nuevoProductoService);


/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - Name
 *         - Brand
 *         - Pet
 *         - Category
 *         - SizePet
 *         - Age
 *         - Weight
 *         - Price
 *         - Stock
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID del producto
 *         Name:
 *           type: string
 *           description: Nombre del producto
 *         Brand:
 *           type: string
 *           description: Marca del producto
 *         Pet:
 *           type: string
 *           description: Tipo de mascota
 *         Category:
 *           type: array
 *           items:
 *             type: string
 *           description: Categorías del producto
 *         SizePet:
 *           type: array
 *           items:
 *             type: string
 *           description: Tamaño de la mascota
 *         Age:
 *           type: string
 *           description: Edad recomendada para la mascota
 *         Weight:
 *           type: string
 *           description: Peso del producto
 *         Price:
 *           type: integer
 *           description: Precio del producto
 *         Stock:
 *           type: integer
 *           description: Cantidad en stock
 *       example:
 *         Id: 1
 *         Name: "PEDIGREE® Croquetas Adulto Razas Pequeñas Con Res Y Vegetales"
 *         Brand: "PEDIGREE"
 *         Pet: "Perro"
 *         Category: ["Alimento", "Alimento Seco"]
 *         SizePet: ["Raza Pequeña"]
 *         Age: "Adulto"
 *         Weight: "10kg"
 *         Price: 459
 *         Stock: 10
 */

/**
 * @swagger
 * /NuevoProducto:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
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
    // Ruta para crear un nuevo producto
    router.post('/NuevoProducto', (req, res) => nuevoProController.crearProducto(req, res));

    module.exports = router;
