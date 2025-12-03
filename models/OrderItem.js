const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {

    order_item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    unit_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    options_price: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },

    total_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    selected_options: {
        type: DataTypes.JSON,
        allowNull: true
    },

    item_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    tableName: 'Order_Items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { fields: ['order_id'] },
        { fields: ['product_id'] }
    ]
});

module.exports = OrderItem;