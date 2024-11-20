const db = require('../database/conexion');

class VentaRepository {
    constructor(db) {
        this.db = db;
    }

    // Obtener ventas con limit y offset
    async obtenerVentas(limit, offset) {
        try {
            const [results] = await this.db.execute('SELECT * FROM ventas LIMIT ? OFFSET ?', [limit, offset]);
            return results;
        } catch (err) {
            console.error('Error al obtener las ventas: ', err);
            throw err;
        }
    }

    // Obtener venta por ID
    async obtenerVentaPorId(Id) {
        try {
            const [results] = await this.db.execute('SELECT * FROM ventas WHERE id = ?', [Id]);
            return results[0]; // Solo devolver el primer resultado, si existe
        } catch (err) {
            console.error('Error en la búsqueda de la venta: ', err);
            throw err;
        }
    }

    // Crear nueva venta
    async crearVenta(nuevaVenta) {
        try {
            const [result] = await this.db.execute(
                'INSERT INTO ventas (id_producto, id_cliente, tipo_mascota, categoria, precio) VALUES (?, ?, ?, ?, ?)', 
                [
                    nuevaVenta.id_producto, 
                    nuevaVenta.id_cliente, 
                    nuevaVenta.tipo_mascota, 
                    nuevaVenta.categoria, 
                    nuevaVenta.precio
                ]
            );
            return { id: result.insertId, ...nuevaVenta };
        } catch (err) {
            console.error('Error al crear una venta: ', err);
            throw err;
        }
    }

    // Actualizar venta
    async actualizarVenta(Id, datosActualizados) {
        try {
            const [result] = await this.db.execute(
                'UPDATE ventas SET id_producto = ?, id_cliente = ?, tipo_mascota = ?, categoria = ?, precio = ? WHERE id = ?', 
                [
                    datosActualizados.id_producto, 
                    datosActualizados.id_cliente, 
                    datosActualizados.tipo_mascota, 
                    datosActualizados.categoria, 
                    datosActualizados.precio, 
                    Id
                ]
            );
            return result.affectedRows > 0 ? { Id, ...datosActualizados } : null;
        } catch (err) {
            console.error('Error al actualizar la venta: ', err);
            throw err;
        }
    }

    // Eliminar venta
    async eliminarVenta(Id) {
        try {
            const [result] = await this.db.execute('DELETE FROM ventas WHERE id = ?', [Id]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error('Error al eliminar la venta: ', err);
            throw err;
        }
    }
}

module.exports = VentaRepository;
