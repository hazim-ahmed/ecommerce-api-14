const { faker } = require('@faker-js/faker');
const ProductCategory = require('../models/ProductCategory');
const Store = require('../models/Store');

const seedProductCategories = async () => {
    console.log('🌱 Seeding Product Categories...');

    const stores = await Store.findAll();
    if (stores.length === 0) {
        console.log('⚠️ Skipping Product Category seeding: No stores found.');
        return;
    }

    const productCategories = [];

    for (const store of stores) {
        // Create 3 categories per store
        for (let i = 0; i < 3; i++) {
            productCategories.push({
                store_id: store.store_id,
                category_name: faker.commerce.department() + ` ${i + 1}`,
                category_description: faker.lorem.sentence(),
                category_status: true,
                sort_order: i
            });
        }
    }

    try {
        await ProductCategory.bulkCreate(productCategories, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${productCategories.length} Product Categories`);
    } catch (error) {
        console.error('❌ Error seeding product categories:', error.message);
    }
};

module.exports = seedProductCategories;
