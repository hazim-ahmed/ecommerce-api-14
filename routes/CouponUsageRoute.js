const express = require('express');
const router = express.Router();
const couponUsageController = require('../controllers/CouponUsageController');

router.post('/coupon-usages', couponUsageController.createCouponUsage);
router.get('/coupon-usages', couponUsageController.getCouponUsages);
router.get('/coupon-usages/:id', couponUsageController.getCouponUsageById);
router.put('/coupon-usages/:id', couponUsageController.updateCouponUsage);
router.delete('/coupon-usages/:id', couponUsageController.deleteCouponUsage);

module.exports = router;
