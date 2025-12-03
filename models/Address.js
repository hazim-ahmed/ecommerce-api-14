const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Address = sequelize.define('Address', {

    address_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    address_title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    address_line: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    building_number: {
        type: DataTypes.STRING(50),
        allowNull: true
    },

    floor_number: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    apartment_number: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    address_lat: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: false
    },

    address_lng: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: false
    },

    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: 'Addresses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    indexes: [
        { fields: ['user_id'] },
        { fields: ['city_id'] }
    ]
});

module.exports = Address;