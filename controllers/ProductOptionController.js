const { ProductOption, Product } = require('../models');

const createProductOption = async (req, res) => {
    try {
        const productOption = await ProductOption.create(req.body);
        res.status(201).json({ message: "ProductOption created successfully", productOption });
    } catch (error) {
        console.error("Create ProductOption Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductOptions = async (req, res) => {
    try {
        const productOptions = await ProductOption.findAll();
        res.status(200).json(productOptions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductOptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const productOption = await ProductOption.findByPk(id);
        if (!productOption) return res.status(404).json({ message: "ProductOption not found" });
        res.status(200).json(productOption);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProductOption = async (req, res) => {
    try {
        const { id } = req.params;
        const productOption = await ProductOption.findByPk(id);
        if (!productOption) return res.status(404).json({ message: "ProductOption not found" });
        const updatedProductOption = await productOption.update(req.body);
        res.status(200).json(updatedProductOption);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteProductOption = async (req, res) => {
    try {
        const { id } = req.params;
        const productOption = await ProductOption.findByPk(id);
        if (!productOption) return res.status(404).json({ message: "ProductOption not found" });
        await productOption.destroy();
        res.status(200).json({ message: "ProductOption deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createProductOption,
    getProductOptions,
    getProductOptionById,
    updateProductOption,
    deleteProductOption
};
