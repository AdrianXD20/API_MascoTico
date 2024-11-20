const db = require('../database/conexion');

class MascotaRepository {
  constructor(db) {
    this.db = db;
  }

  // Obtener mascotas con limit y offset
  obtenerMascotas(limit, offset) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM mascotas LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
        if (err) {
          console.error('Error en obtener Mascotas query:', err); 
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Obtener mascota por ID
  obtenerMascotasPorId(id) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM mascotas WHERE id = ?', [id], (err, results) => {
        if (err) {
          console.error('Error en obtenerMascotaPorId query:', err); 
          return reject(err);
        }
        resolve(results[0]); // Solo retorna el primer resultado
      });
    });
  }

  // Crear una nueva mascota
  crearMascotas(nuevaMascota) {
    return new Promise((resolve, reject) => {
      // Insertamos los valores de nuevaMascota en la tabla mascotas
      this.db.query('INSERT INTO mascotas (nombre, raza, id_usuario) VALUES (?, ?, ?)', 
        [nuevaMascota.nombre, nuevaMascota.raza || null, nuevaMascota.id_usuario || null], 
        (err, result) => {
          if (err) {
            console.error('Error en crear Mascota query:', err); 
            return reject(err);
          }
          resolve({ id: result.insertId, ...nuevaMascota });
        });
    });
  }

  // Actualizar datos de una mascota
  actualizarMascotas(Id, datosActualizados) {
    return new Promise((resolve, reject) => {
      // Actualizamos la mascota con los nuevos datos
      this.db.query(
        'UPDATE mascotas SET nombre = ?, raza = ?, id_usuario = ? WHERE id = ?',
        [datosActualizados.nombre, datosActualizados.raza || null, datosActualizados.id_usuario || null, Id],
        (err, result) => {
          if (err) {
            console.error('Error en actualizar Mascotas query:', err); 
            return reject(err);
          }
          resolve(result.affectedRows > 0 ? { Id, ...datosActualizados } : null);
        }
      );
    });
  }

  // Eliminar mascota por ID
  eliminarMascotas(Id) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM mascotas WHERE id = ?', [Id], (err, result) => {
        if (err) {
          console.error('Error en eliminar Mascotas query:', err); 
          return reject(err);
        }
        resolve(result.affectedRows > 0); // Retorna true si se eliminó al menos una fila
      });
    });
  }
}

module.exports = MascotaRepository;
