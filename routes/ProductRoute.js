const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

const { createProductValidation, updateProductValidation } = require('../validations/product.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/products', createProductValidation, validateRequest, productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', updateProductValidation, validateRequest, productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
