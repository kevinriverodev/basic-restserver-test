const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req , res, next) => {
    const token = req.header('x-token');

    if (!token) res.status(401).json({ msg: 'Token no existente en la peticion' });

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const userAuth = await User.findById({ _id: uid });

        if (!userAuth) return res.status(401).json({ msg: 'Token no valido - usuario no registrado' });

        if (!userAuth.status) return res.status(401).json({ msg: 'Token no valido - usuario inactivo' });

        req.user = userAuth;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no valido' });
    }
}

module.exports = {
    validateJWT
}