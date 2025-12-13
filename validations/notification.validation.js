const { body, param } = require('express-validator');
const { User } = require('../models');

const createNotificationValidation = [
    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('User not found');
        }),

    body('notification_title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 150 }),

    body('notification_body')
        .trim()
        .notEmpty().withMessage('Body is required'),

    body('notification_type')
        .notEmpty().withMessage('Type is required')
        .isIn(['order', 'promotion', 'system']),

    body('notification_data')
        .optional()
];

const updateNotificationValidation = [
    param('id').isInt().withMessage('Invalid notification ID'),

    body('is_read')
        .optional()
        .isBoolean()
];

module.exports = {
    createNotificationValidation,
    updateNotificationValidation
};
