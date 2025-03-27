const { Router } = require('express');
const { deleteUser, putUser, postUser, getUser } = require('../controllers/user');
const router = Router();

router.get('/', getUser);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/', deleteUser);

module.exports = router;