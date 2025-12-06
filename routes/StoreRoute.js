const express = require('express');
const router = express.Router();
const storeController = require('../controllers/StoreController');

router.post('/stores', storeController.createStore);
router.get('/stores', storeController.getStores);
router.get('/stores/:id', storeController.getStoreById);
router.put('/stores/:id', storeController.updateStore);
router.delete('/stores/:id', storeController.deleteStore);

module.exports = router;
