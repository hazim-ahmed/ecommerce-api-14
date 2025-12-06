const { StoreCategory } = require('../models');

const createStoreCategory = async (req, res) => {
    try {
        const storeCategory = await StoreCategory.create(req.body);
        res.status(201).json({ message: "StoreCategory created successfully", storeCategory });
    } catch (error) {
        console.error("Create StoreCategory Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getStoreCategories = async (req, res) => {
    try {
        const storeCategories = await StoreCategory.findAll();
        res.status(200).json(storeCategories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getStoreCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const storeCategory = await StoreCategory.findByPk(id);
        if (!storeCategory) return res.status(404).json({ message: "StoreCategory not found" });
        res.status(200).json(storeCategory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateStoreCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const storeCategory = await StoreCategory.findByPk(id);
        if (!storeCategory) return res.status(404).json({ message: "StoreCategory not found" });
        const updatedStoreCategory = await storeCategory.update(req.body);
        res.status(200).json(updatedStoreCategory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteStoreCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const storeCategory = await StoreCategory.findByPk(id);
        if (!storeCategory) return res.status(404).json({ message: "StoreCategory not found" });
        await storeCategory.destroy();
        res.status(200).json({ message: "StoreCategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createStoreCategory,
    getStoreCategories,
    getStoreCategoryById,
    updateStoreCategory,
    deleteStoreCategory
};
