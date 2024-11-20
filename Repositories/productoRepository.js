const db = require('../database/conexion');

class ProductoRepository {
  constructor(db) {
    this.db = db;
  }

  // Obtener productos con limit y offset
  async obtenerProductos(limit, offset) {
    try {
      const [results] = await this.db.execute('SELECT * FROM productos LIMIT ? OFFSET ?', [limit, offset]);
      return results;
    } catch (err) {
      console.error('Error en obtenerProductos query:', err);
      throw err;
    }
  }

  // Obtener producto por ID
  async obtenerProductoPorId(id) {
    try {
      const [results] = await this.db.execute('SELECT * FROM productos WHERE id = ?', [id]);
      return results[0]; // Devuelve solo el primer resultado si existe
    } catch (err) {
      console.error('Error en obtenerProductoPorId query:', err);
      throw err;
    }
  }

  // Crear un nuevo producto
  async crearProducto(nuevoProducto) {
    try {
      const { nombre, marca, mascota, edad, precio, stock, idCaracteristicasExtras } = nuevoProducto;
      
      // Especificamos los valores a insertar (pueden ser nulos si no se proporcionan)
      const sql = `
        INSERT INTO productos (nombre, marca, mascota, edad, precio, stock, idCaracteristicasExtras)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await this.db.execute(sql, [
        nombre, 
        marca || null,  // Si no se proporciona, se inserta como NULL
        mascota || null, 
        edad || null, 
        precio || null, 
        stock || null, 
        idCaracteristicasExtras || null
      ]);

      return { id: result.insertId, ...nuevoProducto };
    } catch (err) {
      console.error('Error en crearProducto query:', err);
      throw err;
    }
  }

  // Actualizar producto
  async actualizarProducto(Id, datosActualizados) {
    try {
      const { nombre, marca, mascota, edad, precio, stock, idCaracteristicasExtras } = datosActualizados;

      // Especificamos los valores a actualizar
      const sql = `
        UPDATE productos 
        SET nombre = ?, marca = ?, mascota = ?, edad = ?, precio = ?, stock = ?, idCaracteristicasExtras = ?
        WHERE id = ?
      `;
      const [result] = await this.db.execute(sql, [
        nombre, 
        marca || null, 
        mascota || null, 
        edad || null, 
        precio || null, 
        stock || null, 
        idCaracteristicasExtras || null, 
        Id
      ]);

      return result.affectedRows > 0 ? { Id, ...datosActualizados } : null;
    } catch (err) {
      console.error('Error en actualizarProducto query:', err);
      throw err;
    }
  }

  // Eliminar producto
  async eliminarProducto(Id) {
    try {
      const [result] = await this.db.execute('DELETE FROM productos WHERE id = ?', [Id]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error('Error en eliminarProducto query:', err);
      throw err;
    }
  }
}

module.exports = ProductoRepository;
