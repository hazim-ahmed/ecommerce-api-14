const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/ProductCategoryController');

const { createCategoryValidation, updateCategoryValidation } = require('../validations/category.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/product-categories', createCategoryValidation, validateRequest, productCategoryController.createProductCategory);
router.get('/product-categories', productCategoryController.getProductCategories);
router.get('/product-categories/:id', productCategoryController.getProductCategoryById);
router.put('/product-categories/:id', updateCategoryValidation, validateRequest, productCategoryController.updateProductCategory);
router.delete('/product-categories/:id', productCategoryController.deleteProductCategory);

module.exports = router;
