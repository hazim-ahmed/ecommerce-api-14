const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Store = sequelize.define('Store', {

    store_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    store_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    store_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    store_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    store_logo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    store_cover: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    store_phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    store_status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
        defaultValue: 'pending'
    },

    is_open: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    store_rating: {
        type: DataTypes.DECIMAL(2,1),
        defaultValue: 0
    },

    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    min_order: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },

    store_lat: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: false
    },

    store_lng: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: false
    },

    store_address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    working_hours: {
        type: DataTypes.JSON,
        allowNull: true
    },

    rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    approved_at: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    tableName: 'Stores',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['vendor_id'] },
        { fields: ['city_id'] },
        { fields: ['store_category_id'] }
    ]
});

module.exports = Store;