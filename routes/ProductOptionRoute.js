const express = require('express');
const router = express.Router();
const productOptionController = require('../controllers/ProductOptionController');

const { createProductOptionValidation, updateProductOptionValidation } = require('../validations/productOption.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/product-options', createProductOptionValidation, validateRequest, productOptionController.createProductOption);
// router.post('/product-options', productOptionController.createProductOption); // Alias

router.get('/product-options', productOptionController.getProductOptions);
// router.get('/product-options', productOptionController.getProductOptions); // Alias

router.get('/product-options/:id', productOptionController.getProductOptionById);
router.put('/product-options/:id', updateProductOptionValidation, validateRequest, productOptionController.updateProductOption);
router.delete('/product-options/:id', productOptionController.deleteProductOption);

module.exports = router;
