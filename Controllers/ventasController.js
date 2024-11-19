class ventaController{
    constructor(ventaService) {
        this.ventaService = ventaService
    }

    async obtenerVentas(req, res){
        try{

            const {page=1 , limit} = req.query

            const pageNumber =parseInt(page);
            const pageSize = parseInt(limit) || 10;
            const ventas =  await this.ventaService.obtenerVentas(pageNumber,pageSize)
            res.json(ventas)
        }
        catch(error){
            console.error('Error al obtener ventas: ', error);
            res.status(500).json({message:'Error al obtener las  ventas', error: error.message});
        }
    }

    async obtenerVentaPorId(req, res){
        try{
            const id = req.params.id;
            const ventas= await this.ventaService.obtenerVentaPorId(id);
           if(ventas){
            res.json(ventas)
           }
           else{
            res.status(404).json({message:'venta no encontrado'});
           }
        }catch(error){
        console.error('Error al obtener la  venta: ', error);
        res.status(500).json({message:'No encontramos la  venta :(',  error: error.message})
        }
    }

    async crearVenta(req,res){
        try{
            const nuevaVenta= req.body;
            const venta= await this.ventaService.crearVenta(nuevaVenta);
            res.status(200).json(venta)

        }catch(error){
            console.error('Error al crear una nueva  venta: ', error)
            res.status(500).json({message:'Tuvimos un error para guardar la Venta', error:error.message})

        }
    }

    async actualizarVenta(req,res){
        try{
            const id= req.params.id;
            const datosActualizados = req.body;
            const venta = await this.ventaService.actualizarVenta(id,datosActualizados);
            if (venta) {
                res.json(venta);
              } else {
                res.status(404).json({ message: 'Venta no encontrado' });
              }
        }catch(error){
            console.error('Error al actualizar las ventas: ', error);
            res.status(500).json({message:'Tuvimos un error al guardar los cambios que se realizaron :(:',error: error.message});
        }
    }

    async eliminarVenta(req,res){
        try{
            const id= req.params.id;
            const venta = await this.ventaService.eliminarVenta(id);
            if(venta){
                res.json({message:'Venta Eliminada'});
            } else{
                res.status(404).json({message : 'Venta no eliminada'});
            }
        }catch(error){
            console.error('Error al eliminar la: venta ', error);
            res.status(500).json({message:'Tuvimos un error al eliminar la. venta', error:error.message})
        }
    }
}

module.exports = ventaController;