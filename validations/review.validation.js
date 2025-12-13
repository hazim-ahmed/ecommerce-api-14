const { body, param } = require('express-validator');
const { User, Order, Store } = require('../models');

const createReviewValidation = [
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

    body('review_type')
        .notEmpty().withMessage('Review type is required')
        .isIn(['store', 'driver']).withMessage('Review type must be store or driver'),

    body('target_id')
        .notEmpty().withMessage('Target ID is required')
        .isInt()
        .custom(async (value, { req }) => {
            if (req.body.review_type === 'store') {
                const store = await Store.findByPk(value);
                if (!store) throw new Error('Target Store not found');
            } else if (req.body.review_type === 'driver') {
                const driver = await User.findByPk(value);
                if (!driver) throw new Error('Target Driver (User) not found');
                // Optional: check user_type
                // if (driver.user_type !== 'driver') throw new Error('Target user is not a driver');
            }
        }),

    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

    body('review_comment')
        .optional()
        .isString()
];

const updateReviewValidation = [
    param('id').isInt().withMessage('Invalid review ID'),

    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 }),

    body('review_comment')
        .optional()
        .isString(),

    body('is_visible')
        .optional()
        .isBoolean()
];

module.exports = {
    createReviewValidation,
    updateReviewValidation
};
