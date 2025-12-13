const { body, param } = require('express-validator');
const { Order, Product } = require('../models');

const createOrderItemValidation = [
    body('order_id')
        .notEmpty().withMessage('Order ID is required')
        .isInt()
        .custom(async (value) => {
            const order = await Order.findByPk(value);
            if (!order) throw new Error('Order not found');
        }),

    body('product_id')
        .notEmpty().withMessage('Product ID is required')
        .isInt()
        .custom(async (value) => {
            const product = await Product.findByPk(value);
            if (!product) throw new Error('Product not found');
        }),

    body('product_name')
        .trim()
        .notEmpty().withMessage('Product name is required'),

    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 1 }),

    body('unit_price')
        .notEmpty().withMessage('Unit price is required')
        .isFloat({ min: 0 }),

    body('total_price')
        .notEmpty().withMessage('Total price is required')
        .isFloat({ min: 0 })
];

const updateOrderItemValidation = [
    param('id').isInt().withMessage('Invalid order item ID'),

    body('quantity')
        .optional()
        .isInt({ min: 1 }),

    body('total_price')
        .optional()
        .isFloat({ min: 0 })
];

module.exports = {
    createOrderItemValidation,
    updateOrderItemValidation
};
