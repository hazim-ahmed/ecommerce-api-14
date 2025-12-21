const { faker } = require('@faker-js/faker');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const seedTransactions = async () => {
    console.log('🌱 Seeding Transactions...');

    const users = await User.findAll({ where: { user_type: 'customer' }, limit: 10 });
    const transactions = [];

    for (const user of users) {
        let balance = 0;

        // Initial Deposit
        const amount1 = parseFloat(faker.finance.amount(100, 500, 2));
        balance += amount1;
        transactions.push({
            user_id: user.user_id,
            transaction_type: 'credit',
            amount: amount1,
            balance_after: balance,
            description: 'Wallet Top-up',
            reference_type: 'bonus', // Simple string reference
            reference_id: null
        });

        // Purchase
        const amount2 = parseFloat(faker.finance.amount(20, 50, 2));
        balance -= amount2;
        transactions.push({
            user_id: user.user_id,
            transaction_type: 'debit',
            amount: amount2,
            balance_after: balance,
            description: 'Order Payment',
            reference_type: 'order',
            reference_id: 1 // Mock ID
        });
    }

    try {
        await Transaction.bulkCreate(transactions, { ignoreDuplicates: true });
        console.log(`✅ Seeded ${transactions.length} Transactions`);
    } catch (error) {
        console.error('❌ Error seeding transactions:', error.message);
    }
};

module.exports = seedTransactions;
