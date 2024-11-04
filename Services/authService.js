const UserRepository = require('../Repositories/UserRepository'); // Asegúrate de instanciar UserRepository
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/conexion');


const secretKey = process.env.secretKey

class UserService{
    constructor(){
        this.userRepository = new UserRepository(db)
    }

    crearUsuario(nuevoUsuario){
        return this.userRepository.crearUsuario(nuevoUsuario);
    }

   async login(email,contaseña){
        try{
            const user = await this.userRepository.login(email,contaseña);

            const JWT = jwt.sign(
                {id:user.id, email: user.email, nombre: user.nombre}, secretKey, {expiresIn: '1h'}
            )

            return {JWT, user}
        }
        catch (err){
            throw new Error('Error en el proceso de logeo: ' +err.message)

        }
    }
} 

module.exports = UserService;
