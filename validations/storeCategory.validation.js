const { body, param } = require('express-validator');

const createStoreCategoryValidation = [
    body('category_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ max: 100 }),

    body('category_name_en')
        .optional()
        .trim()
        .isString()
        .isLength({ max: 100 }),

    body('category_icon')
        .optional()
        .isString(),

    body('category_image')
        .optional()
        .isString(),

    body('sort_order')
        .optional()
        .isInt()
];

const updateStoreCategoryValidation = [
    param('id').isInt().withMessage('Invalid category ID'),

    body('category_name')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ max: 100 }),

    body('category_status')
        .optional()
        .isBoolean()
];

module.exports = {
    createStoreCategoryValidation,
    updateStoreCategoryValidation
};
