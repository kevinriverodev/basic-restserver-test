const { generateJWT } = require('../helpers/generate-jwt');
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

module.exports = {
    authLogin
}