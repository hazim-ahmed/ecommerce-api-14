const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const seedUsers = async (count = 20) => {
    console.log('🌱 Seeding Users...');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const users = [];

    // Default Avatar for all users
    const outputAvatar = 'https://placehold.co/200x200/cccccc/ffffff?text=Avatar';

    // 1. Create Admin
    users.push({
        user_name: 'Super Admin',
        email: 'admin@example.com',
        phone: '0500000000',
        password: passwordHash,
        user_type: 'admin',
        user_status: 'active',
        user_avatar: outputAvatar,
        email_verified_at: new Date(),
        phone_verified_at: new Date(),
    });

    // 2. Create Vendors
    for (let i = 0; i < 5; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        users.push({
            user_name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number('05########'),
            password: passwordHash,
            user_type: 'vendor',
            user_status: 'active',
            user_avatar: outputAvatar,
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
        });
    }

    // 3. Create Drivers
    for (let i = 0; i < 5; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        users.push({
            user_name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number('05########'),
            password: passwordHash,
            user_type: 'driver',
            user_status: 'active',
            user_avatar: outputAvatar,
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
        });
    }

    // 4. Create Customers
    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        users.push({
            user_name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            phone: faker.phone.number('05########'),
            password: passwordHash,
            user_type: 'customer',
            user_status: 'active',
            user_avatar: outputAvatar,
            email_verified_at: new Date(),
            phone_verified_at: new Date(),
        });
    }

    try {
        await User.bulkCreate(users, { ignoreDuplicates: true, validate: true });
        console.log(`✅ Seeded ${users.length} Users`);
    } catch (error) {
        console.error('❌ Error seeding users:', error.message);
    }
};

module.exports = seedUsers;
