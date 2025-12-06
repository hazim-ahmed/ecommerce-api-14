const { OrderItem } = require('../models');

const createOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.create(req.body);
        res.status(201).json({ message: "OrderItem created successfully", orderItem });
    } catch (error) {
        console.error("Create OrderItem Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "OrderItem not found" });
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "OrderItem not found" });
        const updatedOrderItem = await orderItem.update(req.body);
        res.status(200).json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "OrderItem not found" });
        await orderItem.destroy();
        res.status(200).json({ message: "OrderItem deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
};
