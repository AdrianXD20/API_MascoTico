class ProductoControllerBus{
    constructor(ProductoService){
        this.ProductoService = ProductoService;}
    
    obtenerProductos(req,res){
        const productos = this.ProductoService.obtenerProductos();
            res.json(productos);
    }

    obtenerProductosporId(req, res){
        const id = req.params.id;
        const producto = this.ProductoService.obtenerProductosporId(id);
        if (producto){
            res.json(producto);
        }else{
            res.status(404).json({message:'Producto no encontrado'});
        }
    }
}
module.exports = ProductoControllerBus