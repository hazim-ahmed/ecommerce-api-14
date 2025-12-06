const { Coupon } = require('../models');

const createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json({ message: "Coupon created successfully", coupon });
    } catch (error) {
        console.error("Create Coupon Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findByPk(id);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findByPk(id);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        const updatedCoupon = await coupon.update(req.body);
        res.status(200).json(updatedCoupon);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findByPk(id);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        await coupon.destroy();
        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
};
