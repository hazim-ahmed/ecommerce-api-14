const { faker } = require('@faker-js/faker');
const Store = require('../models/Store');
const User = require('../models/User');
const City = require('../models/City');
const StoreCategory = require('../models/StoreCategory');

const seedStores = async (count = 10) => {
    console.log('🌱 Seeding Stores...');

    // Fetch necessary FKs
    const vendors = await User.findAll({ where: { user_type: 'vendor' } });
    const cities = await City.findAll();
    const categories = await StoreCategory.findAll();

    if (vendors.length === 0 || cities.length === 0 || categories.length === 0) {
        console.log('⚠️ Skipping Store seeding: Missing vendors, cities, or categories.');
        return;
    }

    const stores = [];

    for (let i = 0; i < count; i++) {
        const vendor = vendors[i % vendors.length]; // Distribute amongst vendors
        const city = cities[Math.floor(Math.random() * cities.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];

        stores.push({
            vendor_id: vendor.user_id,
            city_id: city.city_id,
            store_category_id: category.store_category_id,
            store_name: faker.company.name(),
            store_description: faker.lorem.sentence(),
            store_logo: faker.image.avatar(),
            store_cover: faker.image.url(),
            store_phone: faker.phone.number('01#########'),
            store_status: 'approved',
            is_open: true,
            store_rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
            rating_count: faker.number.int({ min: 10, max: 100 }),
            min_order: faker.number.int({ min: 10, max: 50 }),
            store_lat: faker.location.latitude(),
            store_lng: faker.location.longitude(),
            store_address: faker.location.streetAddress(),
            working_hours: { open: '09:00', close: '23:00' }
        });
    }

    try {
        await Store.bulkCreate(stores, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${stores.length} Stores`);
    } catch (error) {
        console.error('❌ Error seeding stores:', error.message);
    }
};

module.exports = seedStores;
