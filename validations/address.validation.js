const { body, param } = require('express-validator');
const { City, User } = require('../models');

const createAddressValidation = [
    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('User not found');
        }),

    body('city_id')
        .notEmpty().withMessage('City ID is required')
        .isInt()
        .custom(async (value) => {
            const city = await City.findByPk(value);
            if (!city) throw new Error('City not found');
        }),

    body('address_title')
        .trim()
        .notEmpty().withMessage('Address title is required')
        .isLength({ max: 50 }),

    body('address_line')
        .optional()
        .isString()
        .isLength({ max: 255 }),

    body('address_lat')
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }),

    body('address_lng')
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }),

    body('is_default')
        .optional()
        .isBoolean()
];

const updateAddressValidation = [
    param('id').isInt().withMessage('Invalid address ID'),

    body('address_title')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ max: 50 }),

    body('is_default')
        .optional()
        .isBoolean()
];

module.exports = {
    createAddressValidation,
    updateAddressValidation
};
