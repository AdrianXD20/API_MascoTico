const fs = require('fs-extra');
const User = require('../Models/UserModel.js');

const filePath = './Data/Users.json';

class UserRepository {
    // Método para guardar usuarios en el archivo JSON
    async saveUsers(users) {
        try {
            await fs.writeJson(filePath, users);
        } catch (error) {
            console.error('Error al guardar usuarios:', error.message);
        }
    }

    // Método para obtener usuarios desde el archivo JSON
    async getUsers() {
        try {
            const data = await fs.readJson(filePath);
            
            // Verifica si los datos son un array
            if (!Array.isArray(data)) {
                throw new Error('Los datos de usuarios no son un array');
            }

            // Mapea los datos a instancias de la clase User
            return data.map(user => new User(user.Id, user.Name, user.Password));
        } catch (error) {
            console.error('Error en getUsers:', error.message);
            return []; // Devuelve un array vacío en caso de error
        }
    }
}

module.exports = UserRepository; // Exporta la clase UserRepository
