const getUser = (req, res) => {

    const { nombre, edad, nacionalidad } = req.query;
    
    res.json({
        msg: 'get method in user',
        nombre,
        edad,
        nacionalidad
    });
}

const postUser = (req, res) => {

    const data = req.body;

    res.json({
        msg: 'post method in user',
        data
    });
}

const putUser = (req, res) => {
    
    const { id } = req.params;

    res.json({
        msg: 'put method in user',
        id
    });
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'delete method in user'
    });
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}