const Router = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { uploadFile, getImage, uploadImageCloudinary } = require('../controllers/upload');
const { isAllowedCollection } = require('../helpers/database-validations');

const router = Router();

router.post('/', uploadFile);

router.put('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(collection => isAllowedCollection(collection, ['usuarios', 'productos'])),
    validateFields
], uploadImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(collection => isAllowedCollection(collection, ['usuarios', 'productos'])),
    validateFields
], getImage);

module.exports = router;