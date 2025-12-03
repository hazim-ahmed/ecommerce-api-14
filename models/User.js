const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {

    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    user_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    user_type: {
        type: DataTypes.ENUM('customer', 'vendor', 'driver', 'admin'),
        allowNull: false
    },

    user_status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending', 'blocked'),
        defaultValue: 'pending'
    },

    user_avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },

    phone_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },

    fcm_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

}, {
    tableName: 'Users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['phone'], unique: true },
        { fields: ['email'], unique: true },
        { fields: ['user_type'] }
    ]
});

module.exports = User;