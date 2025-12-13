const { body, param } = require('express-validator');
const { Coupon, City, Store } = require('../models');
const { Op } = require('sequelize');

const createCouponValidation = [
    body('coupon_code')
        .trim()
        .notEmpty().withMessage('Coupon code is required')
        .isLength({ max: 50 })
        .custom(async (value) => {
            const coupon = await Coupon.findOne({ where: { coupon_code: value } });
            if (coupon) throw new Error('Coupon code already exists');
        }),

    body('coupon_type')
        .notEmpty().withMessage('Coupon type is required')
        .isIn(['percentage', 'fixed']).withMessage('Invalid coupon type'),

    body('coupon_value')
        .notEmpty().withMessage('Coupon value is required')
        .isFloat({ min: 0 }),

    body('min_order')
        .optional()
        .isFloat({ min: 0 }),

    body('valid_from')
        .notEmpty().withMessage('Valid from date is required')
        .isISO8601().withMessage('Invalid date format'),

    body('valid_to')
        .notEmpty().withMessage('Valid to date is required')
        .isISO8601().withMessage('Invalid date format')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.valid_from)) {
                throw new Error('Valid to date must be after valid from date');
            }
            return true;
        }),

    body('city_id')
        .optional()
        .isInt()
        .custom(async (value) => {
            if (!value) return;
            const city = await City.findByPk(value);
            if (!city) throw new Error('City not found');
        }),

    body('store_id')
        .optional()
        .isInt()
        .custom(async (value) => {
            if (!value) return;
            const store = await Store.findByPk(value);
            if (!store) throw new Error('Store not found');
        })
];

const updateCouponValidation = [
    param('id').isInt().withMessage('Invalid coupon ID'),

    body('coupon_code')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ max: 50 })
        .custom(async (value, { req }) => {
            const coupon = await Coupon.findOne({
                where: {
                    coupon_code: value,
                    coupon_id: { [Op.ne]: req.params.id }
                }
            });
            if (coupon) throw new Error('Coupon code already exists');
        }),

    body('coupon_status')
        .optional()
        .isBoolean()
];

module.exports = {
    createCouponValidation,
    updateCouponValidation
};
