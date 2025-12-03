const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ProductOption = sequelize.define('ProductOption', {

    product_option_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    option_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    option_type: {
        type: DataTypes.ENUM('single', 'multiple'),
        allowNull: false
    },

    option_values: {
        type: DataTypes.JSON,
        allowNull: false
    }

}, {
    tableName: 'Product_Options',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    indexes: [
        { fields: ['product_id'] }
    ]
});

module.exports = ProductOption;