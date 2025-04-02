const Category = require('../models/category');

const getCategories = async (req, res) =>  {
    try {
        const [ total, categories ] = await Promise.all([
                Category.countDocuments({ status: true } ),
                Category.find( { status: true } ).populate('user').exec()
        ]);

        res.json({
            total,
            categories
        })
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

const getCategory = async (req, res) => {
    
    const { id } = req.params;

    try {
        const category = await Category.findById(id).populate('user').exec();
    
        res.json(category);

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

const saveCategory = async (req, res) => {
    const name = req.body.name.toUpperCase();
    
    try {
        const categoryDB = await Category.findOne({ name });

        if (categoryDB) {
            return res.status(400).json({
                msg: 'La categoria ya existe en la base de datos'
            });
        }

        const data = {
            name,
            status: true,
            user: req.user._id
        }

        const category = new Category(data);

        await category.save();

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    const category = await Category.findByIdAndUpdate(id, {name});

    res.json(category);
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    
    const category = await Category.findByIdAndUpdate(id, { status: false });

    res.json(category);
}

module.exports = {
    saveCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
}