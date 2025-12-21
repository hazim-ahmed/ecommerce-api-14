const { faker } = require('@faker-js/faker');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const User = require('../models/User');
const Store = require('../models/Store');
const Address = require('../models/Address');
const Product = require('../models/Product');
const { sequelize } = require('../config/db');

const seedOrders = async (count = 20) => {
    console.log('🌱 Seeding Orders & Order Items...');

    const customers = await User.findAll({
        where: { user_type: 'customer' },
        include: [{ model: Address, as: 'addresses' }]
    });

    const stores = await Store.findAll({
        include: [{ model: Product, as: 'products' }]
    });

    const drivers = await User.findAll({ where: { user_type: 'driver' } });

    if (customers.length === 0 || stores.length === 0) {
        console.log('⚠️ Skipping Order seeding: Missing customers or stores.');
        return;
    }

    let createdOrdersCount = 0;

    for (let i = 0; i < count; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        // Ensure customer has address
        if (!customer.addresses || customer.addresses.length === 0) continue;
        const address = customer.addresses[0];

        const store = stores[Math.floor(Math.random() * stores.length)];
        // Ensure store has products
        if (!store.products || store.products.length === 0) continue;

        const driver = getRandomDriver(drivers);
        const status = getRandomStatus();
        const paymentMethod = getRandomPaymentMethod();

        // Pick 1-5 Random Products for this order
        const orderItemsData = [];
        let subtotal = 0;

        const numItems = faker.number.int({ min: 1, max: 5 });
        for (let j = 0; j < numItems; j++) {
            const product = store.products[Math.floor(Math.random() * store.products.length)];
            const quantity = faker.number.int({ min: 1, max: 3 });
            const itemTotal = parseFloat(product.product_price) * quantity;

            orderItemsData.push({
                product_id: product.product_id,
                product_name: product.product_name,
                quantity: quantity,
                unit_price: product.product_price,
                total_price: itemTotal
            });
            subtotal += itemTotal;
        }

        const deliveryFee = faker.number.int({ min: 10, max: 30 });
        const finalTotal = subtotal + deliveryFee;

        // Transaction to ensure Order + Items created together
        const t = await sequelize.transaction();

        try {
            const order = await Order.create({
                order_number: 'ORD-' + faker.string.alphanumeric(8).toUpperCase(),
                user_id: customer.user_id,
                store_id: store.store_id,
                driver_id: driver ? driver.user_id : null,
                address_id: address.address_id,
                order_status: status,
                subtotal: subtotal,
                delivery_fee: deliveryFee,
                delivery_distance: faker.number.float({ min: 1, max: 10, precision: 0.1 }),
                total: finalTotal,
                payment_method: paymentMethod,
                payment_status: ['delivered', 'completed'].includes(status) ? 'paid' : 'pending',
                delivery_address: {
                    address: address.address_line,
                    lat: address.address_lat,
                    lng: address.address_lng
                },
                accepted_at: status !== 'pending' ? new Date() : null,
                delivered_at: status === 'delivered' ? new Date() : null
            }, { transaction: t });

            // Attach Order ID to items
            const items = orderItemsData.map(item => ({ ...item, order_id: order.order_id }));

            await OrderItem.bulkCreate(items, { transaction: t });

            await t.commit();
            createdOrdersCount++;
        } catch (error) {
            await t.rollback();
            console.error('❌ Failed to seed order:', error.message);
        }
    }

    console.log(`✅ Seeded ${createdOrdersCount} Orders with items`);
};

function getRandomDriver(drivers) {
    if (!drivers || drivers.length === 0) return null;
    return Math.random() > 0.3 ? drivers[Math.floor(Math.random() * drivers.length)] : null;
}

function getRandomStatus() {
    const statuses = ['pending', 'accepted', 'preparing', 'ready', 'picked', 'on_way', 'delivered', 'rejected'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomPaymentMethod() {
    const methods = ['cash', 'card', 'wallet'];
    return methods[Math.floor(Math.random() * methods.length)];
}

module.exports = seedOrders;
