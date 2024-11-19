const CitaRepository = require('../Repositories/citasRepository');
const db = require('../database/conexion');

class CitasServices {
  constructor() {
    this.CitaRepository = new CitaRepository(db);
    }
  
    obtenerCitas(page, limit) {
      const offset = (page-1) * limit;
      return this.CitaRepository.obtenerCitas(limit, offset);
    }
  
    obtenerCitasPorId(Id) {
      return this.CitaRepository.obtenerCitasPorId(Id);
    }
  
    crearCitas(nuevoProducto) {
      return this.CitaRepository.crearCitas(nuevoProducto);
    }
  
    actualizarCitas(Id, datosActualizados) {
      return this.CitaRepository.actualizarCitas(Id, datosActualizados);
    }
  
    eliminarCitas(Id) {
      return this.CitaRepository.eliminarCitas(Id);
    }
  }
  
  module.exports = CitasServices;
  