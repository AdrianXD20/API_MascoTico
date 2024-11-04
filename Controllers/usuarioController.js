
class UsuarioController{
    constructor(userService){
        this.userService = userService;
    }

    async crearUsuario(req, res) {
        try {
          const nuevoUsuario = req.body;
          const User = await this.userService.crearUsuario(nuevoUsuario);
          res.status(201).json(User);
        } catch (error) {
          console.error('Error creando nuevo Usuario :', error); 
          res.status(500).json({ message: 'Error al crear el usuario :(', error: error.message });
        }
      }

      async login(req, res) {
        try {
            const { email, contraseña } = req.body;
            if (!email || !contraseña) {
                return res.status(400).json({ message: 'Faltan campos obligatorios' });
            }
    
            const { JWT, user } = await this.userService.login(email, contraseña);
            res.status(200).json({ JWT, user });
        } catch (error) {
            console.error('Error al logear el usuario :', error);
            res.status(401).json({ message: 'Credenciales inválidas', error: error.message });
        }
    }


}

module.exports = UsuarioController;