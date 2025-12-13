const { body, param } = require('express-validator');
const { User, Store, Address, Coupon } = require('../models');

const createOrderValidation = [
    body('order_number')
        .trim()
        .notEmpty().withMessage('Order number is required')
        .isLength({ max: 20 }),

    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('User not found');
        }),

    body('store_id')
        .notEmpty().withMessage('Store ID is required')
        .isInt()
        .custom(async (value) => {
            const store = await Store.findByPk(value);
            if (!store) throw new Error('Store not found');
        }),

    body('address_id')
        .notEmpty().withMessage('Address ID is required')
        .isInt()
        .custom(async (value) => {
            const address = await Address.findByPk(value);
            if (!address) throw new Error('Address not found');
        }),

    body('subtotal')
        .notEmpty().withMessage('Subtotal is required')
        .isFloat({ min: 0 }),

    body('delivery_fee')
        .notEmpty().withMessage('Delivery fee is required')
        .isFloat({ min: 0 }),

    body('total')
        .notEmpty().withMessage('Total is required')
        .isFloat({ min: 0 }),

    body('payment_method')
        .notEmpty().withMessage('Payment method is required')
        .isIn(['cash', 'card', 'wallet']).withMessage('Invalid payment method'),

    body('delivery_address')
        .notEmpty().withMessage('Delivery address details (JSON) are required'),
    // .isJSON() // sequelize handles json, but input might be object or string.

    body('coupon_id')
        .optional()
        .isInt()
        .custom(async (value) => {
            const coupon = await Coupon.findByPk(value);
            if (!coupon) throw new Error('Coupon not found');
        }),

    body('driver_id')
        .optional()
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('Driver (User) not found');
            // Optional: check if user_type is 'driver'
            if (user.user_type !== 'driver') throw new Error('User is not a driver');
        })
];

const updateOrderValidation = [
    param('id').isInt().withMessage('Invalid order ID'),

    body('order_status')
        .optional()
        .isIn(['pending', 'accepted', 'preparing', 'ready', 'picked', 'on_way', 'delivered', 'rejected'])
        .withMessage('Invalid order status'),

    body('payment_status')
        .optional()
        .isIn(['pending', 'paid', 'failed'])
        .withMessage('Invalid payment status')
];

module.exports = {
    createOrderValidation,
    updateOrderValidation
};
