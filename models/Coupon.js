const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Coupon = sequelize.define('Coupon', {
    coupon_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    coupon_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    coupon_description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    coupon_type: {
        type: DataTypes.ENUM('percentage', 'fixed'),
        allowNull: false
    },
    coupon_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    min_order: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    max_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    usage_limit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    usage_per_user: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    used_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    coupon_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    valid_from: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valid_to: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Coupons',
    timestamps: false
});

module.exports = Coupon;