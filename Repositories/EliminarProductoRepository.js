const fs = require('fs');
const path = require('path');

class EliminarProductoRepository {
    constructor() {
        this.rutaArchivo = path.join('Data/Products.json');
    }

    obtenerProductos() {
        const data = fs.readFileSync(this.rutaArchivo);
        return JSON.parse(data);
    }

    eliminarProducto(id) {
        const productos = this.obtenerProductos();
        const index = productos.findIndex(producto => producto.Id === parseInt(id));

        if (index !== -1) {
            const productoEliminado = productos.splice(index, 1);
            this.guardarProductos(productos);
            return productoEliminado[0]; // Retorna el producto eliminado
        }
        return null; // Retorna null si no se encuentra el producto
    }

    guardarProductos(productos) {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(productos, null, 2));
    }
}

module.exports = EliminarProductoRepository;
