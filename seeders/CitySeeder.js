const City = require('../models/City');

const seedCities = async () => {
    console.log('🌱 Seeding Cities...');

    const cities = [
        { city_name: 'Riyadh', city_name_en: 'Riyadh', price_per_km: 1.5, base_delivery_fee: 15 },
        { city_name: 'Jeddah', city_name_en: 'Jeddah', price_per_km: 1.5, base_delivery_fee: 12 },
        { city_name: 'Dammam', city_name_en: 'Dammam', price_per_km: 1.2, base_delivery_fee: 10 },
        { city_name: 'Mecca', city_name_en: 'Mecca', price_per_km: 1.5, base_delivery_fee: 15 },
        { city_name: 'Medina', city_name_en: 'Medina', price_per_km: 1.2, base_delivery_fee: 12 },
    ];

    try {
        await City.bulkCreate(cities, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${cities.length} Cities`);
    } catch (error) {
        console.error('❌ Error seeding cities:', error.message);
    }
};

module.exports = seedCities;
