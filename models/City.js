const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const City = sequelize.define('City', {

    city_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    city_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    city_name_en: {
        type: DataTypes.STRING(100),
        allowNull: true
    },

    city_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    delivery_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    base_delivery_fee: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },

    price_per_km: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

}, {
    tableName: 'Cities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['city_status'] }
    ]
});

module.exports = City;