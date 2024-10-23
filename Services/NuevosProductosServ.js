class NuevoProducto {
    constructor(nuevoProducto){
        this.nuevoProducto = nuevoProducto;
    }

    crearProducto(nuevoProducto) {
        return this.nuevoProducto.crearProducto(nuevoProducto);
    }
}

module.exports = NuevoProducto;
