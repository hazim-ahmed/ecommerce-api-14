const express = require('express');
const router = express.Router();
const productOptionController = require('../controllers/ProductOptionController');

router.post('/product-options', productOptionController.createProductOption);
router.get('/product-options', productOptionController.getProductOptions);
router.get('/product-options/:id', productOptionController.getProductOptionById);
router.put('/product-options/:id', productOptionController.updateProductOption);
router.delete('/product-options/:id', productOptionController.deleteProductOption);

module.exports = router;
