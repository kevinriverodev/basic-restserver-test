const isAdminRole = (req, res, next) => {

    if (!req.user.role) return res.status(500).json({ msg: 'No se puede verificar rol sin el token' });
    if(req.user.role !== 'ADMIN_ROLE') return res.status(500).json({ msg: 'El usuario no puede realizar esta operacion' });

    next();
}

const isRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) return res.status(401).json({ msg: 'Rol no existente entre los permitidos' });

        next();
    };
}

module.exports = {
    isAdminRole,
    isRole
}