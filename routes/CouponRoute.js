const express = require('express');
const router = express.Router();
const couponController = require('../controllers/CouponController');

const { createCouponValidation, updateCouponValidation } = require('../validations/coupon.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/coupons', createCouponValidation, validateRequest, couponController.createCoupon);
router.get('/coupons', couponController.getCoupons);
router.get('/coupons/:id', couponController.getCouponById);
router.put('/coupons/:id', updateCouponValidation, validateRequest, couponController.updateCoupon);
router.delete('/coupons/:id', couponController.deleteCoupon);

module.exports = router;
