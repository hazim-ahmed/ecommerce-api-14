const express = require('express');
const router = express.Router();
const couponUsageController = require('../controllers/CouponUsageController');

const { createCouponUsageValidation } = require('../validations/couponUsage.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/coupon-usages', createCouponUsageValidation, validateRequest, couponUsageController.createCouponUsage);
router.get('/coupon-usages', couponUsageController.getCouponUsages);
router.get('/coupon-usages/:id', couponUsageController.getCouponUsageById);
router.put('/coupon-usages/:id', couponUsageController.updateCouponUsage);
router.delete('/coupon-usages/:id', couponUsageController.deleteCouponUsage);

module.exports = router;
