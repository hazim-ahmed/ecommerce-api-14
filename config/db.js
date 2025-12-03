// config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// إعداد الاتصال باستخدام Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', 
        logging: false, 
        pool: {
            max: 5,     
            min: 0,     
            acquire: 30000, 
            idle: 10000 
        }
    }
);

// اختبار الاتصال 
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('[DB-SUCCESS] Connection has been established successfully using Sequelize.');
    } catch (error) {
        console.error('[DB-ERROR] Unable to connect to the database:', error);
    }
};

testConnection();

// تصدير كائن sequelize لاستخدامه في جميع أنحاء التطبيق
module.exports = { sequelize, testConnection };