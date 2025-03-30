const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { authLogin } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validateFields
], authLogin);

module.exports = router;