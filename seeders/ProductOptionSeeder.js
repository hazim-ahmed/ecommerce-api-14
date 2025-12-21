const { faker } = require('@faker-js/faker');
const ProductOption = require('../models/ProductOption');
const Product = require('../models/Product');

const seedProductOptions = async () => {
    console.log('🌱 Seeding Product Options...');

    // Get 20 random products
    const products = await Product.findAll({ limit: 20 });
    const options = [];

    for (const product of products) {
        // Add Size Option
        options.push({
            product_id: product.product_id,
            option_name: 'Size',
            option_type: 'single',
            option_values: [
                { name: 'Small', price: 0 },
                { name: 'Medium', price: 5 },
                { name: 'Large', price: 10 }
            ]
        });

        // Add Spiciness or Extra option randomly
        if (Math.random() > 0.5) {
            options.push({
                product_id: product.product_id,
                option_name: 'Extras',
                option_type: 'multiple',
                option_values: [
                    { name: 'Cheese', price: 2 },
                    { name: 'Sauce', price: 1 }
                ]
            });
        }
    }

    try {
        await ProductOption.bulkCreate(options, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${options.length} Product Options`);
    } catch (error) {
        console.error('❌ Error seeding product options:', error.message);
    }
};

module.exports = seedProductOptions;
