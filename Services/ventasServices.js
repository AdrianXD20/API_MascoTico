const db = require('../database/conexion')
const ventaRepository = require('../Repositories/ventasRepository')

class extraService{
    constructor(){
        this.ventaRepository =  new ventaRepository(db)
    }

    obtenerVentas(page,limit){
        const offset = (page -1) * limit
        return this.ventaRepository.obtenerVentas(limit,offset);
    }

    obtenerVentaPorId(Id){
        return this.ventaRepository.obtenerVentaPorId(Id);
    }

    crearVenta(nuevoExtra){
        return this.ventaRepository.crearVenta(nuevoExtra);
    }

    actualizarVenta(Id, datosActualizados){
        return this.ventaRepository.actualizarVenta(Id, datosActualizados);
    }

    eliminarVenta(Id){
        return this.ventaRepository.eliminarVenta(Id);
    }
}

module.exports = extraService