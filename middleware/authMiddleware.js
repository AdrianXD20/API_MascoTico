const jwt = require('jsonwebtoken');

const secretKey = '123';

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token); // Agrega este log
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log('Usuario decodificado:', req.user); // Log para verificar el usuario
        next();
    } catch (err) {
        console.error(err); // Log del error
        res.status(401).json({ error: 'Token inválido' });
    }
}


module.exports = { verifyToken };
