 class BuscadorProductoSer{
    constructor(ProductoRespository){
        this.ProductoRespository = ProductoRespository;
    }
    obtenerProductos(){
        return this.ProductoRespository.obtenerProductos();
    }

    obtenerProductosporId(Id){
        return this.ProductoRespository.obtenerProductosporId(Id);
    }
}
module.exports = BuscadorProductoSer;