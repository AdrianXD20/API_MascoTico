const mysql = require('mysql2');

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
    waitForConnections: true,
    connectionLimit: 2000, 
    queueLimit: 0,       
});

// Exportar el pool
module.exports = pool.promise(); // Usar promesas para manejar la conexión
