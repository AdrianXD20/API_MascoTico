const fs = require('fs');
const path = require('path');

class ActualizarProductoRepository {
    constructor() {
        this.rutaArchivo = path.join('Data/Products.json');
    }

    obtenerProductos() {
        // Aquí debería ir la lógica para obtener los productos
        const data = fs.readFileSync(this.rutaArchivo);
        return JSON.parse(data);
    }

    ActualizarProducto(Id, datosActualizados) {
        const productos = this.obtenerProductos();
        const index = productos.findIndex(producto => producto.Id === parseInt(Id));
        if (index !== -1) {
            productos[index] = { ...productos[index], ...datosActualizados };
            this.guardarProductos(productos);
            return productos[index];
        }
        return null;
    }

    guardarProductos(productos) {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(productos, null, 2));
    }
}

module.exports = ActualizarProductoRepository;
