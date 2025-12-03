const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {

    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    order_number: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    order_status: {
        type: DataTypes.ENUM(
            'pending', 'accepted', 'preparing', 'ready',
            'picked', 'on_way', 'delivered', 'rejected'
        ),
        defaultValue: 'pending'
    },

    subtotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    delivery_fee: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    delivery_distance: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },

    discount: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },

    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    payment_method: {
        type: DataTypes.ENUM('cash', 'card', 'wallet'),
        allowNull: false
    },

    payment_status: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        defaultValue: 'pending'
    },

    coupon_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    delivery_address: {
        type: DataTypes.JSON,
        allowNull: false
    },

    order_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    estimated_time: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    accepted_at: { type: DataTypes.DATE, allowNull: true },
    prepared_at: { type: DataTypes.DATE, allowNull: true },
    picked_at: { type: DataTypes.DATE, allowNull: true },
    delivered_at: { type: DataTypes.DATE, allowNull: true },
    cancelled_at: { type: DataTypes.DATE, allowNull: true },

}, {
    tableName: 'Orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,  // لا يوجد updated_at في الجدول
    indexes: [
        { fields: ['user_id'] },
        { fields: ['store_id'] },
        { fields: ['driver_id'] }
    ]
});

module.exports = Order;