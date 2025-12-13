const { body, param } = require('express-validator');
const { City } = require('../models');

const createBannerValidation = [
    body('banner_title')
        .optional()
        .isString()
        .isLength({ max: 100 }),

    body('banner_image')
        .notEmpty().withMessage('Banner image is required')
        .isString(),

    body('link_type')
        .notEmpty().withMessage('Link type is required')
        .isIn(['none', 'store', 'product', 'category', 'url']).withMessage('Invalid link type'),

    body('link_value')
        .optional()
        .isString(),

    body('banner_position')
        .notEmpty().withMessage('Banner position is required')
        .isIn(['home_slider', 'home_banner', 'category']).withMessage('Invalid banner position'),

    body('city_id')
        .optional()
        .isInt()
        .custom(async (value) => {
            if (!value) return;
            const city = await City.findByPk(value);
            if (!city) throw new Error('City not found');
        }),

    body('starts_at')
        .optional()
        .isISO8601(),

    body('ends_at')
        .optional()
        .isISO8601()
];

const updateBannerValidation = [
    param('id').isInt().withMessage('Invalid banner ID'),

    body('banner_title')
        .optional()
        .isString(),

    body('banner_status')
        .optional()
        .isBoolean()
];

module.exports = {
    createBannerValidation,
    updateBannerValidation
};
