const { faker } = require('@faker-js/faker');
const StoreCategory = require('../models/StoreCategory');

const seedStoreCategories = async () => {
    console.log('🌱 Seeding Store Categories...');

    // Using Placehold.co for clear, default-looking category assets
    const categories = [
        {
            category_name: 'Restaurants',
            category_name_en: 'Restaurants',
            category_icon: 'https://placehold.co/100x100/eeeeee/333333?text=Food',
            category_image: 'https://placehold.co/400x300/eeeeee/333333?text=Restaurants'
        },
        {
            category_name: 'Groceries',
            category_name_en: 'Groceries',
            category_icon: 'https://placehold.co/100x100/eeeeee/333333?text=Grocery',
            category_image: 'https://placehold.co/400x300/eeeeee/333333?text=Groceries'
        },
        {
            category_name: 'Pharmacies',
            category_name_en: 'Pharmacies',
            category_icon: 'https://placehold.co/100x100/eeeeee/333333?text=Pharma',
            category_image: 'https://placehold.co/400x300/eeeeee/333333?text=Pharmacy'
        },
        {
            category_name: 'Electronics',
            category_name_en: 'Electronics',
            category_icon: 'https://placehold.co/100x100/eeeeee/333333?text=Tech',
            category_image: 'https://placehold.co/400x300/eeeeee/333333?text=Electronics'
        },
        {
            category_name: 'Flowers',
            category_name_en: 'Flowers',
            category_icon: 'https://placehold.co/100x100/eeeeee/333333?text=Flower',
            category_image: 'https://placehold.co/400x300/eeeeee/333333?text=Flowers'
        },
    ];

    try {
        await StoreCategory.bulkCreate(categories, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${categories.length} Store Categories`);
    } catch (error) {
        console.error('❌ Error seeding store categories:', error.message);
    }
};

module.exports = seedStoreCategories;
