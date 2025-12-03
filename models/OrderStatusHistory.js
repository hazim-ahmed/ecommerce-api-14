const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderStatusHistory = sequelize.define('OrderStatusHistory', {

    order_status_history_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            'pending', 'accepted', 'preparing', 'ready',
            'picked', 'on_way', 'delivered', 'rejected'
        ),
        allowNull: false
    },

    status_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: 'Order_Status_History',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        { fields: ['order_id'] },
        { fields: ['created_by'] }
    ]
});

module.exports = OrderStatusHistory;