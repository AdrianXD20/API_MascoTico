class VeterinarioController{
    constructor(veterinarioService) {
        this.veterinarioService = veterinarioService
    }

    async obtenerVeterinarios(req, res){
        try{
            const {page = 1, limit} = req.query;

            const pageNumber = parseInt(page);
            const pageSize = parseInt(limit) || 10;
            const veterianrios =  await this.veterinarioService.obtenerVeterinarios(pageNumber,pageSize);
            res.json(veterianrios)
        }
        catch(error){
            console.error('Error al obtener Productos: ', error);
            res.status(500).json({message:'Error al obtener los Veterinarios: ', error: error.message});
        }
    }

    async obtenerVeterinarioPorId(req, res){
        try{
            const id = req.params.id;
            const veterinario= await this.veterinarioService.obtenerVeterinarioPorId(id);
           if(veterinario){
            res.json(veterinario)
           }
           else{
            res.status(404).json({message:'Producto no encontrado'});
           }
        }catch(error){
        console.error('Error al obtener el veterianrio : ', error);
        res.status(500).json({message:'No encontramos el Producto :(', error: error.message})
        }
    }

    async crearVeterinario(req,res){
        try{
            const nuevoVeterinario = req.body;
            const veterinario= await this.veterinarioService.crearVeterinario(nuevoVeterinario);
            res.status(200).json(veterinario)

        }catch(error){
            console.error('Error al crear un nuevo veterianrio: ', error)
            res.status(500).json({message:'Tuvimos un error para guardar al Veterianrio', error:error.message})

        }
    }

    async actualizarVeterinario(req,res){
        try{
            const id= req.params.id;
            const datosActualizados = req.body;
            const veterinario = await this.veterinarioService.actualizarVeterinario(id,datosActualizados);
            if (veterinario) {
                res.json(veterinario);
              } else {
                res.status(404).json({ message: 'Producto no encontrado' });
              }
        }catch(error){
            console.error('Error al actualizar los datos : ', error);
            res.status(500).json({message:'Tuvimos un error al guardar los cambios que se realizaron :(:',error: error.message});
        }
    }

    async eliminarVeterinario(req,res){
        try{
            const id= req.params.id;
            const veterinario = await this.veterinarioService.eliminarVeterinario(id);
            if(veterinario){
                res.json({message:'Veterinario Eliminado'});
            } else{
                res.status(404).json({message : 'Veterianrio no eliminado'});
            }
        }catch(error){
            console.error('Error al eliminar veterinario: ', error);
            res.status(500).json({message:'Tuvimos un error al eliminar el veterianrio.', error:error.message})
        }
    }
}

module.exports = VeterinarioController;