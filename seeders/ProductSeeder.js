const { faker } = require('@faker-js/faker');
const Product = require('../models/Product');
const Store = require('../models/Store');
const ProductCategory = require('../models/ProductCategory');

const seedProducts = async (productsPerStore = 10) => {
    console.log('🌱 Seeding Products...');

    const stores = await Store.findAll({
        include: [{ model: ProductCategory, as: 'productCategories' }]
    });

    if (stores.length === 0) {
        console.log('⚠️ Skipping Product seeding: No stores found.');
        return;
    }

    const products = [];

    for (const store of stores) {
        const categories = store.productCategories;
        if (!categories || categories.length === 0) continue;

        for (let i = 0; i < productsPerStore; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const price = parseFloat(faker.commerce.price({ min: 10, max: 200 }));

            products.push({
                store_id: store.store_id,
                product_category_id: category.product_category_id,
                product_name: faker.commerce.productName(),
                product_description: faker.commerce.productDescription(),
                product_price: price,
                discount_price: Math.random() > 0.7 ? price * 0.8 : null,
                product_stock: faker.number.int({ min: 0, max: 100 }),
                product_status: 'active',
                is_featured: Math.random() > 0.8,
                // Default Placeholders
                product_images: [
                    'https://placehold.co/500x500/e6e6e6/333333?text=Product+Image',
                    'https://placehold.co/500x500/e6e6e6/333333?text=Gallery+1',
                    'https://placehold.co/500x500/e6e6e6/333333?text=Gallery+2'
                ]
            });
        }
    }

    try {
        await Product.bulkCreate(products, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${products.length} Products`);
    } catch (error) {
        console.error('❌ Error seeding products:', error.message);
    }
};

module.exports = seedProducts;
