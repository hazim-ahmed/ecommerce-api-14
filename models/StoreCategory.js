const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StoreCategory = sequelize.define('StoreCategory', {

    store_category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    category_name_en: {
        type: DataTypes.STRING(100),
        allowNull: true
    },

    category_icon: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    category_image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    category_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, {
    tableName: 'Store_Categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = StoreCategory;