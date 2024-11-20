const db = require('../database/conexion');

class ExtraRepository {
  constructor(db) {
    this.db = db;
  }

  // Obtener características extras con limit y offset
  obtenerExtra(limit, offset) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM caracteristicas_extras LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
        if (err) {
          console.error('Error al obtener las caracteristicas Extra: ', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Obtener una característica extra por su ID
  obtenerExtraPorId(Id) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM caracteristicas_extras WHERE id = ?', [Id], (err, results) => {
        if (err) {
          console.error('Error en la búsqueda de la característica extra: ', err);
          return reject(err);
        }
        resolve(results[0]); // Devolvemos el primer resultado (único) al buscar por ID
      });
    });
  }

  // Crear una nueva característica extra
  crearExtra(nuevoExtra) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO caracteristicas_extras (categoria, tamañoMascota, Peso, Largo, Talla) VALUES (?, ?, ?, ?, ?)',
        [
          nuevoExtra.categoria,
          nuevoExtra.tamañoMascota || null,
          nuevoExtra.Peso || null,
          nuevoExtra.Largo || null,
          nuevoExtra.Talla || null
        ],
        (err, result) => {
          if (err) {
            console.error('Error al crear una característica extra: ', err);
            return reject(err);
          }
          resolve({ id: result.insertId, ...nuevoExtra });
        }
      );
    });
  }

  // Actualizar los datos de una característica extra
  actualizarExtra(Id, datosActualizados) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'UPDATE caracteristicas_extras SET categoria = ?, tamañoMascota = ?, Peso = ?, Largo = ?, Talla = ? WHERE id = ?',
        [
          datosActualizados.categoria,
          datosActualizados.tamañoMascota || null,
          datosActualizados.Peso || null,
          datosActualizados.Largo || null,
          datosActualizados.Talla || null,
          Id
        ],
        (err, result) => {
          if (err) {
            console.error('Error al actualizar los datos: ', err);
            return reject(err);
          }
          resolve(result.affectedRows > 0 ? { Id, ...datosActualizados } : null);
        }
      );
    });
  }

  // Eliminar una característica extra por su ID
  eliminarExtra(Id) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM caracteristicas_extras WHERE id = ?', [Id], (err, result) => {
        if (err) {
          console.error('Error al eliminar los datos: ', err);
          return reject(err);
        }
        resolve(result.affectedRows > 0); // Retorna true si se eliminó alguna fila
      });
    });
  }
}

module.exports = ExtraRepository;
