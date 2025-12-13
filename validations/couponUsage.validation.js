const { body } = require('express-validator');
const { Coupon, User, Order } = require('../models');

const createCouponUsageValidation = [
    body('coupon_id')
        .notEmpty().withMessage('Coupon ID is required')
        .isInt()
        .custom(async (value) => {
            const coupon = await Coupon.findByPk(value);
            if (!coupon) throw new Error('Coupon not found');
        }),

    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('User not found');
        }),

    body('order_id')
        .notEmpty().withMessage('Order ID is required')
        .isInt()
        .custom(async (value) => {
            const order = await Order.findByPk(value);
            if (!order) throw new Error('Order not found');
        }),

    body('discount_amount')
        .notEmpty().withMessage('Discount amount is required')
        .isFloat({ min: 0 })
];

module.exports = {
    createCouponUsageValidation
};
