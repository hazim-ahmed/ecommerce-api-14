const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Transaction = sequelize.define('Transaction', {

    transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    transaction_type: {
        type: DataTypes.ENUM('credit', 'debit'),
        allowNull: false
    },

    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    balance_after: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    reference_type: {
        type: DataTypes.ENUM('order', 'withdrawal', 'refund', 'bonus'),
        allowNull: false
    },

    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: 'Transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,

    indexes: [
        { fields: ['user_id'] },
        { fields: ['reference_id'] }
    ]
});

module.exports = Transaction;