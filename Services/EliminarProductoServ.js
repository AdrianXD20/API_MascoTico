class EliminarProductoServ {
    constructor(eliminarProductoRepository) {
        this.eliminarProductoRepository = eliminarProductoRepository;
    }

    eliminarProducto(id) {
        return this.eliminarProductoRepository.eliminarProducto(id);
    }
}

module.exports = EliminarProductoServ;
