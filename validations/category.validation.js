const { body, param } = require('express-validator');
const { Store, ProductCategory } = require('../models');
const { Op } = require('sequelize');

const createCategoryValidation = [
    body('store_id')
        .notEmpty().withMessage('Store ID is required')
        .isInt().withMessage('Store ID must be an integer')
        .custom(async (value) => {
            const store = await Store.findByPk(value);
            if (!store) throw new Error('Store not found');
        }),

    body('category_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ max: 100 }).withMessage('Category name must not exceed 100 characters'),

    body('category_description')
        .optional()
        .isString(),

    body('category_image')
        .optional()
        .isString(),

    body('category_status')
        .optional()
        .isBoolean().withMessage('Status must be boolean'),

    body('sort_order')
        .optional()
        .isInt().withMessage('Sort order must be an integer')
];

const updateCategoryValidation = [
    param('id')
        .isInt().withMessage('Invalid category ID'),

    body('store_id')
        .optional()
        .isInt()
        .custom(async (value) => {
            const store = await Store.findByPk(value);
            if (!store) throw new Error('Store not found');
        }),

    body('category_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Category name cannot be empty')
        .isLength({ max: 100 }),

    body('category_status')
        .optional()
        .isBoolean(),

    body('sort_order')
        .optional()
        .isInt()
];

module.exports = {
    createCategoryValidation,
    updateCategoryValidation
};
