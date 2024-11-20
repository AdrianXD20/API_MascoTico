const db = require('../database/conexion');

class CitaRepository {
  constructor(db) {
    this.db = db;
  }

  // Obtener citas con limit y offset
  obtenerCitas(limit, offset) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM citas LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
        if (err) {
          console.error('Error en obtener citas query:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Obtener cita por ID
  obtenerCitasPorId(id) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM citas WHERE id = ?', [id], (err, results) => {
        if (err) {
          console.error('Error en obtenerCitasPorId query:', err);
          return reject(err);
        }
        resolve(results[0]); // Devolvemos el primer resultado (único) por ID
      });
    });
  }

  // Crear una nueva cita
  crearCitas(nuevaCita) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO citas (id_mascota, id_veterinario, id_usuario, nombre_mascota, fecha) VALUES (?, ?, ?, ?, ?)',
        [
          nuevaCita.id_mascota,
          nuevaCita.id_veterinario,
          nuevaCita.id_usuario,
          nuevaCita.nombre_mascota,
          nuevaCita.fecha
        ],
        (err, result) => {
          if (err) {
            console.error('Error en crear Citas query:', err);
            return reject(err);
          }
          resolve({ id: result.insertId, ...nuevaCita });
        }
      );
    });
  }

  // Actualizar datos de una cita
  actualizarCitas(Id, datosActualizados) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'UPDATE citas SET id_mascota = ?, id_veterinario = ?, id_usuario = ?, nombre_mascota = ?, fecha = ? WHERE id = ?',
        [
          datosActualizados.id_mascota,
          datosActualizados.id_veterinario,
          datosActualizados.id_usuario,
          datosActualizados.nombre_mascota,
          datosActualizados.fecha,
          Id
        ],
        (err, result) => {
          if (err) {
            console.error('Error en actualizar citas query:', err);
            return reject(err);
          }
          resolve(result.affectedRows > 0 ? { Id, ...datosActualizados } : null);
        }
      );
    });
  }

  // Eliminar una cita por ID
  eliminarCitas(Id) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM citas WHERE id = ?', [Id], (err, result) => {
        if (err) {
          console.error('Error en eliminar Citas query:', err);
          return reject(err);
        }
        resolve(result.affectedRows > 0); // Retorna true si se eliminó alguna fila
      });
    });
  }
}

module.exports = CitaRepository;
