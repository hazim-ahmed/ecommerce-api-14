require('dotenv').config();
const db = require('../models');
const { sequelize } = db;

// Import Seeders
const seedUsers = require('./UserSeeder');
const seedCities = require('./CitySeeder');
const seedStoreCategories = require('./StoreCategorySeeder');
const seedStores = require('./StoreSeeder');
const seedProductCategories = require('./ProductCategorySeeder');
const seedProducts = require('./ProductSeeder');
const seedProductOptions = require('./ProductOptionSeeder'); // New
const seedAddresses = require('./AddressSeeder');
const seedCoupons = require('./CouponSeeder'); // New
const seedBanners = require('./BannerSeeder'); // New
const seedOrders = require('./OrderSeeder');
const seedReviews = require('./ReviewSeeder'); // New
const seedTransactions = require('./TransactionSeeder'); // New

const runSeeders = async () => {
    // Confirm Environment (Safety Check)
    // if (process.env.NODE_ENV === 'production') {
    //     console.error('⛔ Critical: Attempting to run seeders in PRODUCTION. Operation Aborted.');
    //     process.exit(1);
    // }

    console.log('🚀 Starting Database Seeder...');
    console.log('--------------------------------');

    try {
        await sequelize.authenticate();
        console.log('✅ Connected to Database');

        // Can uncomment to clear DB before seeding (Use with caution!)
        // await sequelize.sync({ force: true }); 

        // 1. Users (Admins, Vendors, Drivers, Customers)
        await seedUsers(50);

        // 2. Base Metadata
        await seedCities();
        await seedStoreCategories();
        await seedBanners(); // New

        // 3. Stores (Depends on Users, Cities, Categories)
        await seedStores(15);
        await seedCoupons(); // New (Depends on Stores mostly)

        // 4. Products (Depends on Stores)
        await seedProductCategories();
        await seedProducts(15);
        await seedProductOptions(); // New

        // 5. Customer Data (Addresses, Wallets)
        await seedAddresses();
        await seedTransactions(); // New

        // 6. Orders (Depends on everything)
        await seedOrders(30);

        // 7. Post-Order Data
        await seedReviews(); // New

        console.log('--------------------------------');
        console.log('🎉 Database Seeding Completed Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ detailed error:', error);
        console.error('❌ Seeding Failed!');
        process.exit(1);
    }
};

runSeeders();
