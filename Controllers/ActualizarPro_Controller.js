const ActualizarProductoServ = require('../Services/ActualizarProductoSer'); 

class ActualizarPro_Controller {
    constructor(Act_Prod_Cont) {
        this.Act_Prod_Cont = Act_Prod_Cont;
    }

    actualizarProducto(req, res) {
        const id = req.params.id;
        const datosActualizados = req.body;
        const producto = this.Act_Prod_Cont.actualizarProducto(id, datosActualizados); 
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
}

module.exports = ActualizarPro_Controller;
