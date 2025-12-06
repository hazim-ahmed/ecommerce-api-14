const express = require('express');
const router = express.Router();
const cityController = require('../controllers/CityController');

router.post('/cities', cityController.createCity);
router.get('/cities', cityController.getCities);
router.get('/cities/:id', cityController.getCityById);
router.put('/cities/:id', cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);

module.exports = router;
