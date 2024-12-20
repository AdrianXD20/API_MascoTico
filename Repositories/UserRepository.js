const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    // Crear un nuevo usuario
    async crearUsuario(nuevoUsuario) {
        try {
            const hash = await bcrypt.hash(nuevoUsuario.password, 6); // Cambié "contraseña" por "password"
            const usuarioConContraseñaHash = { ...nuevoUsuario, password: hash };
    
            // Especificar las columnas y valores explícitamente
            const sql = 'INSERT INTO usuarios (email, nombre, apellido, password) VALUES (?, ?, ?, ?)';
            const [result] = await this.db.execute(sql, [
                usuarioConContraseñaHash.email, 
                usuarioConContraseñaHash.nombre, 
                usuarioConContraseñaHash.apellido, // Ahora se incluye apellido
                usuarioConContraseñaHash.password // Inserción de password con hash
            ]);
    
            return { id: result.insertId, ...usuarioConContraseñaHash };
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            throw err;
        }
    }

    // Función de login (iniciar sesión)
    async login(email, password) {
        try {
            const [results] = await this.db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    
            if (results.length === 0) {
                throw new Error('Usuario no encontrado.');
            }
    
            const usuario = results[0];
            const exito = await bcrypt.compare(password, usuario.password); // Comparación con el hash de la contraseña
    
            if (!exito) {
                throw new Error('La contraseña es incorrecta.');
            }
    
            return { 
                id: usuario.id, 
                email: usuario.email, 
                nombre: usuario.nombre, 
                apellido: usuario.apellido 
            };
        } catch (err) {
            console.log('Error al realizar el login:', err);
            throw err;
        }
    }
    
}

module.exports = UserRepository;
