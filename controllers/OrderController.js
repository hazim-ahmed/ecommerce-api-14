const { Order } = require('../models');

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("Create Order Error:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors.map(e => e.message)
            });
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                message: "Foreign Key Constraint Error",
                error: `Invalid reference: ${error.fields ? error.fields.join(', ') : 'Unknown field'}`
            });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        const updatedOrder = await order.update(req.body);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Update Order Error:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors.map(e => e.message)
            });
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                message: "Foreign Key Constraint Error",
                error: `Invalid reference: ${error.fields ? error.fields.join(', ') : 'Unknown field'}`
            });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        await order.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
