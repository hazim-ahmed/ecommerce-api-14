const express = require('express');
const router = express.Router();
const storeCategoryController = require('../controllers/StoreCategoryController');

router.post('/store-categories', storeCategoryController.createStoreCategory);
router.get('/store-categories', storeCategoryController.getStoreCategories);
router.get('/store-categories/:id', storeCategoryController.getStoreCategoryById);
router.put('/store-categories/:id', storeCategoryController.updateStoreCategory);
router.delete('/store-categories/:id', storeCategoryController.deleteStoreCategory);

module.exports = router;
