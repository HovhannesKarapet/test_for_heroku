const express = require('express');
const router = express.Router();

const controller = require('../controllers/categories');
const validator = require('../middlewares/validators/categories');
const middleware = require('../middlewares/parse');

const upload = require('../helpers/uploader');

// api/categories
router.get('/', controller.getAllCategories);
router.get('/names', controller.getCategoryNames);
router.post('/',
    upload.single('file'),
    middleware.JSONParse('name'),
    validator.categoryValidationRules(),
    validator.categoryValidate,
    controller.createCategory);
router.put('/:category_id',
    upload.single('file'),
    middleware.JSONParse('name'),
    controller.updateCategory);
router.delete('/:category_id', controller.removeCategory);

module.exports = router;
