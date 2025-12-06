const { Address } = require('../models');

const createAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.status(201).json({ message: "Address created successfully", address });
    } catch (error) {
        console.error("Create Address Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) return res.status(404).json({ message: "Address not found" });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) return res.status(404).json({ message: "Address not found" });
        const updatedAddress = await address.update(req.body);
        res.status(200).json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) return res.status(404).json({ message: "Address not found" });
        await address.destroy();
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
};
