const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, isRole } = require('../middlewares/validate-role');

const { isValidRole, emailExist, userExist } = require('../helpers/database-validations');
const { deleteUser, putUser, postUser, getUser } = require('../controllers/user');

const router = Router();

router.get('/', getUser);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasena debe tenr una longitud de minimo 6 caracteres').isLength({ min:6 }),
    check('email', "El correo no es valido").isEmail(),
    check('role').custom(isValidRole),
    check('email').custom(emailExist),
    validateFields
], postUser);

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(userExist),
    check('role').custom(isValidRole),
    validateFields
], putUser);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    isRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(userExist),
    check('role').custom(isValidRole),
    validateFields
], deleteUser);

module.exports = router;