const path = require('path');
const fs = require('fs');

const { uploadFileHelper } = require('../helpers/upload-file');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Product = require('../models/product');
const User = require('../models/user');

const uploadFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No se subieron archivos' });
    }
    
    try {
        const name = await uploadFileHelper(req.files);

        res.json(name);

    } catch (error) {
        res.json({ error });        
    }
}

const uploadImage = async (req, res) => {
    const { collection, id } = req.params;
    let model = null;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No se subieron archivos' });
    }

    try {
        switch (collection) {
            case 'usuarios':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: 'No existe el usuario con el id ingresado' });
            break;
            case 'productos':
                model = await Product.findById(id);
                if (!model) return res.status(400).json({ msg: 'No existe el producto con el id ingresado' });
            break;
            default:
                return res.status(500).json({ msg: 'Colecion ingresada no permitida para subir imagenes' });
        }
    
        if (model.img) {
            const oldFilePath = path.join(__dirname, '../uploads/', collection, model.img);
    
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
    
        const fileName = await uploadFileHelper(req.files, undefined, collection);
        model.img = fileName;
        await model.save();
    
        res.json(model);
    } catch (error) {
        res.json({ error });        
    }
}

const uploadImageCloudinary = async (req, res) => {
    const { collection, id } = req.params;
    let model = null;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No se subieron archivos' });
    }

    try {
        switch (collection) {
            case 'usuarios':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: 'No existe el usuario con el id ingresado' });
            break;
            case 'productos':
                model = await Product.findById(id);
                if (!model) return res.status(400).json({ msg: 'No existe el producto con el id ingresado' });
            break;
            default:
                return res.status(500).json({ msg: 'Colecion ingresada no permitida para subir imagenes' });
        }
    
        //Borrar imagen de cloudinary
        if (model.img) {
            const arr = model.img.split('/');
            const  [ public_id ] = arr[arr.length - 1].split('.');

            cloudinary.uploader.destroy(public_id);
        }
    
        const { secure_url } = await cloudinary.uploader.upload(req.files.file.tempFilePath);
        model.img = secure_url;
        model.save();

        res.json(model);
    } catch (error) {
        res.json({ error });        
    }
}

const getImage = async (req, res) => {
    const { collection, id } = req.params;
    let model = null;

    try {
        switch (collection) {
            case 'usuarios':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: 'No existe el usuario con el id ingresado' });
            break;
            case 'productos':
                model = await Product.findById(id);
                if (!model) return res.status(400).json({ msg: 'No existe el producto con el id ingresado' });
            break;
            default:
                res.status(500).json({ msg: 'Colecion ingresada no permitida para subir imagenes' });
                break;
        }
    
        if (model.img) {
            const imgPath = path.join(__dirname, '../uploads/', collection, model.img);
    
            if (fs.existsSync(imgPath)) return res.sendFile(imgPath);
        }

        const defaultImgPath = path.join(__dirname, '../assets/', 'no-image.jpg');
        
        res.sendFile(defaultImgPath);
        
    } catch (error) {
        res.json({ error });        
    }
}

module.exports = {
    uploadFile,
    uploadImage,
    uploadImageCloudinary,
    getImage
}