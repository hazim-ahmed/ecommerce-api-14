const { Store } = require('../models');

const createStore = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(201).json({ message: "Store created successfully", store });
    } catch (error) {
        console.error("Create Store Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getStores = async (req, res) => {
    try {
        const { category_id } = req.query;
        let whereClause = {};

        if (category_id) {
            whereClause.store_category_id = category_id;
        }

        const stores = await Store.findAll({ where: whereClause });
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getStoreById = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: "Store not found" });
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: "Store not found" });
        const updatedStore = await store.update(req.body);
        res.status(200).json(updatedStore);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: "Store not found" });
        await store.destroy();
        res.status(200).json({ message: "Store deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore
};
