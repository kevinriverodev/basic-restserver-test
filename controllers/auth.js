const { generateJWT } = require('../helpers/generate-jwt');
const { verifyGoogle } = require('../helpers/google-verify');
const User = require('../models/user');
const bcryptjs = require('bcryptjs')

const authLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(500).json({msg: 'El correo y/o contrasena son incorrectos'});

    if (!user.status) return res.status(500).json({msg: 'El usuario no esta activo'});

    const isValid = bcryptjs.compareSync(String(password), user.password);

    if (!isValid) return res.status(500).json({msg: 'El correo y/o contrasena son incorrectos'});

    const token = await generateJWT(user.id);

    res.json({
        user,
        token
    });
}

const googleSignIn = async (req, res) => {
    
    const { id_token } = req.body;

    try {
        const { name, email, picture } = await verifyGoogle(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                password: ' ',
                role: 'USER_ROLE',
                img: picture,
                google: true
            }

            user = new User(data);
            await user.save();
        }

        if(!user.status) {
            return res.status(401).json({
                msg: 'Usuario inactivo en la base de datos'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            token,
            user
        });
    } catch (error) {
        if (error) return res.status(400).json({
            msg: 'Token de google no valido'
        });
    }
}

module.exports = {
    authLogin,
    googleSignIn
}