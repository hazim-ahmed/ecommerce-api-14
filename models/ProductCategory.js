const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ProductCategory = sequelize.define('ProductCategory', {

    product_category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    category_description: {
        type: DataTypes.TEXT,
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
    tableName: 'Product_Categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    indexes: [
        { fields: ['store_id'] }
    ]
});

module.exports = ProductCategory;