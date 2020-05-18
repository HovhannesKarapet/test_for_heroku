const express = require('express');
const router = express.Router();

const controller = require('../controllers/category-items');
const validator = require('../middlewares/validators/category-items');
const middleware = require('../middlewares/parse');

const upload = require('../helpers/uploader');

// api/category_items
router.get('/category/:category_id', controller.getCategoryItems);
router.get('/best_sellers', controller.getBestSellers);
router.post('/:category_id', upload.single('file'), middleware.JSONParse(['name', 'description']), validator.categoryItemValidationRules(), validator.categoryItemValidate, controller.createCategoryItem);
router.put('/:category_item_id', upload.single('file'), middleware.JSONParse(['name', 'description']), controller.updateCategoryItem);
router.delete('/:category_item_id', controller.removeCategoryItem);

module.exports = router;
