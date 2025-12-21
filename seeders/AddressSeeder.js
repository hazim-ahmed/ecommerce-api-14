const { faker } = require('@faker-js/faker');
const Address = require('../models/Address');
const User = require('../models/User');
const City = require('../models/City');

const seedAddresses = async () => {
    console.log('🌱 Seeding Addresses...');

    const customers = await User.findAll({ where: { user_type: 'customer' } });
    const cities = await City.findAll();

    if (customers.length === 0 || cities.length === 0) {
        console.log('⚠️ Skipping Address seeding: No customers or cities.');
        return;
    }

    const addresses = [];

    for (const customer of customers) {
        const city = cities[Math.floor(Math.random() * cities.length)];

        addresses.push({
            user_id: customer.user_id,
            city_id: city.city_id,
            address_title: 'Home',
            address_line: faker.location.streetAddress(),
            building_number: faker.number.int({ min: 1, max: 50 }).toString(),
            floor_number: faker.number.int({ min: 1, max: 10 }).toString(),
            apartment_number: faker.number.int({ min: 1, max: 20 }).toString(),
            address_lat: faker.location.latitude(),
            address_lng: faker.location.longitude(),
            is_default: true
        });
    }

    try {
        await Address.bulkCreate(addresses, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${addresses.length} Addresses`);
    } catch (error) {
        console.error('❌ Error seeding addresses:', error.message);
    }
};

module.exports = seedAddresses;
