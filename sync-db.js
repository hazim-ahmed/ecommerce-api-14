// sync-db.js

// --- استيراد كائن db المركزي من models/index.js ---
const db = require('./models');

const syncDatabase = async () => {
    console.log('Starting database synchronization using models/index.js...');
    try {
        await db.sequelize.sync({ alter: true });
        console.log('[SUCCESS] Database synchronized successfully.');
    } catch (error) {
        console.error('[ERROR] Failed to synchronize database:', error);
    } finally {
        await db.sequelize.close();
        console.log('Database connection closed.');
    }
};
// الاستدعاء
syncDatabase();