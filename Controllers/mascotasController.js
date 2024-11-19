class MascotaController {
    constructor(mascotaService) {
      this.mascotaService = mascotaService;
    }
  
    async obtenerMascotas(req, res) {
      try {
        const {page= 1, limit} = req.query
        const pageNumber = parseInt(page)
        const pageSize = parseInt(limit)
        const productos = await this.mascotaService.obtenerMascotas(pageNumber,pageSize);
        res.json(productos);
      } catch (error) {
        console.error('Error en obtenerMascotas:', error); 
        res.status(500).json({ message: 'Error al obtener las Mascotas', error: error.message });
      }
    }
  
    async obtenerMascotasPorId(req, res) {
      try {
        const id = req.params.id;
        const producto = await this.mascotaService.obtenerMascotasPorId(id);
        if (producto) {
          res.json(producto);
        } else {
          res.status(404).json({ message: 'Mascota no encontrado' });
        }
      } catch (error) {
        console.error('Error en obtenerMascotaPorId:', error); 
        res.status(500).json({ message: 'Error al obtener la Mascota', error: error.message });
      }
    }
  
    async crearMascotas(req, res) {
      try {
        const nuevoProducto = req.body;
        const producto = await this.mascotaService.crearMascotas(nuevoProducto);
        res.status(201).json(producto);
      } catch (error) {
        console.error('Error en crearMascota:', error); 
        res.status(500).json({ message: 'Error al crear la Mascota', error: error.message });
      }
    }
  
    async actualizarMascotas(req, res) {
      try {
        const id = req.params.id;
        const datosActualizados = req.body;
        const producto = await this.mascotaService.actualizarMascotas(id, datosActualizados);
        if (producto) {
          res.json(producto);
        } else {
          res.status(404).json({ message: 'Mascota no encontrado' });
        }
      } catch (error) {
        console.error('Error en actualizarMascota:', error); 
        res.status(500).json({ message: 'Error al actualizar la Mascota', error: error.message });
      }
    }
  
    async eliminarMascotas(req, res) {
      try {
        const id = req.params.id;
        const eliminado = await this.mascotaService.eliminarMascotas(id);
        if (eliminado) {
          res.json({ message: 'Mascota eliminado' });
        } else {
          res.status(404).json({ message: 'Mascota no encontrado' });
        }
      } catch (error) {
        console.error('Error en eliminarMascota:', error); 
        res.status(500).json({ message: 'Error al eliminar la mascota', error: error.message });
      }
    }
  }
  
  module.exports = MascotaController;
  