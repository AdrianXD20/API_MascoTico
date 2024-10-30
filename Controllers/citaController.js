class CitaController {
    constructor(citasService) {
      this.citasService = citasService;
    }
  
    async obtenerCitas(req, res) {
      try {
        const productos = await this.citasService.obtenerCitas();
        res.json(productos);
      } catch (error) {
        console.error('Error en obtener Citas:', error); 
        res.status(500).json({ message: 'Error al obtener las Citas', error: error.message });
      }
    }
  
    async obtenerCitasPorId(req, res) {
      try {
        const id = req.params.id;
        const producto = await this.citasService.obtenerCitasPorId(id);
        if (producto) {
          res.json(producto);
        } else {
          res.status(404).json({ message: 'Cita no encontrado' });
        }
      } catch (error) {
        console.error('Error en obtener Cita Por Id:', error); 
        res.status(500).json({ message: 'Error al obtener la Cita', error: error.message });
      }
    }
  
    async crearCitas(req, res) {
      try {
        const nuevoProducto = req.body;
        const producto = await this.citasService.crearCitas(nuevoProducto);
        res.status(201).json(producto);
      } catch (error) {
        console.error('Error en crear Citas:', error); 
        res.status(500).json({ message: 'Error al crear la Cita', error: error.message });
      }
    }
  
    async actualizarCitas(req, res) {
      try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const producto = await this.citasService.actualizarCitas(id, datosActualizados);
        if (producto) {
          res.json(producto);
        } else {
          res.status(404).json({ message: 'Cita no encontrado' });
        }
      } catch (error) {
        console.error('Error en actualizarMascota:', error); 
        res.status(500).json({ message: 'Error al actualizar la Cita', error: error.message });
      }
    }
  
    async eliminarCitas(req, res) {
      try {
        const id = req.params.id;
        const eliminado = await this.citasService.eliminarCitas(id);
        if (eliminado) {
          res.json({ message: 'Cita eliminada' });
        } else {
          res.status(404).json({ message: 'Cita no encontrada' });
        }
      } catch (error) {
        console.error('Error en eliminar Citas:', error); 
        res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
      }
    }
  }
  
  module.exports = CitaController;
  