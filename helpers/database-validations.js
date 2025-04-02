const Category = require('../models/category');
const Product = require('../models/product');
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

const categoryExist = async (id = '') => {
   const category = await Category.findById(id);

   if (!category) throw new Error('La categoria con el id ingresado no existe en la base de datos');
}

const categoryExistByName = async (name = '') => {
    const category = await Category.findOne({ name: name.toUpperCase() });

    if (!category) throw new Error('La categoria no existe en la base de datos');
}

const productExist = async (id = '') => {
    const product = await Product.findById(id);

    if (!product) throw new Error('El producto no esta registrado en la base de datos');
}

const productExistByName = async (name = '') => {
    const product = await Product.findOne({ name: name.toUpperCase() });

    if (product)  throw new Error('El producto ya esta registrado en la base de datos');
} 

module.exports = {
    isValidRole,
    emailExist,
    userExist,
    categoryExist,
    categoryExistByName,
    productExist,
    productExistByName
}