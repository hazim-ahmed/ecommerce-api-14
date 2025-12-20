const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

const upload = require('../middleware/upload');
const { createProductValidation, updateProductValidation } = require('../validations/product.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/products', upload.array('product_images', 5), createProductValidation, validateRequest, productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', upload.array('product_images', 5), updateProductValidation, validateRequest, productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
