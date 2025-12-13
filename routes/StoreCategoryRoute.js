const express = require('express');
const router = express.Router();
const storeCategoryController = require('../controllers/StoreCategoryController');

const { createStoreCategoryValidation, updateStoreCategoryValidation } = require('../validations/storeCategory.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/store-categories', createStoreCategoryValidation, validateRequest, storeCategoryController.createStoreCategory);
router.get('/store-categories', storeCategoryController.getStoreCategories);
router.get('/store-categories/:id', storeCategoryController.getStoreCategoryById);
router.put('/store-categories/:id', updateStoreCategoryValidation, validateRequest, storeCategoryController.updateStoreCategory);
router.delete('/store-categories/:id', storeCategoryController.deleteStoreCategory);

module.exports = router;
