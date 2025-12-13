const { body, param } = require('express-validator');

const createCityValidation = [
    body('city_name')
        .trim()
        .notEmpty().withMessage('City name is required')
        .isLength({ max: 100 }),

    body('city_name_en')
        .optional()
        .trim()
        .isString()
        .isLength({ max: 100 }),

    body('price_per_km')
        .notEmpty().withMessage('Price per KM is required')
        .isFloat({ min: 0 }),

    body('base_delivery_fee')
        .optional()
        .isFloat({ min: 0 }),

    body('city_status')
        .optional()
        .isBoolean(),

    body('delivery_available')
        .optional()
        .isBoolean()
];

const updateCityValidation = [
    param('id').isInt().withMessage('Invalid city ID'),

    body('city_name')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ max: 100 }),

    body('price_per_km')
        .optional()
        .isFloat({ min: 0 })
];

module.exports = {
    createCityValidation,
    updateCityValidation
};
