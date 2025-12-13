const { body, param } = require('express-validator');
const { Store, User, City, StoreCategory } = require('../models');

const createStoreValidation = [
    body('vendor_id')
        .notEmpty().withMessage('Vendor ID is required')
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('Vendor (User) not found');
            if (user.user_type !== 'vendor' && user.user_type !== 'admin') {
                // optionally check if user allowed to own store
            }
        }),

    body('city_id')
        .notEmpty().withMessage('City ID is required')
        .isInt()
        .custom(async (value) => {
            const city = await City.findByPk(value);
            if (!city) throw new Error('City not found');
        }),

    body('store_category_id')
        .notEmpty().withMessage('Store Category ID is required')
        .isInt()
        .custom(async (value) => {
            const category = await StoreCategory.findByPk(value);
            if (!category) throw new Error('Store Category not found');
        }),

    body('store_name')
        .trim()
        .notEmpty().withMessage('Store name is required')
        .isLength({ max: 100 }).withMessage('Store name too long'),

    body('store_description')
        .optional()
        .isString(),

    body('store_phone')
        .optional()
        .isString()
        .isLength({ max: 20 }),

    body('store_lat')
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),

    body('store_lng')
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),

    body('min_order')
        .optional()
        .isFloat({ min: 0 }),

    body('working_hours')
        .optional(),
    // .isJSON() // Optional validation for JSON structure
];

const updateStoreValidation = [
    param('id').isInt().withMessage('Invalid store ID'),

    body('store_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Store name cannot be empty'),

    body('store_status')
        .optional()
        .isIn(['pending', 'approved', 'rejected', 'suspended']).withMessage('Invalid status'),

    body('is_open')
        .optional()
        .isBoolean()
];

module.exports = {
    createStoreValidation,
    updateStoreValidation
};
