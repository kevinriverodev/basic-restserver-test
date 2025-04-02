const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getProducts, getProduct, saveProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { productExist, categoryExistByName, productExistByName } = require('../helpers/database-validations');
const { isAdminRole } = require('../middlewares/validate-role');

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], getProducts);

router.get('/:id', [
    validateJWT,
    check('id', 'El id ingresado no es valido').isMongoId(),
    check('id').custom(productExist),
    validateFields
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'El nombre no es valido').not().isEmpty(),
    check('availability', 'La disponibilidad ingresada no es valida').isBoolean(),
    check('name').custom(productExistByName),
    check('categoryName').custom(categoryExistByName),
    validateFields
], saveProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'El id ingresado no es valido').isMongoId(),
    check('name', 'El nombre no es valido').not().isEmpty(),
    check('availability', 'La disponibilidad ingresada no es valida').isBoolean(),
    check('id').custom(productExist),
    check('categoryName').custom(categoryExistByName),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'El id ingresado no es valido').isMongoId(),
    check('id').custom(productExist),
    validateFields
], deleteProduct);

module.exports = router;