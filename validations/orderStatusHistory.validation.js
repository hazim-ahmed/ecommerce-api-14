const { body, param } = require('express-validator');
const { Order, User } = require('../models');

const createOrderStatusHistoryValidation = [
    body('order_id')
        .notEmpty().withMessage('Order ID is required')
        .isInt()
        .custom(async (value) => {
            const order = await Order.findByPk(value);
            if (!order) throw new Error('Order not found');
        }),

    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'accepted', 'preparing', 'ready', 'picked', 'on_way', 'delivered', 'rejected']),

    body('status_notes')
        .optional()
        .isString(),

    body('created_by')
        .optional()
        .isInt()
        .custom(async (value) => {
            if (!value) return;
            const user = await User.findByPk(value);
            if (!user) throw new Error('User (created_by) not found');
        })
];

module.exports = {
    createOrderStatusHistoryValidation
};
