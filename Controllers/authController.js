const express = require('express');
const { check, validationResult } = require('express-validator');
const authService = require('../Services/authService.js');

const router = express.Router();

router.post('/register', [
    check('Name').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('Password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { Name, Password } = req.body;
        const newUser = await authService.register(Name, Password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { Name, Password } = req.body;
        const token = await authService.login(Name, Password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
