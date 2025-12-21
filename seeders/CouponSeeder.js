const { faker } = require('@faker-js/faker');
const Coupon = require('../models/Coupon');
const Store = require('../models/Store');

const seedCoupons = async () => {
    console.log('🌱 Seeding Coupons...');

    const stores = await Store.findAll();
    const coupons = [];

    // Global Coupon
    coupons.push({
        coupon_code: 'WELCOME2024',
        coupon_description: 'Welcome Discount',
        coupon_type: 'percentage',
        coupon_value: 15.00,
        min_order: 50.00,
        max_discount: 25.00,
        usage_limit: 1000,
        usage_per_user: 1,
        valid_from: new Date(),
        valid_to: new Date(new Date().setMonth(new Date().getMonth() + 1))
    });

    // Store Specific Coupons
    for (let i = 0; i < 5; i++) { // First 5 stores
        if (i >= stores.length) break;
        coupons.push({
            coupon_code: `STORE${stores[i].store_id}OFF`,
            coupon_description: `Discount for Store ${stores[i].store_name}`,
            coupon_type: 'fixed',
            coupon_value: 10.00,
            min_order: 30.00,
            store_id: stores[i].store_id,
            usage_limit: 100,
            valid_from: new Date(),
            valid_to: new Date(new Date().setMonth(new Date().getMonth() + 3))
        });
    }

    try {
        await Coupon.bulkCreate(coupons, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${coupons.length} Coupons`);
    } catch (error) {
        console.error('❌ Error seeding coupons:', error.message);
    }
};

module.exports = seedCoupons;
