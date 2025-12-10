const { OrderStatusHistory, Order } = require('../models');

const createOrderStatusHistory = async (req, res) => {
    try {
        const { order_id } = req.body;

        if (!order_id) {
            return res.status(400).json({ message: "order_id is required" });
        }

        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const orderStatusHistory = await OrderStatusHistory.create(req.body);
        res.status(201).json({ message: "OrderStatusHistory created successfully", orderStatusHistory });
    } catch (error) {
        console.error("Create OrderStatusHistory Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOrderStatusHistories = async (req, res) => {
    try {
        const orderStatusHistories = await OrderStatusHistory.findAll();
        res.status(200).json(orderStatusHistories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOrderStatusHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderStatusHistory = await OrderStatusHistory.findByPk(id);
        if (!orderStatusHistory) return res.status(404).json({ message: "OrderStatusHistory not found" });
        res.status(200).json(orderStatusHistory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateOrderStatusHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const orderStatusHistory = await OrderStatusHistory.findByPk(id);
        if (!orderStatusHistory) return res.status(404).json({ message: "OrderStatusHistory not found" });

        if (req.body.order_id) {
            const order = await Order.findByPk(req.body.order_id);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
        }

        const updatedOrderStatusHistory = await orderStatusHistory.update(req.body);
        res.status(200).json(updatedOrderStatusHistory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteOrderStatusHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const orderStatusHistory = await OrderStatusHistory.findByPk(id);
        if (!orderStatusHistory) return res.status(404).json({ message: "OrderStatusHistory not found" });
        await orderStatusHistory.destroy();
        res.status(200).json({ message: "OrderStatusHistory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createOrderStatusHistory,
    getOrderStatusHistories,
    getOrderStatusHistoryById,
    updateOrderStatusHistory,
    deleteOrderStatusHistory
};
