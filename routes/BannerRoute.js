const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/BannerController');

const { createBannerValidation, updateBannerValidation } = require('../validations/banner.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/banners', createBannerValidation, validateRequest, bannerController.createBanner);
router.get('/banners', bannerController.getBanners);
router.get('/banners/:id', bannerController.getBannerById);
router.put('/banners/:id', updateBannerValidation, validateRequest, bannerController.updateBanner);
router.delete('/banners/:id', bannerController.deleteBanner);

module.exports = router;
