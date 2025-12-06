const { Transaction } = require('../models');

const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json({ message: "Transaction created successfully", transaction });
    } catch (error) {
        console.error("Create Transaction Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        const updatedTransaction = await transaction.update(req.body);
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        await transaction.destroy();
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};
