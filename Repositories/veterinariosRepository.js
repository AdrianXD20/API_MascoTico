const db = require('../database/conexion');

class VeterinarioRepository {
    constructor(db) {
        this.db = db;
    }

    // Obtener veterinarios con paginación
    async obtenerVeterinarios(limit, offset) {
        try {
            const [result] = await this.db.execute('SELECT * FROM veterinarios LIMIT ? OFFSET ?', [limit, offset]);
            return result;
        } catch (err) {
            console.error('Error al obtener los Veterinarios: ', err);
            throw err; // Se lanza el error para manejarlo en el controlador
        }
    }

    // Obtener un veterinario por su ID
    async obtenerVeterinarioPorId(Id) {
        try {
            const [result] = await this.db.execute('SELECT * FROM veterinarios WHERE id = ?', [Id]);
            return result[0]; // Retornamos el primer veterinario encontrado
        } catch (err) {
            console.error('Error al obtener ese Veterinario: ', err);
            throw err;
        }
    }

    // Crear un nuevo veterinario
    async crearVeterinario(nuevoVeterinario) {
        try {
            const [result] = await this.db.execute('INSERT INTO veterinarios (grado_estudio, especialidad, nombre, apellido, dni) VALUES (?, ?, ?, ?, ?)', 
                [nuevoVeterinario.grado_estudio, nuevoVeterinario.especialidad, nuevoVeterinario.nombre, nuevoVeterinario.apellido, nuevoVeterinario.dni]);

            return { id: result.insertId, ...nuevoVeterinario }; // Retorna el ID generado y los datos del veterinario
        } catch (err) {
            console.error('Error al crear un nuevo Veterinario: ', err);
            throw err;
        }
    }

    // Actualizar los datos de un veterinario
    async actualizarVeterinario(Id, datosActualizados) {
        try {
            const [result] = await this.db.execute('UPDATE veterinarios SET grado_estudio = ?, especialidad = ?, nombre = ?, apellido = ?, dni = ? WHERE id = ?', 
                [datosActualizados.grado_estudio, datosActualizados.especialidad, datosActualizados.nombre, datosActualizados.apellido, datosActualizados.dni, Id]);

            return result.affectedRows > 0 ? { Id, ...datosActualizados } : null; // Retorna null si no se actualizó nada
        } catch (err) {
            console.error('Error al momento de actualizar datos: ', err);
            throw err;
        }
    }

    // Eliminar un veterinario
    async eliminarVeterinario(Id) {
        try {
            const [result] = await this.db.execute('DELETE FROM veterinarios WHERE id = ?', [Id]);
            return result.affectedRows > 0; // Retorna true si se eliminó correctamente
        } catch (err) {
            console.error('Error al eliminar al Veterinario: ', err);
            throw err;
        }
    }
}

module.exports = VeterinarioRepository;
