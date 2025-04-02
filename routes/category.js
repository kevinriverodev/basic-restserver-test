const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { saveCategory, getCategories, getCategory, deleteCategory, updateCategory } = require('../controllers/category');
const { categoryExist } = require('../helpers/database-validations');
const { isAdminRole, isRole } = require('../middlewares/validate-role');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    validateJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoryExist),
    validateFields
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validateFields
], saveCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoryExist),
    validateFields
],updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    isRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoryExist),
    validateFields
], deleteCategory);

module.exports = router;