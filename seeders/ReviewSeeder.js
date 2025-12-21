const { faker } = require('@faker-js/faker');
const Review = require('../models/Review');
const User = require('../models/User');
const Store = require('../models/Store');
const Order = require('../models/Order');

const seedReviews = async () => {
    console.log('🌱 Seeding Reviews...');

    // We need delivered orders to review ideally, but for seeding we can just pick random users and stores
    const users = await User.findAll({ where: { user_type: 'customer' } });
    const stores = await Store.findAll();
    const orders = await Order.findAll({ limit: 20 }); // Just link to existing orders for validity

    if (users.length === 0 || stores.length === 0 || orders.length === 0) {
        console.log('⚠️ Skipping Review seeding: Missing data.');
        return;
    }

    const reviews = [];

    for (const order of orders) {
        // Store Review
        reviews.push({
            user_id: order.user_id,
            order_id: order.order_id,
            review_type: 'store',
            target_id: order.store_id,
            rating: faker.number.int({ min: 1, max: 5 }),
            review_comment: faker.lorem.sentence(),
            is_visible: true,
            created_at: new Date()
        });

        // Driver Review (if driver exists)
        if (order.driver_id) {
            reviews.push({
                user_id: order.user_id,
                order_id: order.order_id,
                review_type: 'driver',
                target_id: order.driver_id,
                rating: faker.number.int({ min: 3, max: 5 }), // Drivers usually get good ratings :)
                review_comment: 'Good service',
                is_visible: true,
                created_at: new Date()
            });
        }
    }

    try {
        await Review.bulkCreate(reviews, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${reviews.length} Reviews`);
    } catch (error) {
        console.error('❌ Error seeding reviews:', error.message);
    }
};

module.exports = seedReviews;
