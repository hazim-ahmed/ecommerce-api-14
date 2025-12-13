const { body, param } = require('express-validator');
const { User } = require('../models');
const { Op } = require('sequelize');

const createUserValidation = [
    body('user_name')
        .trim()
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 3, max: 100 }).withMessage('User name must be between 3 and 100 characters'),

    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required')
        .isLength({ min: 8, max: 20 }).withMessage('Phone number must be between 8 and 20 characters')
        .custom(async (value) => {
            const user = await User.findOne({ where: { phone: value } });
            if (user) {
                throw new Error('Phone number already exists');
            }
        }),

    body('email')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            if (!value) return;
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Email already exists');
            }
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('user_type')
        .trim()
        .notEmpty().withMessage('User type is required')
        .isIn(['customer', 'vendor', 'driver', 'admin']).withMessage('Invalid user type. Allowed: customer, vendor, driver, admin'),

    body('user_avatar')
        .optional()
        .isString().withMessage('Avatar must be a string URL'),

    body('fcm_token')
        .optional()
        .isString()
];

const updateUserValidation = [
    param('id')
        .isInt().withMessage('Invalid user ID'),

    body('user_name')
        .optional()
        .trim()
        .notEmpty().withMessage('User name cannot be empty')
        .isLength({ min: 3, max: 100 }).withMessage('User name must be between 3 and 100 characters'),

    body('phone')
        .optional()
        .trim()
        .notEmpty().withMessage('Phone cannot be empty')
        .isLength({ min: 8, max: 20 }).withMessage('Phone number must be between 8 and 20 characters')
        .custom(async (value, { req }) => {
            const user = await User.findOne({
                where: {
                    phone: value,
                    user_id: { [Op.ne]: req.params.id }
                }
            });
            if (user) {
                throw new Error('Phone number already in use by another user');
            }
        }),

    body('email')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage('Invalid email format')
        .custom(async (value, { req }) => {
            if (!value) return;
            const user = await User.findOne({
                where: {
                    email: value,
                    user_id: { [Op.ne]: req.params.id }
                }
            });
            if (user) {
                throw new Error('Email already in use by another user');
            }
        }),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('user_type')
        .optional()
        .trim()
        .isIn(['customer', 'vendor', 'driver', 'admin']).withMessage('Invalid user type'),

    body('user_status')
        .optional()
        .trim()
        .isIn(['active', 'inactive', 'pending', 'blocked']).withMessage('Invalid user status')
];

module.exports = {
    createUserValidation,
    updateUserValidation
};
