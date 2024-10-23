class ActualizarProductoServ {
    constructor(actualizarProductoRepository) {
        this.actualizarProductoRepository = actualizarProductoRepository;
    }

    actualizarProducto(Id, datosActualizados) {
        return this.actualizarProductoRepository.ActualizarProducto(Id, datosActualizados);
    }
}

module.exports = ActualizarProductoServ;
