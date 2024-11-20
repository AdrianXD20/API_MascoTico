const mysql = require('mysql2'); // Importa versión con Promesas

// Crear el pool de conexiones
const db = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    waitForConnections: true,
    connectionLimit: 10, // Límite de conexiones simultáneas
    queueLimit: 0, // Sin límite de solicitudes en espera
});

// Verificar la conexión inicial
(async () => {
    try {
        // Realiza una consulta inicial para validar la conexión
        await db.query('SELECT 1');
        console.log('Conexión inicial exitosa a la base de datos');
    } catch (err) {
        console.error('Error al realizar la conexión inicial a la base de datos:', err);
    }
})();

// Monitorear errores en el pool (opcional)
db.on('error', (err) => {
    console.error('Error en el pool de conexiones:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.warn('Conexión con la base de datos perdida. El pool gestionará una reconexión automáticamente.');
    }
});

module.exports = db;
