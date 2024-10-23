const UserRepository = require('../Repositories/UserRepository'); // Asegúrate de instanciar UserRepository
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = '123';

const userRepository = new UserRepository(); // Crear una instancia de UserRepository

async function register(Name, Password) {
    const users = await userRepository.getUsers();
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Asegúrate de que el nuevo ID sea único
    const newUser = { Id: users.length > 0 ? users[users.length - 1].Id + 1 : 1, Name, Password: hashedPassword };
    users.push(newUser);
    await userRepository.saveUsers(users);

    return newUser;
}

async function login(Name, Password) {
    const users = await userRepository.getUsers();
    const user = users.find(u => u.Name === Name);

    if (!user || !(await bcrypt.compare(Password, user.Password))) {
        throw new Error('Credenciales inválidas');
    }

    // Cambia users.Id y users.Name por user.Id y user.Name
    const token = jwt.sign({ Id: user.Id, Name: user.Name }, secretKey, { expiresIn: '1h' });
    return token;
}

module.exports = {
    register,
    login
};
