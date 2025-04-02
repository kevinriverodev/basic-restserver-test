const { isValidObjectId } = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");

const searchUsers = async (term, res) => {

    if (isValidObjectId(term)) {
        const user = await User.findById(term);

        return res.status(200).json({ results: user });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{ name: regex}, { email: regex }],
        $and: [{ status: true }]
    });

    res.status(200).json({ results: users });
}

const searchProducts = async (term, res) => {

    if (isValidObjectId(term)) {
        const product = await Product.findById(term);

        return res.status(200).json({ results: product });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({ name: regex, status: true }).populate('category');

    res.status(200).json({ results: products });
}

const searchCategories = async (term, res) => {

    if (isValidObjectId(term)) {
        const category = await Category.findById(term);

        return res.status(200).json({ results: category });
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({ name: regex, status: true }).populate('category');

    res.status(200).json({ results: categories });
}

const search = async (req, res) => {
    const { collection, term } = req.params;

    switch (collection) {
        case 'usuarios':
            await searchUsers(term, res);    
            break;
        case 'productos':
            await searchProducts(term, res);
        break;
        case 'categorias':
            await searchCategories(term, res);
        break;
        default:
            res.status(500).json( {msg: 'Metodo de busqueda no implementado'} );
            break;
    }
}

module.exports = {
    search
}