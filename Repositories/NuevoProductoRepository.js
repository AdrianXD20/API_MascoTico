const fs = require('fs');
const path = require('path');

class NuevoProductoRepository {
    constructor() {
        this.rutaArchivo = path.join('Data/Products.json');
    }

    // Método para obtener todos los productos
    obtenerProductos() {
        const data = fs.readFileSync(this.rutaArchivo);
        return JSON.parse(data);
    }

    // Método para crear un nuevo producto
    crearProducto(nuevoProducto) {
        const productos = this.obtenerProductos(); // Ahora se pueden obtener los productos
        nuevoProducto.Id = productos.length + 1; // Asignar ID basado en la cantidad de productos
        productos.push(nuevoProducto); // Añadir el nuevo producto
        this.guardarProductos(productos); // Guardar los productos actualizados
        return nuevoProducto;
    }

    // Método para guardar los productos actualizados en el archivo JSON
    guardarProductos(productos) {
        fs.writeFileSync(this.rutaArchivo, JSON.stringify(productos, null, 2));
    }
}

module.exports = NuevoProductoRepository;
