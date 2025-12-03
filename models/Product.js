const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {

    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    product_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    product_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    discount_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    product_images: {
        type: DataTypes.JSON,
        allowNull: true
    },

    product_stock: {
        type: DataTypes.INTEGER,
        allowNull: true      // null = غير محدود
    },

    product_status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },

    is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: 'Products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    indexes: [
        { fields: ['store_id'] },
        { fields: ['product_category_id'] }
    ]
});

module.exports = Product;