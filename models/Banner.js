const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Banner = sequelize.define('Banner', {
    banner_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    banner_title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    banner_image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    link_type: {
        type: DataTypes.ENUM('none', 'store', 'product', 'category', 'url'),
        allowNull: false
    },
    link_value: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    banner_position: {
        type: DataTypes.ENUM('home_slider', 'home_banner', 'category'),
        allowNull: false
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    banner_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    starts_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ends_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    clicks_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    views_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Banners',
    timestamps: false
});

module.exports = Banner;