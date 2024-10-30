const CitaRepository = require('../Repositories/citasRepository');
const db = require('../database/conexion');

class CitasServices {
  constructor() {
    this.CitaRepository = new CitaRepository(db);
    }
  
    obtenerCitas() {
      return this.CitaRepository.obtenerCitas();
    }
  
    obtenerCitasPorId(Id) {
      return this.citasRepository.obtenerCitasPorId(Id);
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
  