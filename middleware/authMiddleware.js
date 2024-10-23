const jwt = require('jsonwebtoken');

const secretKey = '123';

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err); // Agrega este log para ver el error específico
        res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = { verifyToken };
