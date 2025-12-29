// config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Validate required environment variables
 * This ensures the app fails fast with clear error messages
 */
const validateEnvVars = () => {
    const errors = [];

    // Check if DATABASE_URL is provided (preferred for Render)
    if (process.env.DATABASE_URL) {
        console.log('[DB-CONFIG] Using DATABASE_URL for connection');
        return { useDatabaseUrl: true };
    }

    // Otherwise, check individual credentials
    const required = ['DB_HOST', 'DB_USER', 'DB_NAME'];

    required.forEach(key => {
        if (!process.env[key]) {
            errors.push(`Missing required environment variable: ${key}`);
        }
    });

    if (errors.length > 0) {
        console.error('[DB-CONFIG-ERROR] Environment validation failed:');
        errors.forEach(err => console.error(`  - ${err}`));
        console.error('\nPlease set the following in your Render dashboard:');
        console.error('  Option 1 (Recommended): DATABASE_URL');
        console.error('  Option 2: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT');
        throw new Error('Database configuration incomplete');
    }

    return { useDatabaseUrl: false };
};

/**
 * Initialize Sequelize with proper configuration
 */
const initializeSequelize = () => {
    const { useDatabaseUrl } = validateEnvVars();

    let sequelize;

    if (useDatabaseUrl) {
        // Use DATABASE_URL (Render-compatible)
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'mysql',
            logging: process.env.NODE_ENV === 'production' ? false : console.log,
            dialectOptions: {
                connectTimeout: 60000, // 60 seconds
                ssl: process.env.DB_SSL === 'true' ? {
                    require: true,
                    rejectUnauthorized: false
                } : false
            },
            pool: {
                max: 10,
                min: 0,
                acquire: 60000,
                idle: 10000
            }
        });
    } else {
        // Use individual credentials
        sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS || process.env.DB_PASSWORD || '',
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT || 3306,
                dialect: 'mysql',
                logging: process.env.NODE_ENV === 'production' ? false : console.log,
                dialectOptions: {
                    connectTimeout: 60000,
                    ssl: process.env.DB_SSL === 'true' ? {
                        require: true,
                        rejectUnauthorized: false
                    } : false
                },
                pool: {
                    max: 10,
                    min: 0,
                    acquire: 60000,
                    idle: 10000
                }
            }
        );
    }

    return sequelize;
};

// Initialize Sequelize instance
const sequelize = initializeSequelize();

/**
 * Test database connection with detailed error reporting
 */
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ [DB-SUCCESS] Database connection established successfully');
        console.log(`   Host: ${process.env.DB_HOST || 'from DATABASE_URL'}`);
        console.log(`   Database: ${process.env.DB_NAME || 'from DATABASE_URL'}`);
        return true;
    } catch (error) {
        console.error('❌ [DB-ERROR] Unable to connect to the database');

        // Debug: Log full error object if message is empty
        if (!error.message) {
            console.error('   [DEBUG] Error object:', JSON.stringify(error, null, 2));
        }

        // Provide specific error guidance
        if (error.name === 'SequelizeConnectionError') {
            console.error('   Connection Error Details:');
            console.error(`   - ${error.message || 'No error message provided'}`);
            console.error(`   - Host: ${sequelize.config.host}`);
            console.error(`   - Port: ${sequelize.config.port}`);

            if (error.message && error.message.includes('ETIMEDOUT')) {
                console.error('\n   Possible causes:');
                console.error('   1. Database host is unreachable');
                console.error('   2. Firewall blocking connection');
                console.error('   3. Incorrect DB_HOST or DB_PORT');
            } else if (error.message && error.message.includes('Access denied')) {
                console.error('\n   Possible causes:');
                console.error('   1. Incorrect DB_USER or DB_PASS');
                console.error('   2. User does not have access to DB_NAME');
                console.error('   3. Host restrictions on database user');
            } else if (error.message && error.message.includes('Unknown database')) {
                console.error('\n   Possible causes:');
                console.error('   1. Database name does not exist');
                console.error('   2. Check DB_NAME environment variable');
            }
        } else if (error.name === 'SequelizeAccessDeniedError') {
            console.error('   Access Denied - Check credentials');
        } else {
            console.error('   Error Name:', error.name);
            console.error('   Error Message:', error.message);
            console.error('   Stack:', error.stack);
        }

        throw error; // Re-throw to prevent server from starting
    }
};

// Export sequelize instance and test function
module.exports = { sequelize, testConnection };