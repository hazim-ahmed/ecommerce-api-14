const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/ProductCategoryController');

router.post('/product-categories', productCategoryController.createProductCategory);
router.get('/product-categories', productCategoryController.getProductCategories);
router.get('/product-categories/:id', productCategoryController.getProductCategoryById);
router.put('/product-categories/:id', productCategoryController.updateProductCategory);
router.delete('/product-categories/:id', productCategoryController.deleteProductCategory);

module.exports = router;
