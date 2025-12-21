const { faker } = require('@faker-js/faker');
const Banner = require('../models/Banner');
const City = require('../models/City');

const seedBanners = async () => {
    console.log('🌱 Seeding Banners...');

    const cities = await City.findAll();
    const banners = [];

    // General Home Sliders (No specific city)
    for (let i = 0; i < 3; i++) {
        banners.push({
            banner_title: faker.lorem.words(3),
            banner_image: faker.image.url({ width: 800, height: 400 }),
            link_type: 'none',
            banner_position: 'home_slider',
            banner_status: true,
            sort_order: i,
            starts_at: new Date(),
            ends_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        });
    }

    // City specific banners
    for (const city of cities) {
        banners.push({
            banner_title: `Welcome to ${city.city_name_en}`,
            banner_image: faker.image.url({ width: 800, height: 200 }),
            link_type: 'category',
            link_value: '1', // Mock Category ID
            banner_position: 'home_banner',
            city_id: city.city_id,
            banner_status: true,
            sort_order: 0,
            starts_at: new Date(),
            ends_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        });
    }

    try {
        await Banner.bulkCreate(banners, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${banners.length} Banners`);
    } catch (error) {
        console.error('❌ Error seeding banners:', error.message);
    }
};

module.exports = seedBanners;
