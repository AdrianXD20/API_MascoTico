class ProductoController {
  constructor(productoService) {
    this.productoService = productoService;
  }

  async obtenerProductos(req, res) {
    try {
      const {page=1, limit} = req.query
      const pageNumber= parseInt(page);
      const pageSize = parseInt(limit);
      const productos = await this.productoService.obtenerProductos(pageNumber,pageSize);
      res.json(productos);
    } catch (error) {
      console.error('Error en obtenerProductos:', error); 
      res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  }

  async obtenerProductoPorId(req, res) {
    try {
      const id = req.params.id;
      const producto = await this.productoService.obtenerProductoPorId(id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error en obtenerProductoPorId:', error); 
      res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  }

  async crearProducto(req, res) {
    try {
      const nuevoProducto = req.body;
      const producto = await this.productoService.crearProducto(nuevoProducto);
      res.status(201).json(producto);
    } catch (error) {
      console.error('Error en crearProducto:', error); 
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  }

  async actualizarProducto(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const producto = await this.productoService.actualizarProducto(id, datosActualizados);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error en actualizarProducto:', error); 
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  }

  async eliminarProducto(req, res) {
    try {
      const id = req.params.id;
      const eliminado = await this.productoService.eliminarProducto(id);
      if (eliminado) {
        res.json({ message: 'Producto eliminado' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error en eliminarProducto:', error); 
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  }
}

module.exports = ProductoController;
