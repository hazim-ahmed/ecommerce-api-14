const { ProductCategory } = require('../models');

const createProductCategory = async (req, res) => {
    try {
        const productCategory = await ProductCategory.create(req.body);
        res.status(201).json({ message: "ProductCategory created successfully", productCategory });
    } catch (error) {
        console.error("Create ProductCategory Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.findAll();
        res.status(200).json(productCategories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findByPk(id);
        if (!productCategory) return res.status(404).json({ message: "ProductCategory not found" });
        res.status(200).json(productCategory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findByPk(id);
        if (!productCategory) return res.status(404).json({ message: "ProductCategory not found" });
        const updatedProductCategory = await productCategory.update(req.body);
        res.status(200).json(updatedProductCategory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findByPk(id);
        if (!productCategory) return res.status(404).json({ message: "ProductCategory not found" });
        await productCategory.destroy();
        res.status(200).json({ message: "ProductCategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createProductCategory,
    getProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
};
