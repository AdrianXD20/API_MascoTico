const veterinarioRepository = require ('../Repositories/veterinariosRepository')
const db = require('../database/conexion')
class VeterinarioService{
    constructor(){
        this.veterinarioRepository = new veterinarioRepository(db)
    }

    obtenerVeterinarios(){
        return this.veterinarioRepository.obtenerVeterinarios();
    }

    obtenerVeterinarioPorId(Id){
        return this.veterinarioRepository.obtenerVeterinarioPorId(Id);
    }

    crearVeterinario(nuevoVeterinario){
        return this.veterinarioRepository.crearVeterinarios(nuevoVeterinario)
    }

    actualizarVeterinario(Id, datosActualizados){
        return this.veterinarioRepository.actualizarVeterinario(Id,datosActualizados)
    }

    eliminarVeterinario(Id){
        return this.veterinarioRepository.eliminarVeterinario(Id)
    }

}


module.exports= VeterinarioService;