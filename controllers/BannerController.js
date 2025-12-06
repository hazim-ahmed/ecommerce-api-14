const { Banner } = require('../models');

const createBanner = async (req, res) => {
    try {
        const banner = await Banner.create(req.body);
        res.status(201).json({ message: "Banner created successfully", banner });
    } catch (error) {
        console.error("Create Banner Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.findAll();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });
        const updatedBanner = await banner.update(req.body);
        res.status(200).json(updatedBanner);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });
        await banner.destroy();
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};
