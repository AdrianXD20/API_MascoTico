const mysql = require('mysql2');

let db;

function connectToDatabase() {
    db = mysql.createConnection({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db_name,
    });

    // Manejo de conexión
    db.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            setTimeout(connectToDatabase, 5000); // Reintenta la conexión después de 5 segundos
        } else {
            console.log('Conexión exitosa a la base de datos');
        }
    });

    // Manejo de errores durante la conexión
    db.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexión perdida con la base de datos. Intentando reconectar...');
            connectToDatabase(); // Reconecta si la conexión se pierde
        } else {
            console.error('Error en la conexión a la base de datos:', err);
            throw err;
        }
    });
}

// Inicializa la conexión a la base de datos
connectToDatabase();

module.exports = db;
