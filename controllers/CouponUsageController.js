const { CouponUsage } = require('../models');

const createCouponUsage = async (req, res) => {
    try {
        const couponUsage = await CouponUsage.create(req.body);
        res.status(201).json({ message: "CouponUsage created successfully", couponUsage });
    } catch (error) {
        console.error("Create CouponUsage Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCouponUsages = async (req, res) => {
    try {
        const couponUsages = await CouponUsage.findAll();
        res.status(200).json(couponUsages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCouponUsageById = async (req, res) => {
    try {
        const { id } = req.params;
        const couponUsage = await CouponUsage.findByPk(id);
        if (!couponUsage) return res.status(404).json({ message: "CouponUsage not found" });
        res.status(200).json(couponUsage);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateCouponUsage = async (req, res) => {
    try {
        const { id } = req.params;
        const couponUsage = await CouponUsage.findByPk(id);
        if (!couponUsage) return res.status(404).json({ message: "CouponUsage not found" });
        const updatedCouponUsage = await couponUsage.update(req.body);
        res.status(200).json(updatedCouponUsage);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteCouponUsage = async (req, res) => {
    try {
        const { id } = req.params;
        const couponUsage = await CouponUsage.findByPk(id);
        if (!couponUsage) return res.status(404).json({ message: "CouponUsage not found" });
        await couponUsage.destroy();
        res.status(200).json({ message: "CouponUsage deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createCouponUsage,
    getCouponUsages,
    getCouponUsageById,
    updateCouponUsage,
    deleteCouponUsage
};
