const express = require('express');
const router = express.Router();
const couponController = require('../controllers/CouponController');

router.post('/coupons', couponController.createCoupon);
router.get('/coupons', couponController.getCoupons);
router.get('/coupons/:id', couponController.getCouponById);
router.put('/coupons/:id', couponController.updateCoupon);
router.delete('/coupons/:id', couponController.deleteCoupon);

module.exports = router;
