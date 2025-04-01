const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { authLogin, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validateFields
], authLogin);


router.post('/google', [
    check('id_token', 'El token no es valido').not().isEmpty(),
    validateFields
], googleSignIn);
module.exports = router;