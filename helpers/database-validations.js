const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const exist = await Role.findOne({ name: role });
    if (!exist) throw new Error('El rol ingresado no existe en la BD');
}

const emailExist = async (email = '') => {
    const exist = await User.findOne({ email });
    if (exist) throw new Error('El correo ya existe en la base de datos');
} 

const userExist = async (id = '') => {
    const exist = await User.findById(id);
    
    if (!exist) throw new Error('El usuario con el id ingresado no existe en la base de datos');
}

module.exports = {
    isValidRole,
    emailExist,
    userExist
}