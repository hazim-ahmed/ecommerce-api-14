const { body } = require('express-validator');
const { User } = require('../models');

const signupValidation = [
    body('user_name')
        .trim()
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 3, max: 100 }).withMessage('User name must be between 3 and 100 characters'),

    body('email')
        .optional() // Email is optional in schema, but if provided, must be valid and unique
        .trim()
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) throw new Error('Email already already in use');
        }),

    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isLength({ min: 8, max: 20 }).withMessage('Phone number must be between 8 and 20 characters')
        .custom(async (value) => {
            const user = await User.findOne({ where: { phone: value } });
            if (user) throw new Error('Phone number already in use');
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('user_type')
        .notEmpty().withMessage('User type is required')
        .isIn(['customer', 'vendor', 'driver']).withMessage('Invalid user type') // Admin usually not created via public API
];

const loginValidation = [
    body('identifier') // Can be email or phone
        .notEmpty().withMessage('Email or Phone is required'),

    body('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = {
    signupValidation,
    loginValidation
};
