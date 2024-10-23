
const UserRepository = require('../Repositories/UserRepository'); // Asegúrate de que esta ruta sea correcta

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async ObtenerUser() {
        return await this.userRepository.getUsers(); // Asegúrate de usar el método correcto
    }
}

// Puedes crear una instancia de UserService y exportarla
const userService = new UserService(new UserRepository());
module.exports = userService;

module.exports = UserService;
