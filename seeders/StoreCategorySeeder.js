const { faker } = require('@faker-js/faker');
const StoreCategory = require('../models/StoreCategory');

const seedStoreCategories = async () => {
    console.log('🌱 Seeding Store Categories...');

    const categories = [
        { category_name: 'Restaurants', category_name_en: 'Restaurants', category_icon: 'restaurant.png' },
        { category_name: 'Groceries', category_name_en: 'Groceries', category_icon: 'grocery.png' },
        { category_name: 'Pharmacies', category_name_en: 'Pharmacies', category_icon: 'pharmacy.png' },
        { category_name: 'Electronics', category_name_en: 'Electronics', category_icon: 'tech.png' },
        { category_name: 'Flowers', category_name_en: 'Flowers', category_icon: 'flower.png' },
    ];

    try {
        await StoreCategory.bulkCreate(categories, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${categories.length} Store Categories`);
    } catch (error) {
        console.error('❌ Error seeding store categories:', error.message);
    }
};

module.exports = seedStoreCategories;
