const fs = require('fs-extra');
const User = require('../Models/UserModel.js');
const bcrypt = require('bcryptjs');
const db = require('../database/conexion.js'); // Asumiendo que este archivo maneja la conexión

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    // Crear un nuevo usuario
    crearUsuario(nuevoUsuario) {
        return new Promise((resolve, reject) => {
            // Hashear la contraseña del nuevo usuario
            bcrypt.hash(nuevoUsuario.contraseña, 6, (err, hash) => {
                if (err) {
                    console.log('Error al momento de hashear la contraseña:', err);
                    return reject(err);
                }

                // Crear un objeto con la contraseña hasheada
                const usuarioConContraseñaHash = { 
                    ...nuevoUsuario, 
                    contraseña: hash 
                };

                // Insertar el nuevo usuario en la base de datos
                this.db.execute('INSERT INTO usuarios SET ?', usuarioConContraseñaHash, (err, result) => {
                    if (err) {
                        console.error('Error al crear el usuario:', err);
                        return reject(err);
                    }
                    // Si todo sale bien, se resuelve la promesa con el usuario creado
                    resolve({ id: result.insertId, ...usuarioConContraseñaHash });
                });
            });
        });
    }

    // Función de login (iniciar sesión)
    login(email, contraseña) {
        return new Promise((resolve, reject) => {
            // Buscar el usuario por el correo electrónico
            this.db.execute('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
                if (err) {
                    console.log('Error en realizar el login:', err);
                    return reject(err);
                }

                // Si no se encuentra el usuario, rechazar la promesa
                if (results.length === 0) {
                    return reject(new Error('Usuario no encontrado.'));
                }

                const usuario = results[0];

                // Comparar la contraseña ingresada con la contraseña hasheada
                bcrypt.compare(contraseña, usuario.contraseña, (err, exito) => {
                    if (err) {
                        console.log('Tuvimos un problema comparando la contraseña:', err);
                        return reject(err);
                    }

                    // Si la contraseña no coincide
                    if (!exito) {
                        return reject(new Error('La contraseña es incorrecta.'));
                    }

                    // Si la contraseña es correcta, devolver los datos del usuario
                    resolve({
                        id: usuario.id,
                        email: usuario.email,
                        nombre: usuario.nombre
                    });
                });
            });
        });
    }
}

module.exports = UserRepository;
