const express = require('express');
const router = express.Router();
const storeController = require('../controllers/StoreController');

const { createStoreValidation, updateStoreValidation } = require('../validations/store.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/stores', createStoreValidation, validateRequest, storeController.createStore);
router.get('/stores', storeController.getStores);
router.get('/stores/:id', storeController.getStoreById);
router.put('/stores/:id', updateStoreValidation, validateRequest, storeController.updateStore);
router.delete('/stores/:id', storeController.deleteStore);

module.exports = router;
