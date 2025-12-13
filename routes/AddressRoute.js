const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');

const { createAddressValidation, updateAddressValidation } = require('../validations/address.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/addresses', createAddressValidation, validateRequest, addressController.createAddress);
router.get('/addresses', addressController.getAddresses);
router.get('/addresses/:id', addressController.getAddressById);
router.put('/addresses/:id', updateAddressValidation, validateRequest, addressController.updateAddress);
router.delete('/addresses/:id', addressController.deleteAddress);

module.exports = router;
