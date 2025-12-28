const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');

const { createAddressValidation, updateAddressValidation } = require('../validations/address.validation');
const validateRequest = require('../middleware/validateRequest');

const { authenticate } = require('../middleware/authMiddleware');

router.post('/addresses', authenticate, createAddressValidation, validateRequest, addressController.createAddress);
router.get('/addresses', authenticate, addressController.getAddresses);
router.get('/addresses/:id', authenticate, addressController.getAddressById);
router.put('/addresses/:id', authenticate, updateAddressValidation, validateRequest, addressController.updateAddress);
router.delete('/addresses/:id', authenticate, addressController.deleteAddress);

module.exports = router;
