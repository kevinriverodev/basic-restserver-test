const Product = require('../models/product');
const Category = require('../models/category');
const category = require('../models/category');

const getProducts = async (req, res) => {
    try {
        const [ total, products ] = await Promise.all([
            Product.countDocuments({ status: true } ),
            Product.find({ status: true }).populate('category').populate('user').exec()
        ]);

        res.status(200).json({ total, products });
    } catch (error) {
        res.status(500).json({ msg: 'No se pudieron obtener los productos - Error interno' });
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('category').populate('user').exec();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo encontrar el producto' });
    }
}

const saveProduct = async (req, res) => {
    const { name, description = '', status = true, availability = true, categoryName } = req.body;

    try {
        const { _id } = await Category.findOne({ name: categoryName.toUpperCase() });

        const userId = req.user._id;
    
        const product = new Product({ name: name.toUpperCase(), description, status, availability, user: userId, category: _id });

        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo registrar el producto - Error interno' });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, availability, categoryName } = req.body;

    try {
        const { _id } = await Category.findOne({ name: categoryName.toUpperCase() });

        const product = await Product.findByIdAndUpdate(id, { name: name.toUpperCase(), description, availability, category:_id });
    
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo actualizar el producto' });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
        const product = await Product.findByIdAndUpdate(id, { status: false });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo eliminar el producto' });
    }
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}