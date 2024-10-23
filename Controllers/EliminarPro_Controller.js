class EliminarPro_Controller {
    constructor(eliminarProductoServ) {
        this.eliminarProductoServ = eliminarProductoServ;
    }

    eliminarProducto(req, res) {
        const id = req.params.id;
        const productoEliminado = this.eliminarProductoServ.eliminarProducto(id);
        
        if (productoEliminado) {
            res.json({ message: 'Producto eliminado', producto: productoEliminado });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
}

module.exports = EliminarPro_Controller;
