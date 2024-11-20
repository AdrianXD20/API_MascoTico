const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    // Crear un nuevo usuario
    async crearUsuario(nuevoUsuario) {
        try {
            const hash = await bcrypt.hash(nuevoUsuario.contraseña, 6);
            const usuarioConContraseñaHash = { ...nuevoUsuario, contraseña: hash };

            const [result] = await this.db.execute('INSERT INTO usuarios SET ?', usuarioConContraseñaHash);
            return { id: result.insertId, ...usuarioConContraseñaHash };
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            throw err;
        }
    }

    // Función de login (iniciar sesión)
    async login(email, contraseña) {
        try {
            const [results] = await this.db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

            if (results.length === 0) {
                throw new Error('Usuario no encontrado.');
            }

            const usuario = results[0];
            const exito = await bcrypt.compare(contraseña, usuario.contraseña);

            if (!exito) {
                throw new Error('La contraseña es incorrecta.');
            }

            return { id: usuario.id, email: usuario.email, nombre: usuario.nombre };
        } catch (err) {
            console.log('Error al realizar el login:', err);
            throw err;
        }
    }
}

module.exports = UserRepository;
