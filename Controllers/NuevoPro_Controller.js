class NuevoPro_Controller {
    constructor(NuvPro_Controller){
        this.NuvPro_Controller = NuvPro_Controller;
    }

    crearProducto(req, res) {
        const nuevoProducto = req.body;
        const producto = this.NuvPro_Controller.crearProducto(nuevoProducto);
        res.status(201).json(producto);
    }
}

module.exports = NuevoPro_Controller;
