const productoRepository = require('../Repositories/productoRepository');
const db = require('../database/conexion');

class ProductoService {
  constructor() {
    this.productoRepository = new productoRepository(db);
    }
  
    obtenerProductos() {
      return this.productoRepository.obtenerProductos();
    }
  
    obtenerProductoPorId(Id) {
      return this.productoRepository.obtenerProductoPorId(Id);
    }
  
    crearProducto(nuevoProducto) {
      return this.productoRepository.crearProducto(nuevoProducto);
    }
  
    actualizarProducto(Id, datosActualizados) {
      return this.productoRepository.actualizarProducto(Id, datosActualizados);
    }
  
    eliminarProducto(Id) {
      return this.productoRepository.eliminarProducto(Id);
    }
  }
  
  module.exports = ProductoService;
  