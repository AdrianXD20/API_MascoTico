const db = require('../database/conexion')
const extraRepository = require('../Repositories/extraRepository')

class extraService{
    constructor(){
        this.extraRepository =  new extraRepository(db)
    }

    obtenerExtra(page, limit){
        const offset = (page-1) * limit;
        return this.extraRepository.obtenerExtra(limit, offset);
    }

    obtenerExtraPorId(Id){
        return this.extraRepository.obtenerExtraPorId(Id);
    }

    crearExtra(nuevoExtra){
        return this.extraRepository.crearExtra(nuevoExtra);
    }

    actualizarExtra(Id, datosActualizados){
        return this.extraRepository.actualizarExtra(Id, datosActualizados);
    }

    eliminarExtra(Id){
        return this.extraRepository.eliminarExtra(Id);
    }
}

module.exports = extraService