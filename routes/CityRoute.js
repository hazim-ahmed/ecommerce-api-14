const express = require('express');
const router = express.Router();
const cityController = require('../controllers/CityController');

const { createCityValidation, updateCityValidation } = require('../validations/city.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/cities', createCityValidation, validateRequest, cityController.createCity);
router.get('/cities', cityController.getCities);
router.get('/cities/:id', cityController.getCityById);
router.put('/cities/:id', updateCityValidation, validateRequest, cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);

module.exports = router;
