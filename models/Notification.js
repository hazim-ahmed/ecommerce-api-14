const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
    notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notification_title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    notification_body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    notification_type: {
        type: DataTypes.ENUM('order', 'promotion', 'system'),
        allowNull: false
    },
    notification_data: {
        type: DataTypes.JSON,
        allowNull: true
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Notifications',
    timestamps: false
});

module.exports = Notification;