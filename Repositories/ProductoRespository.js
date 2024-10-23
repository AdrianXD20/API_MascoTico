const fs = require('fs');
const path = require('path');

class ProductoRespository {
    constructor() {
        this.rutaArchivo = path.join(__dirname, '../Data/Products.json');
    }

    obtenerProductos() {
        const data = fs.readFileSync(this.rutaArchivo, 'utf8');
        return JSON.parse(data);
    }

    obtenerProductosporId(Id) {
        const productos = this.obtenerProductos();
        return productos.find(producto => producto.Id === parseInt(Id));
    }
}

module.exports = ProductoRespository;
