const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUser = async (req, res) => {

    const query = req.query;

    const [ total, users ] = await Promise.all([
        User.countDocuments({status: true } ),
        User.find( {status: true } )
    ]);

    res.json({
        total,
        users
    });
}

const postUser = (req, res) => {

    const { name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    user.save();

    res.json({
        user
    });
}

const putUser = async (req, res) => {
    
    const { id } = req.params;
    const { __id, password, google, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}