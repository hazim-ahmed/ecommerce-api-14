const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ApiKey = sequelize.define('ApiKey', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'ApiKeys',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false, // Only createdAt was explicitly requested/relevant for logs usually, but keeping it simple.
    indexes: [
        // Removing token index to avoid MySQL BLOB/TEXT key length error.
        // In a real production env with high volume, consider hashing the token 
        // or using a prefix index.
        {
            fields: ['user_id']
        }
    ]
});

module.exports = ApiKey;
