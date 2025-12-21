const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const seedUsers = async (count = 20) => {
    console.log('🌱 Seeding Users...');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt); // Default password

    const users = [];

    // 1. Create Admin
    users.push({
        user_name: 'Super Admin',
        email: 'admin@example.com',
        phone: '0500000000',
        password: passwordHash,
        user_type: 'admin',
        user_status: 'active',
        email_verified_at: new Date(),
        phone_verified_at: new Date(),
    });

    // 2. Create Vendors
    for (let i = 0; i < 5; i++) {
        users.push({
            user_name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number('05########'),
            password: passwordHash,
            user_type: 'vendor',
            user_status: 'active',
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
        });
    }

    // 3. Create Drivers
    for (let i = 0; i < 5; i++) {
        users.push({
            user_name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number('05########'),
            password: passwordHash,
            user_type: 'driver',
            user_status: 'active',
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
        });
    }

    // 4. Create Customers
    for (let i = 0; i < count; i++) {
        users.push({
            user_name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number('05########'),
            password: passwordHash,
            user_type: 'customer',
            user_status: 'active',
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
        });
    }

    // Bulk create (ignoring duplicates for safety in re-runs if unique constraints hit)
    // For proper seeding, we usually want to clear or handle duplicates. 
    // Here we'll catch errors individually or just try insert.
    // Using bulkCreate with updateOnDuplicate is DB specific. 
    // Simple approach: Delete all or check existence. 
    // To be safe and clean: We don't delete to avoid dataloss on prod unless forced.
    // But this is a seeder, usually for dev.

    // Strategy: Try to find or create admin, then just create others (allowing potential duplicate errors to be ignored or handled)

    // Ideally, we truncate in a fresh seed.

    // For this task, I'll use bulkCreate and ignore duplicates if possible or just let it fail if collision (unlikely with faker except random chance).

    try {
        await User.bulkCreate(users, { ignoreDuplicates: true, validate: true });
        console.log(`✅ Seeded ${users.length} Users`);
    } catch (error) {
        console.error('❌ Error seeding users:', error.message);
    }
};

module.exports = seedUsers;
